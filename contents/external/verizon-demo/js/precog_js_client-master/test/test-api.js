nodeunit = typeof nodeunit == 'undefined' ? require('nodeunit') : nodeunit;
Precog = typeof Precog == 'undefined' ? require('..') : Precog;

var state = {};

var analyticsService = 'https://devapi.precog.com';

var user = {
  email: 'jstest' + new Date().valueOf() + '@precog.com',
  password: Math.random().toString()
};

var anonApi = new Precog.api({analyticsService: analyticsService});

var grantName = 'testgrant';
var childGrantName = 'testchildgrant';
var uploadPathRoot;
var originalUploadPath;
var uploadPath;

var account$ = anonApi.createAccount(user).then(function(account) {
  uploadPathRoot = '/' + account.accountId + '/';

  originalUploadPath = uploadPathRoot + 'original';
  uploadPath         = uploadPathRoot + 'test';

  return anonApi.describeAccount(user);
});

var api$ = account$.then(function(account) {
  return new Precog.api({
    analyticsService: analyticsService,
    apiKey: account.apiKey
  });
});

/**
 * Converts a module of tests into one that retries multiple times
 * on every failure. Useful for eventually consistent APIs like Precog.
 *
 */
var asyncModule = function(oldModule) {
  function atest(f, count) {
    if (count === undefined) count = 10;

    function appendToAssertions(name, assertions) {
      return function(actual, expected, message) {
        assertions.push({
          method: name,
          actual: actual,
          expected: expected,
          message: message
        });
      };
    }

    function facade(test, assertions) {
      var obj = {};
      var name;

      for(name in nodeunit.assert) {
        obj[name] = appendToAssertions(name, assertions);
      }

      obj.done = function() {
        var failed = false;
        var i;
        var assertion;

        for(i = 0; i < assertions.length; i++) {
          assertion = assertions[i];
          try {
            nodeunit.assert[assertion.method](assertion.actual, assertion.expected, assertion.message);
          } catch(e) {
            failed = true;
            break;
          }
        }

        if(failed) {
          setTimeout(function() {
            atest(f, count - 1)(test);
          }, 250);
          return;
        }

        for(i = 0; i < assertions.length; i++) {
          assertion = assertions[i];
          test[assertion.method](assertion.actual, assertion.expected, assertion.message);
        }

        test.done();
      };

      return obj;
    }

    return function(test0) {
      var test = count === 0 ? test0 : facade(test0, []);

      var result = f(test);

      if (result && result.then) {
        result.then(function() {
          test.done();
        }, function(reason) {
          test.ok(false, 'Unexpected failure: ' + JSON.stringify(reason));
          test.done();
        });
      }
    };
  }

  var newModule = {};

  var makeAsync = function(old) {
    return atest(function(test) {
      return old(test);
    });
  };

  for (var testName in oldModule) {
    var old = oldModule[testName];

    newModule[testName] = makeAsync(old);
  }

  return newModule;
};

