var currentLocation = window.location.pathname;
var currentGenLocation = window.location.pathname.substr(0,10);

$(document).ready(function(){
      var userLoggedIn = sessionStorage.getItem('PrecogAccount_Login');
      
      if (userLoggedIn) {
            $("#login-link").html("Log Out").attr("href", "#").addClass("log-out-link");
            
            $("<li><a id='my-account-link' href='/account/'>Account</a></li>").prependTo("#header-mini-menu ul");
      }
      
      $(".log-out-link").click(function(){
            $(this).html("Login").attr("href", "/account/login/").removeClass("log-out-link");
            
            sessionStorage.removeItem('PrecogAccount_Email');
            sessionStorage.removeItem('PrecogAccount_Name');
            sessionStorage.removeItem('PrecogAccount_Company');
            sessionStorage.removeItem('PrecogAccount_ID');
            sessionStorage.removeItem('PrecogAccount_ApiKey');
            sessionStorage.removeItem('PrecogAccount_AnalyticsService');
            sessionStorage.removeItem('PrecogAccount_BasePath');
            sessionStorage.removeItem('PrecogAccount_Login');
            
            window.location = "https://www.precog.com";
            $(this).html("Login").attr("href", "/account/login/").removeClass("log-out-link");
            
      });
      
      //FOR DEVELOPERS PAGE
      if (currentLocation == "/for-developers/") {
            $("#hiw-menu ul li").click(function(){
                  var currentIndex =  $(this).index();
                  var elemAdjust = 268 * currentIndex;
                  var moveMe = (118 + elemAdjust);
                  
                  $(".arrow-up").animate({
                        left: moveMe
                  }, 200 );

            });
      }
      
      //PRICING
      $("#pricing-options-menu li").click(function(){
            $("#pricing-options-menu li").removeClass("active");
            $(this).addClass("active");
            
            var currentItem = $(this).index();
            
            if (currentItem == 0) {
                  $(".pricing-panel").hide();
                  $("#pricing-options-cloud").show();
            } else if (currentItem == 1) {
                  $(".pricing-panel").hide();
                  $("#pricing-options-hardware").show();
            } else if (currentItem == 2) {
                  $(".pricing-panel").hide();
                  $("#pricing-options-appliance").show();
            }
      });
      
      //LOGIN
      if (currentLocation == "/account/login/" || currentLocation == "/for-developers/") {
            
            if (currentLocation == "/account/login/") {
                  //REDIRECT IF LOGGED IN
                  var userLoggedIn = sessionStorage.getItem('PrecogAccount_Login');
                  
                  if (userLoggedIn) {
                        window.location = "/account/";
                  }
            }
            
            //TEXT-TYPING TRANSFER
            $("#login-email").keyup(function(){
                  var emailValue = $(this).val();
                  
                  $("#user-email").val(emailValue);
            });
            
            $("#login-password").keyup(function(){
                  var passwordValue = $(this).val();
                  
                  $("#new-password").val(passwordValue);
                  $("#new-password-confirm").val(passwordValue);
            });
      
            function findAccount(userEmail, successForAnalyticsService, failure){
                  var AnalyticsServices = [
                        "https://nebula.precog.com/",
                        "https://beta.precog.com/"
                  ];
                  
                  var currentAttempt = 0;
                  
                  function tryNextAnalyticsService() {
                        if (currentAttempt < AnalyticsServices.length) {
                              var analyticsService = AnalyticsServices[currentAttempt];
                              
                              currentAttempt = currentAttempt + 1;
                              
                              var successCallback = successForAnalyticsService(analyticsService);
                              
                              Precog.findAccount(userEmail, successCallback, function(code, details){
                                    tryNextAnalyticsService();
                              }, {
                                    analyticsService : analyticsService
                              });
                        } else {
                              failure();
                        }
                  }
                  
                  tryNextAnalyticsService();
            }
      
            $("#precog-form-login").submit(function(e){
                  $("#form-error").remove();
                  
                  var userEmail = $("#login-email").val();
                  var userPassword = $("#login-password").val();
                  
                  $.getScript("/js/precog.js", function(){
                        findAccount(userEmail,
                              function(serviceUrl) {
                                    
                                    return function(accountId){
                                          Precog.describeAccount(userEmail, userPassword, accountId, function(data){
                                                
                                                sessionStorage.setItem('PrecogAccount_Email', userEmail);
                                                sessionStorage.setItem('PrecogAccount_ApiKey', data.apiKey);
                                                sessionStorage.setItem('PrecogAccount_AnalyticsService', serviceUrl);
                                                sessionStorage.setItem('PrecogAccount_BasePath', data.rootPath);
                                                sessionStorage.setItem('PrecogAccount_Login', 'Logged In');
                                                sessionStorage.setItem('PrecogAccount_ID', accountId);
                                                      
                                                window.location = "/account/";
                                                
                                          }, function(){
                                                $("#precog-form-login").append("<div id='form-error'><p class='error-font'>The password you entered is incorrect. Please retype your password and try again.</p></div>").find("#form-error").delay(2000).fadeOut(500);
                                                // USER PASSWORD IS WRONG!!! ASK USER TO CORRECT!!!!
                                          }, {
                                                analyticsService: serviceUrl
                                          });
                                    }
                              },
                              function() {
                                    $("#precog-form-login").append("<div id='form-error'><p class='error-font'>We were unable to find your account, please double check your enter email address.</p></div>").find("#form-error").delay(2000).fadeOut(500);
                                    // USER HAS NO ACCOUNT ANYWHERE!!! MAYBE EMAIL IS WRONG???
                              }
                        );
                  });
                  
                  e.preventDefault();
                  return false;
            });
            
            $("#precog-form-create-account").submit(function(e){
                  $("#form-error").remove();
                  
                  var userEmail = $("#user-email").val();
                  var userName = $("#login-name").val();
                  var userCompany = $("#login-company").val();
                  var userTitle = $("#create-title").val();
                  var userPassword = $("#new-password").val();
                  var userNewPassword = $("#new-password-confirm").val();
                  
                  if (userPassword == userNewPassword) {
                        
                        if (userName.length < 4) {
                              $("#precog-form-create-account").append("<div id='form-error'><p class='error-font'>Your name must be at least 4 characters. Please re-enter your name.</p></div>").find("#form-error").delay(2000).fadeOut(500);
                        } else if (userCompany.length < 3) {
                              $("#precog-form-create-account").append("<div id='form-error'><p class='error-font'>Your company must be at least 4 characters. Please re-enter your company.</p></div>").find("#form-error").delay(2000).fadeOut(500);
                        } else if (userTitle == "") {
                              $("#precog-form-create-account").append("<div id='form-error'><p class='error-font'>The title field is empty. Please re-enter your title.</p></div>").find("#form-error").delay(2000).fadeOut(500);
                        } else if (userPassword.length < 6 ) {
                              $("#precog-form-create-account").append("<div id='form-error'><p class='error-font'>Your password must be at least 6 characters. Please re-enter your password.</p></div>").find("#form-error").delay(2000).fadeOut(500);
                        } else {
                        
                              $.getScript("/js/precog.js", function(){
                                    findAccount(userEmail,
                                          function(serviceUrl) {
                                                return function(accountId){
                                                      //RESET YOUR PASSWORD OR LOGIN
                                                      $("#precog-form-create-account").append("<div id='form-error'><p class='error-font'>We found a previous account under your e-mail address. Please attempt to login or reset your password.</p></div>").find("#form-error").delay(2000).fadeOut(500);
                                                }
                                          }, function(){
                                                Precog.$.Config.analyticsService = "https://beta.precog.com/";
                                                //CREATE NEW ACCOUNT
                                                Precog.createAccount(userEmail, userPassword, function(data){
                                                      var accountDetail = data;
                                                      
                                                      Precog.describeAccount(userEmail, userPassword, accountDetail.accountId, function(data){
                                                            var additionalAccountDetails = data;
                                                            
                                                            sessionStorage.setItem('PrecogAccount_Email', userEmail);
                                                            sessionStorage.setItem('PrecogAccount_Name', userName);
                                                            sessionStorage.setItem('PrecogAccount_Company', userCompany);
                                                            sessionStorage.setItem('PrecogAccount_ID', accountDetail.accountId);
                                                            sessionStorage.setItem('PrecogAccount_ApiKey', additionalAccountDetails.apiKey);
                                                            sessionStorage.setItem('PrecogAccount_AnalyticsService', Precog.$.Config.analyticsService);
                                                            sessionStorage.setItem('PrecogAccount_BasePath', additionalAccountDetails.rootPath);
                                                            sessionStorage.setItem('PrecogAccount_Login', 'Logged In');
                                                            
                                                            
                                                            window.location = "/account/"
                                                            
                                                      });
                                                      
                                                }, function(e){
                                                      //ERROR IF COULD NOT CREATE PRECOG ACCOUNT
                                                }, {
                                                      "profile" : {
                                                            name : userName,
                                                            title : userTitle,
                                                            company : userCompany
                                                      }
                                                });
                                          }
                                    );
                              });
                        }
                      
                  } else {
                        $("#precog-form-create-account").append("<div id='form-error'><p class='error-font'>The passwords you have entered do not match. Please check your entry and try again.</p></div>").find("#form-error").delay(2000).fadeOut(500);
                  }
                  
                  e.preventDefault();
                  return false;
            });
      
            $("#reset-password").click(function(e){
                  e.preventDefault();
                  
                  var userEmail = $("#login-email").val();
                  
                  if (userEmail) {
                        $.getScript("/js/precog.js", function(){
                              Precog.$.Config.analyticsService = "https://beta.precog.com/";
                              
                              Precog.requestResetPassword(userEmail, function(){
                                    $("#precog-form-login").append("<div id='form-success'><p class='success-font'>A reset link has been sent to your e-mail.</p></div>").find("#form-success").delay(2000).fadeOut(500);
                              }, function(){
                                    $("#precog-form-login").append("<div id='form-error'><p class='error-font'>The email address you have entered is not valid. Please try again.</p></div>").find("#form-error").delay(2000).fadeOut(500);
                              });
                        });
                  } else {
                        $("#precog-form-login").append("<div id='form-error'><p class='error-font'>Please enter an email address.</p></div>").find("#form-error").delay(2000).fadeOut(500);
                  }
            });
      }
      
      /*ACCOUNT-PAGE*/
      if (currentLocation == "/account/") {
            var userEmail = sessionStorage.getItem('PrecogAccount_Email');
            var userName = sessionStorage.getItem('PrecogAccount_Name');
            var userCompany = sessionStorage.getItem('PrecogAccount_Company');
            var userAccountID = sessionStorage.getItem('PrecogAccount_ID');
            var userApiKey = sessionStorage.getItem('PrecogAccount_ApiKey');
            var userAnalyticsService = sessionStorage.getItem('PrecogAccount_AnalyticsService');
            var userBasePath = sessionStorage.getItem('PrecogAccount_BasePath');
            var userLoggedIn = sessionStorage.getItem('PrecogAccount_Login');
            
            if (userLoggedIn) {
                  $("#account-email h3").html(userEmail);
                  $("#account-name h3").html(userName);
                  $("#account-company h3").html(userCompany);
                  $("#account-apikey").html(userApiKey);
                  $("#account-analyticsservice").html(userAnalyticsService);
                  $("#account-basepath").html(userBasePath);
                  $("#account-id").html(userAccountID);
                  
                  var urlService = userAnalyticsService.substring(0, userAnalyticsService.length - 1);
                  console.log(urlService);
                  
                  $.getScript("/js/precog.min.js", function(){
                  
                        var precogApi = new Precog.api({"apiKey": userApiKey, "analyticsService" : urlService});
                            
                        $("#form-path").val(userBasePath);
                    
                        var container = $("#current-api-keys");
    
                        precogApi.listApiKeys().then(function(data){
                            
                                for (var i = 0; i < data.length; i++) {
                                    var dl = $("<dl></dl>").appendTo(container);
                                    var obj = data[i];
                                    var path = obj.grants[0].permissions[0].path;
                                    $("<dt>" + obj.name + "</dt><dd>" + obj.description + "</dd><dd>" + obj.apiKey + "</dd><dd>" + path + "</dd><a class='delete-key' href='#'>Delete Key</a>").appendTo(dl);
                                    var ulGrants = $("<ul class='grants'></ul>").appendTo($('<dd></dd>').appendTo(dl));
                                    var grantsVar = obj.grants;
                                    
                                    for (var j = 0; j < grantsVar.length; j++) {
                                        
                                        var grantActual = grantsVar[j];
                                        var ulPermissions = $("<li><ul class='permissions'></ul></li>").appendTo(ulGrants).find(".permissions");
                                        var grantPermissions = grantsVar[j].permissions
                                        
                                        for (var k = 0; k < grantPermissions.length; k++) {
                    
                                            var permissionActual = grantPermissions[k];
                                            var permissionAppend = permissionActual.accessType;
                                            $("<li>" + permissionAppend + "</li>").appendTo(ulPermissions);
                                        }
                                    }
                                }
                        });
                        
                        $("#current-api-keys").on("click", "a", function(e){
                            e.preventDefault();
                            var killKey = $(this).parent().find("dd:nth-child(3)").html();
                            
                            function confirmDelete() {
                                var doubleCheck = confirm("Are you sure you want to delete this API Key?");
                                
                                if (doubleCheck == true) {
                                    precogApi.deleteApiKey(killKey);
                                    location.reload();
                                } else {
                                }
                            }
                            confirmDelete();
                        });
                        
                        $("#precog-create-apikey").submit(function(e){
                            
                            var formName = $("#form-name").val();
                            var formDescription = $("#form-description").val();
                            var formPath = $("#form-path").val();
                            var accountID = userAccountID;
                            
                            if (formName.length < 1 || formDescription.length < 3 || formPath.length < 3) {
                                $(".precog-account-form-full").append("<div id='form-error'><p class='error-font'>Please check entry fields. Each field must contain a value.</p></div>").find("#form-error").delay(2000).fadeOut(500);
                            } else {
                                
                                var grantPermissions = new Array();
                                    
                                $('input:checked').each(function() {
                                    grantType = $(this).attr('value');
                                    
                                    grantPermissions.push({ accessType: grantType, path: formPath, ownerAccountIds: [accountID]});
                                });
                                    
                                if (grantPermissions.length < 1) {
                                    $(".precog-account-form-full").append("<div id='form-error'><p class='error-font'>Please select at least one grant to be associated with this API Key</p></div>").find("#form-error").delay(2000).fadeOut(500);
                                } else {
                                
                                    var grants = {
                                        "name": formName,
                                        "description": formDescription,
                                        "grants": [{
                                            "name": "Grant For-" + formName,
                                            "description": "Grant For-" + formDescription,
                                            "permissions" : grantPermissions
                                        }
                                        ]
                                    }
                                
                                    precogApi.createApiKey(grants).then(function(data){
                                        var newKey = "<dt>" + data.name + "</dt><dd>" + data.description + "</dd><dd>" + data.apiKey + "</dd><a class='delete-key' href='#'>Delete Key</a>";
                                        $("#current-api-keys dl").append(newKey)
                                    },function(data){
                                        //UNABLE TO CREATE GRANT
                                    });
                                    
                                }
                            }
                            
                            e.preventDefault();
                            return false;
                        });
                        
                  });
                  
            } else {
                  window.location = "/account/login/";
            }
            
            var labcoatLink = ("https://labcoat.precog.com/?apiKey=" + userApiKey + "&basePath=" + userBasePath + "&analyticsService=" + userAnalyticsService);
            
            $(".product-link-labcoat").attr("href", labcoatLink);
      }
      
      //RESET PASSWORD
      if (currentLocation == "/account/reset-password-complete/") {
            function GetURLParameter(sParam){
                  var sPageURL = window.location.search.substring(1);
                  var sURLVariables = sPageURL.split('&');
                  for (var i = 0; i < sURLVariables.length; i++) 
                  {
                        var sParameterName = sURLVariables[i].split('=');
                        if (sParameterName[0] == sParam) 
                        {
                              return sParameterName[1];
                        }
                  }
            }
            
            var precogService = GetURLParameter('service');
            var precogAccountId = GetURLParameter('accountId');
            var precogToken = GetURLParameter('token');
      
            $("#precog-form-reset-complete").submit(function(e){
                  var newPassword = $("#new-password").val();
                  var newPasswordConfirm = $("#new-password-confirm").val();
                  
                  if (newPassword == newPasswordConfirm) {
                        var path = "https://" + precogService + "/accounts/v1/accounts/" + precogAccountId + "/password/reset/" + precogToken;
                        var data = {"password": newPassword };
                        
                        function success(){
                              window.location = "/account/login/";
                        }
                        
                        $.ajax({
                              type: "POST",
                              url: path,
                              processData : false,
                              contentType : "application/json",
                              data: JSON.stringify(data),
                              success: success,
                              dataType: "text"
                        });
                      
                  } else {
                        $(".precog-account-form").append("<div id='form-error'><p class='error-font'>The passwords you have entered do not match. Please check your entry and try again.</p></div>").find("#form-error").delay(2000).fadeOut(500);
                  }
                  
                  e.preventDefault();
                  return false;
            });
      
      }
      
      //POP UP
      $(".pop-up-form").click(function(event){
            event.preventDefault()
            
            $("#pop-up-form").animate({
                  opacity: 1.0,
                  right: '20px'
            }, 500);
      });
      
      $(".icon-close-frame").click(function(){
            $("#pop-up-form").animate({
                  opacity: 0.0,
                  right: '-400px'
            }, 500);
      });
      
      //GET TITLES
      if (currentLocation == "/solutions/white-label-reporting/" || currentLocation == "/solutions/social-media-analytics/" || currentLocation == "/solutions/web-analytics/") {
            $("#section-body h2").each(function(){
                  var link = $(this).attr("title");
                  var titles = $(this).attr("title").replace('-', ' ');
                  
                  $(this).attr('id', link);
                  $("#body-links").append("<a href='#" + link + "'>" + titles + "</a>");
            });
      }
      
      //NEWSLETTER      
      $("#newsletter-signup-form tr:last-child td:last-child input").addClass("small-button red-background");
      
      $("#hiw-menu li").click(function(){
            var currentPanel = $(this).html().split(" ");
            var newPanel = "#howitworks-panel #" + (currentPanel[2].toLowerCase());
            
            $("#howitworks-panel .panel").hide();
            $(newPanel).show();
            
            $(".panel-content").hide().removeClass("active-content");
            $(newPanel + " .panel-content:first-child").show();
      });
      
      $("#howitworks-panel .panel .first li").click(function(){
            var currentItem = $(this).attr("class");
            
            $(".panel-content").hide().removeClass("active-content");
            $(this).parent(".first").siblings("." + currentItem + "-content").show();
      });
      
      $("#howitworks-panel .panel .first-alt li").click(function(){
            var currentItem = $(this).attr("class");
            
            $(".panel-content").hide().removeClass("active-content");
            $(this).parent(".first-alt").siblings("." + currentItem + "-content").show();
      });
      
      $("#simple-code-box .first li").click(function(){
            var currentItem = $(this).attr("class");
            
            $(".code-panel").hide().removeClass("active-content");
            $("#" + currentItem + "-code").show();
      });
      
});