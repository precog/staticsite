define([
  // TODO needs cookie for email
    "app/util/iframesubmit"
  , "app/util/dialog-support"
  , "libs/jquery/jquery.cookie/jquery.cookie"
],

function(submit, displaySupport) {
  var PAGE_ACTION = "https://labcoat.precog.com/actions/",
      FORM_ACTION = "http://www2.precog.com/l/",
      wrapper,
      queue = [],
      email = $.cookie("Precog_eMail"),
      action_map = {
        "quirrel_failure_default" : "17892/2013-01-14/29k3q",
        "quirrel_failure_custom"  : "17892/2013-01-14/29k52",
        "generic_error"           : "17892/2013-01-14/29k5d"
      };

  var onprecog = Precog.$.Config.analyticsService.indexOf(".precog.com") >= 0;

  if(onprecog) {
    wrapper = {
      track_page : function(action) {
        submit({
          action : PAGE_ACTION + (action_map[action] || action),
          method : "get",
          complete : function() {
//          console.log("Page Action Done: " + PAGE_ACTION + action);
          }
        });
      }
    }
  } else {
    wrapper = {
      track_page : function(action) { }
    }
  }
  wrapper.track_error = function(action, params, user_message) {
    params = params || {};
    if(!email) {
      displaySupport("report error", user_message, null, params.error_message, false, function(e, r) {
        email = e;
        $.cookie("Precog_eMail", email);
        params.error_message = r;
        wrapper.track_error(action, params, user_message);
      });
      return false;
    } else {
      params.email = email;
      submit({
        action : FORM_ACTION + (action_map[action] || action),
        method : "post",
        data : params,
        complete : function() {
//            console.log("Form Submit: " + action);
        }
      });
      return true;
    }
  };

  wrapper.submit_form = function(url, params, callback) {
    submit({
      action : url,
      method : "get",
      data : params,
      complete : function() {
        if(callback) callback();
      }
    });
  };

  return wrapper;
});