var testApi = asyncModule({
  'describe bad account': function(test) {
    var promise = Vow.promise();

    anonApi.currentPlan({email: 'no$@"na1nemail!!!xyz+a', password: '+'}).then(function(plan) {
      promise.reject('Bad email and password should not trigger a valid HTTP response');
    }, function(error) {
      test.ok(true, 'Bad email and password should return an error HTTP response');

      promise.fulfill(null);
    });

    return promise;
  },
  'describe account': function(test) {
    return account$.then(function(account) {
      test.equal(account.email, user.email, 'Email returned from describeAccount is same');
    });
  },
  'current plan': function(test) {
    return account$.then(function() {
      return anonApi.currentPlan(user).then(function(plan) {
        test.equal(plan, 'Free', 'Created plan should be Free');
      });
    });
  },
  'change plan': function(test) {
    return account$.then(function(account) {
      return anonApi.changePlan({email: user.email, password: user.password, plan: 'bronze'}).then(function(response) {
        test.ok(true, 'Change plan should return non-error HTTP code');
      });
    });
  },
  'delete plan': function(test) {
    return anonApi.deletePlan(user).then(function(plan) {
      test.equal(plan, 'bronze', 'Deleted plan should be bronze');
    });
  },
  'describe API key': function(test) {
    var description$ = account$.then(function(account) {
      return api$.then(function(api) {
        return api.describeApiKey(account.apiKey);
      });
    });

    return Vow.all([description$, account$]).then(function(results) {
      test.equal(results[0].apiKey, results[1].apiKey, 'Returned API key should match account');
    });
  },
  'create API key': function(test) {
    return api$.then(function(api) {
      return api.createApiKey({
        grants: []
      }).then(function(created) {
        state.created = created;
        test.deepEqual(created.grants, [], 'Grants must be empty');
        test.notEqual(created.apiKey, undefined, 'apiKey must be defined');
      });
    });
  },
  'list API keys': function(test) {
    return api$.then(function(api) {
      return api.listApiKeys(function(list) {
        test.equal(list.length, 1, 'One API key must have been created');
        test.equal(state.created.apiKey, list[0].apiKey, 'Listed key must be API key that was just created');
      });
    });
  },
  'delete API key': function(test) {
    return api$.then(function(api) {
      return api.deleteApiKey(state.created.apiKey).then(function(result) {
        test.ok(true, 'Delete API key should return non-error HTTP code');
      });
    });
  },
  'list API key grants': function(test) {
    return account$.then(function(account) {
      return api$.then(function(api) {
        return api.retrieveApiKeyGrants(account.apiKey);
      }).then(function(grants) {
        test.equal(grants.length, 1, 'Must be one grant');
        test.notEqual(grants[0].grantId, undefined, 'grantId must be defined');
      });
    });
  },
  'upload data file': function(test) {
    return account$.then(function(account) {
      return api$.then(function(api) {
        return api.uploadFile({
          path: originalUploadPath,
          contents: '{"name": "John", "email": "john@precog.com"}\n{"name": "Brian", "email": "brian@precog.com"}',
          type: 'application/json'
        }).then(function(report) {
          test.deepEqual(report.errors, [], 'No errors should be returned');
          test.equal(report.failed, 0, 'None should fail');
          test.equal(report.skipped, 0, 'None should be skipped');
          test.equal(report.total, 2, 'Should have uploaded two items');
          test.equal(report.ingested, 2, 'Should have ingested two items');
          test.notEqual(report.ingestId, undefined, 'Should have an ingest ID');
        });
      });
    });
  },
  'retrieve data file': function(test) {
    return api$.then(function(api) {
      return api.getFile(originalUploadPath).then(function(file) {
        test.deepEqual(
          JSON.parse(file.contents), 
          JSON.parse('[{"name": "John", "email": "john@precog.com"},{"name": "Brian", "email": "brian@precog.com"}]'),
          'Retrieved contents of a file must be equal to the original uploaded file'
        );
      });
    });
  },
  'move file': function(test) {
    return api$.then(function(api) {
      return api.moveFile({
        source: originalUploadPath,
        dest: uploadPath
      }).then(function() {
        test.ok(true, 'Move file should return non-error HTTP code');
      });
    });
  },
  'listing children': function(test) {
    return api$.then(function(api) {
      return api.listChildren(uploadPathRoot).then(function(children) {
        test.equal(children.length, 1, 'Children must have size');
        test.deepEqual(children[0], {type: 'file', name: 'test'}, 'Child must equal uploaded file');
      });
    });
  },
  'metadata': function(test) {
    return api$.then(function(api) {
      return api._retrieveMetadata(uploadPath).then(function(metadata) {
        test.notEqual(metadata.size, undefined, 'Metadata must have size');
        test.notEqual(metadata.children, undefined, 'Metadata must have children');
        test.notEqual(metadata.structure, undefined, 'Metadata must have structure');
      });
    });
  },
  'delete path': function(test) {
    return api$.then(function(api) {
      return api.delete0(uploadPath).then(function(deleted) {
        test.ok(true, 'Delete path should return non-error HTTP code');
      });
    });
  },
  'create descendants': function(test) {
    return api$.then(function(api) {
      // Create a nested directory of files
      var vows = [];
      for(var i = 0; i < 10; i++) {
        vows.push(api.uploadFile({
          path: uploadPathRoot + i.toString() + '/' + i.toString(),
          contents: '{"a": ' + i + '}',
          type: 'application/json'
        }));
      }
      return Vow.all(vows);
    });
  },
  'list descendants': function(test) {
    return api$.then(function(api) {
      return api.listDescendants(uploadPathRoot).then(function(descendants) {
        test.equal(descendants.length, 20, 'Descendants must have size');
      });
    });
  },
  'delete directory': function(test) {
    return api$.then(function(api) {
      return api.deleteAll(uploadPathRoot + '0').then(function() {
        return api.listDescendants(uploadPathRoot).then(function(descendants) {
          test.equal(descendants.length, 18, 'Descendants must have smaller size');
        });
      });
    });
  },
  'upload script': function(test) {
    return api$.then(function(api) {
      return api.uploadFile({
        path:     uploadPathRoot + '/script.qrl',
        contents: '1 + 1',
        type:     'text/x-quirrel-script'
      }).then(function() {
        test.ok(true, 'Script was uploaded successfully');
      });
    });
  },
  'retrieve uploaded script': function(test) {
    return api$.then(function(api) {
      return api.getFile(uploadPathRoot + '/script.qrl').then(function(file) {
        test.equal(file.contents, '1 + 1', 'Downloaded script must equal uploaded script');
        test.equal(file.type, 'text/x-quirrel-script', 'Downloaded script must have uploaded mime type');
      });
    });
  },
  'freshly execute uploaded script': function(test) {
    return api$.then(function(api) {
      return api.executeFile({path: uploadPathRoot + 'script.qrl'}).then(function(results) {
        test.deepEqual(results.data, [2], 'Execution of uploaded script must have correct results');
      });
    });
  },
  'retrieved cached execution of script': function(test) {
    return api$.then(function(api) {
      return api.executeFile({path: uploadPathRoot + 'script.qrl', maxAge: 999999, maxStale: 999999}).then(function(results) {
        test.deepEqual(results.data, [2], 'Execution of uploaded script must have correct results');
      });
    });
  },
  'execute simple': function(test) {
    return api$.then(function(api) {
      return api.execute({
        query: "1 + 2"
      });
    }).then(function(results) {
      test.deepEqual(results.data, [3], '1 + 2 should return 3');
    });
  },
 /* 'query async': function(test) {
    return account$.then(function(account) {
      return api$.then(function(api) {
        return api._asyncQuery({
          query: "1 + 2"
        }).then(function(query) {
          state.query = query;
          test.notEqual(query.jobId, undefined, 'jobId must be defined');
        });
      });
    });
  },
  'async results': function(test) {
    return api$.then(function(api) {
      return api._asyncQueryResults(state.query.jobId).then(function(results) {
        test.equal(results.errors.length, 0, 'Errors must be empty');
        test.equal(results.warnings.length, 0, 'Warnings must be empty');
        test.deepEqual(results.data, [3], 'Data must only contain three');
      });
    });
  }, */
  'append a value': function(test) {
    return api$.then(function(api) {
      var file = uploadPathRoot + 'append-test';

      return api.append({path: file, value: {foo: "bar"}}).then(function() {
        return api.execute({query: 'load("' + file + '")'}).then(function(results) {
          var data = results.data;

          test.ok(data.length > 0, 'Non-empty results are returned');
          test.deepEqual(data[0], {"foo": "bar"}, 'Appended data must be returned');
        });
      });
    });
  },
  'uploadFile setup (no tests)': function(test) {
    return api$.then(function(api) {
      var file = uploadPathRoot + 'append-test';

      return api.uploadFile({path: file, contents: JSON.stringify({baz: "bar"}), type: 'application/json'}).then(function() {
        test.ok(true, 'uploadFile setup succeeds');
      });
    });
  },
  'uploadFile replaces existing (non-empty) contents': function(test) {
    return api$.then(function(api) {
      var file = uploadPathRoot + 'append-test';

      return api.execute({query: 'load("' + file + '")'}).then(function(results) {
        var data = results.data;

        test.ok(data.length === 1, 'Non-empty results are returned');
        test.deepEqual(data[0], {"baz": "bar"}, 'File contents must be returned');
      });
    });
  },
  'create grant': function(test) {
    return account$.then(function(account) {
      return api$.then(function(api) {
        return api.createGrant({
          name: grantName,
          description: 'Test grant',
          permissions: [{
            accessType: "read",
            path: "/test",
            ownerAccountIds: [account.accountId]
          }]
        }).then(function(grant) {
          state.grant = grant;
          test.equal(grant.name, grantName, 'Returned grant should have correct name');
        });
      });
    });
  },
  'add grant to API key': function(test) {
    return account$.then(function(account) {
      return api$.then(function(api) {
        return api.addGrantToApiKey({
          grant: state.grant,
          apiKey: account.apiKey
        }).then(function(added) {
          test.ok(true, 'Adding grant to API key must return non-error HTTP code');
        });
      });
    });
  },
  'create grant child': function(test) {
    return account$.then(function(account) {
      return api$.then(function(api) {
        return api.createGrantChild({
          parentGrantId: state.grant.grantId,
          childGrant: {
            name: childGrantName,
            description: 'Test child grant',
            permissions: [{
              accessType: "read",
              path: "/test/child",
              ownerAccountIds: [account.accountId]
            }]
          }
        }).then(function(childGrant) {
          state.childGrant = childGrant;
          test.notEqual(childGrant.grantId, undefined, 'grantId must be defined');
        });
      });
    });
  },
  'list grant children': function(test) {
    return api$.then(function(api) {
      return api.listGrantChildren(state.grant.grantId).then(function(children) {
        test.equal(children.length, 1, 'Grant must have one child');
        test.equal(children[0].grantId, state.childGrant.grantId, 'Listed child grantId must be created child grantId');
      });
    });
  },
  'remove grant from API key': function(test) {
    return account$.then(function(account) {
      return api$.then(function(api) {
        return api.removeGrantFromApiKey({
          grantId: state.grant.grantId,
          apiKey: account.apiKey
        }).then(function(removed) {
          test.ok(true, 'Remove grant from API key must return non-error HTTP code');
        });
      });
    });
  },
  'add grant to account': function(test) {
    return account$.then(function(account) {
      return api$.then(function(api) {
        return api.addGrantToAccount({
          grantId: state.grant.grantId,
          accountId: account.accountId
        }).then(function(added) {
          test.ok(true, 'Adding grant to account must return non-error HTTP code');
        });
      });
    });
  },
  'describe grant': function(test) {
    return api$.then(function(api) {
      return api.describeGrant(state.grant.grantId).then(function(grant) {
        test.equal(grant.name, grantName, 'Described grant name should be original name');
      });
    });
  },
  'delete grant': function(test) {
    return api$.then(function(api) {
      return api.deleteGrant(state.grant.grantId).then(function(deleted) {
        test.ok(true, 'Delete grant must return non-error HTTP code');
      });
    });
  }
});

if(typeof module == 'object') module.exports = testApi;

// Not tested:

// requestPasswordReset
