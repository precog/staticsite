var currentLocation = window.location.pathname;
var currentGenLocation = window.location.pathname.substr(0,10);

$(document).ready(function(){
      
      //PRODUCT PAGES
      if (currentLocation == "/products/precog/" || currentLocation == "/products/reportgrid/" || currentLocation == "/products/labcoat/") {
      
            $("#section-body").css({
                  paddingTop: "0px"
            });
            
            $("#menu-dropdown").mouseenter(function(){
            $("#head-usecase-menu li a").css({
                  display: 'block'
                  });
            });
            
            $("#head-usecase-menu ul").mouseleave(function(){
                  $("#head-usecase-menu li a").css({
                        display: 'none'
                  });
                  
                  $("#head-usecase-menu li a.active").css({
                        display: 'block'
                  });
            });
            
            
            //GET TITLES
            $("#section-body-products .two-columns h1, #section-body-products .two-columns h2, #section-body-products .two-columns h3").each(function(){
                  var link = $(this).html().replace(/ /g, '-').toLowerCase();
                  var titles = $(this).html();
                  $(this).attr('id', link);
            });
            
            $("#section-body-products .two-columns h1").each(function(){
                  var link = $(this).html().replace(/ /g, '-').toLowerCase();
                  var titles = $(this).html();
                  
                  $("#body-links").append("<a href='#" + link + "'>" + titles + "</a>");
            });
            
            //PRECOG STUFF
            if (currentLocation == "/products/precog/") {
                  $("#rocket-head-graphic a").hover(function(){
                        var currentPanel = $(this).attr('id');
                        var currentPanelActivate = currentPanel.substr(currentPanel.length - 1);
                        
                        $("#section-hilight p").css({
                              display: 'none'
                        });
                        
                        $(".hilight-" + currentPanelActivate).css({
                              display: 'block'
                        });
                  });
                  
                  $("#rocket-head-graphic").mouseleave(function(){
                        $("#section-hilight p").css({
                              display: 'none'
                        });
                  });
            }
            
            /*EDITIONS BOXES*/
            var numberOE = $(".edition-box").length;
            var containW = $(".edition-box").parent().width();
            var wadjust =  ($(".edition-box").width() * numberOE) + 60;
            var boxW = (containW - wadjust);
            
            $("#advanced-editions-box .box-text").css({
                left: wadjust + "px",
                width: boxW + "px"
            });
            
            $(".edition-box").hover(function(){
                var currentId = $(this).attr('id');
                
                $(".box-text").css({display: 'none'});
                $("." + currentId).css({display: 'block'});
            });
            
            //REPORTGRID STUFF
            if (currentLocation == "/products/reportgrid/") {
                  
                  $('head').append('<link rel="stylesheet" href="https://api.reportgrid.com/css/rg-charts.css">');
                  $('head').append('<link rel="stylesheet" href="https://api.reportgrid.com/css/colors/rg-colors-spectral-4-divr.css">');
                  
                  ReportGrid.sankey("#sankey-chart", {
                        axes : ["count"],
                        load : ReportGrid.query.data([{"id":"Need Data Visualization","count":120},{"id":"Companies who Do It Yourself","count":80},{"id":"Companies who Use ReportGrid","count":60},{"id":"Companies happy with DIY","count":15},{"id":"Companies unhappy with DIY","count":65},{"id":"Companies happy with ReportGrid","count":60},{"tail":"Need Data Visualization","head":"Companies who Do It Yourself","count":80},{"tail":"Need Data Visualization","head":"Companies who Use ReportGrid","count":40},{"tail":"Companies who Do It Yourself","head":"Companies happy with DIY","count":15},{"tail":"Companies who Do It Yourself","head":"Companies unhappy with DIY","count":65},{"tail":"Companies unhappy with DIY","head":"Need Data Visualization","count":40},{"tail":"Companies unhappy with DIY","head":"Companies who Use ReportGrid","count":20},{"tail":"Companies who Use ReportGrid","head":"Companies happy with ReportGrid","count":60}]),
                        options : {
                              "width": 860,
                              "height": 420,
                              "layerwidth": 60,
                              "nodespacing": 120,
                              "dummyspacing": 24,
                              "backedgespacing": 15,
                              "extraheight": 2,
                              "extraradius": 20,
                              "labelnodespacing": 20,
                              "displayexit": false,
                              "layoutmethod": "weightbalance"
                        }
                  });
            }

      }
      
      //HOW IT WORKS CODE
      if (currentLocation == "/how-it-works/") {
            
            $(".page-title").remove();
            
            $("#section-body").css({
                  backgroundColor: "#15171A",
                  backgroundImage: "none"
            });
            
            //SCROLL TO TOP
            $("body").animate({ scrollTop: 0 });
            $(this).scrollTop(0);
            
            //SET TIP HEIGHT
            function dynamicPositioning(){
                  
                  $("#background-body").css({
                        height: window.innerHeight
                  });
            }
            
            dynamicPositioning ();
            
            $(window).resize(function() {
                  dynamicPositioning();
            });
            
            //ANIMATE REMINDER
            var cancelAnim = 0;
            
            function repeat(times, callback) {
                  for(var start = 0; start<times; start++) callback();
            }
          
            function bobReminder(){
                  $("#scroll-reminder").animate({
                        bottom: '+=10'
                  }, 200);
                  
                  $("#scroll-reminder").animate({
                              bottom: '-=10'
                  }, 200);
            }
            
            if (cancelAnim == 0) {
                  setInterval(function(){repeat(2, bobReminder)},6000);
            }
            
            var runOnce = 0;
            
            function assembleRocket(){
                  var scrollDistance = $(window).scrollTop();
                  
                  //STAGE 1
                  if (scrollDistance >= 20 && scrollDistance <= 1042 && runOnce == 0) {
                        $("#intro-text").animate({
                              'opacity': '0.0',
                              'height': '0px'
                        }, 500, function(){
                              $("#stage-1").css({
                                    position: 'fixed',
                                    top: '188px',
                                    bottom: '0px'
                              });
                              
                              $("#stage-1").animate({
                                    top: '108px'
                              });
                              
                              $("#scroll-reminder").animate({
                                    left: '0',
                                    width: '100px'
                              }, 200);
                        });
                        
                        runOnce++
                        cancelAnim++
                        
                        $("#your-data").animate({
                              'opacity': '1.0',
                              'z-index': '100'
                        });
                        
                  } else if (scrollDistance >= 1043 && scrollDistance <= 2142 && runOnce == 1) {
                        
                        $("#stage-2").css({
                              position: 'fixed',
                              top: '264px'
                        });
                        
                        runOnce++
                        
                        $("#your-data").animate({
                              'opacity': '0.0'
                        });
                        
                        $("#our-marketplace").animate({
                              'opacity': '1.0',
                              'z-index': '100'
                        });
                        
                  } else if (scrollDistance >= 2143 && scrollDistance <= 3284 && runOnce == 2) {
                        
                        $("#stage-3").css({
                              position: 'fixed',
                              top: '362px'
                        });
                        
                        runOnce++
                        
                        $("#our-marketplace").animate({
                              'opacity': '0.0'
                        });
                        
                        $("#smart-integration").animate({
                              'opacity': '1.0',
                              'z-index': '100'
                        });
                        
                  } else if (scrollDistance >= 3285 && scrollDistance <= 4435 && runOnce == 3) {
                        
                        $("#stage-4").css({
                              position: 'fixed',
                              top: '423px'
                        });
                        
                        runOnce++
                        
                        $("#smart-integration").animate({
                              'opacity': '0.0'
                        });
                        
                        $("#quirrel").animate({
                              'opacity': '1.0',
                              'z-index': '100'
                        });
                        
                  } else if (scrollDistance >= 4436 && scrollDistance <= 5635 && runOnce == 4) {
                        
                        $("#stage-5").css({
                              position: 'fixed',
                              top: '471px'
                        });
                        
                        runOnce++
                        
                        $("#quirrel").animate({
                              'opacity': '0.0'
                        });
                        
                        $("#easy-data-science").animate({
                              'opacity': '1.0',
                              'z-index': '100'
                        });
                        
                  } else if (scrollDistance >= 5636 && scrollDistance <= 6636 && runOnce == 5) {
                        
                        $("#stage-6").css({
                              position: 'fixed',
                              top: '568px',
                              opacity: '1.0'
                        });
                        
                        runOnce++
                        
                        $("#easy-data-science").animate({
                              'opacity': '0.0'
                        });
                        
                        $("#deployment").animate({
                              'opacity': '1.0',
                              'z-index': '100'
                        });
                        
                        $("#stage-6").animate({
                              top: '607px'
                        }, 500);
                        
                  } else if (scrollDistance >= 6637 && scrollDistance <= 7613 && runOnce == 6) {
                        
                        $("#deployment").animate({
                                    'opacity': '0.0'
                        }, function(){
                              
                              $("#stage-1, #stage-2, #stage-3, #stage-4, #stage-5, #stage-6, #stage-7").effect("shake", {distance: 1, times:4 }, 100).animate({
                                    top: '-=1000'
                              }, 400, function(){
                                    $("#action").animate({
                                          'opacity': '1.0',
                                          'z-index': '100'
                                    }/*, function(){
                                          $("#full-page-content").css({
                                                height: '450px'
                                          });
                                    }*/);
                                    
                                    $("#scroll-reminder").remove();
                              });
                        });
                        
                        runOnce++
                  }
            }
      
            $(window).scroll(function(){
                  assembleRocket();
            });
            
            //ICON ANIMATIONS
            $(".section-icons-right ul li").mouseenter(function(){
                  $(this).find(".icon-item").animate({
                        top: '-94px'
                  }, {duration:400, queue: false});
            }).mouseleave(function(){
                  $(this).find(".icon-item").animate({
                        top: '0px'
                  }, {duration:400, queue: false});
            });
      }
      
      //EDITIONS PAGES
      if (currentGenLocation == "/editions/") {
            
            $("#section-body .two-columns h1, #section-body .two-columns h2, #edition-content h1, #edition-content h2").each(function(){
                  var link = $(this).html().replace(/ /g, '-').toLowerCase();
                  var titles = $(this).html();
                  $(this).attr('id', link);
            });
            
            $("#section-body .two-columns h1, #section-body #edition-content h1").each(function(){
                  var link = $(this).html().replace(/ /g, '-').toLowerCase();
                  var titles = $(this).html();
                  
                  $("#body-links").append("<a href='#" + link + "'>" + titles + "</a>");
            });
            
            //PRICING PAGE
            var dynamicCWidth = $("#dynamic-pricing-chart").width();
            var dynamicOptions = $(".pricing-chart-option").length;
            var dynamicWidth = (dynamicCWidth / dynamicOptions) -42;
            
            $(".pricing-chart-option").css({
                  width: dynamicWidth,
                  marginRight: '2px',
                  padding: '20px'
            });
            
            if (currentLocation == "/editions/reportgrid-api/") {
                  $.getScript("http://api.reportgrid.com/js/reportgrid-charts.js?authCode=r59uh0XNfjFqI1M%2ByxJK33KGZ0Mm82UqEme9ShK7g12KlIHBhCZK1rFV7KdOHgZ7GAePArW%2FT4EuOgzCPCbZB%2BAGlqH7I8OeRMwxKJA5lSRO1GTNp5IkXcrS4rKVj0KT3jnc%2Fkc6gJBjzZPBwwX10Xgdg2%2B%2FKI1QnoOCVhDJ8Hg%3D", function(){
                        $('head').append('<link rel="stylesheet" href="https://api.reportgrid.com/css/rg-charts.css">');
                        $('head').append('<link rel="stylesheet" href="https://api.reportgrid.com/css/colors/rg-colors-spectral-4-divr.css">');
                  });   
            }
            
            /*DYNAMIC PRICING BUTTONS*/
            $("#dynamic-editions-pricing-buttons a").css({
                  width: dynamicWidth + 20
            });

      }
      
      //LOGIN
      if (currentLocation == "/account/login/") {
            /*function GetURLParameter(sParam){
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
            var precogToken = GetURLParameter('token');*/
      
            $("#precog-form-login").submit(function(e){
                  var userEmail = $("#login-email").val();
                  var userPassword = $("#login-password").val();
                  
                  console.log(userEmail);
                  console.log(userPassword);
                  
                  /*$.getScript("https://github.com/precog/client-libraries/blob/master/precog/js/src/precog.js", function(){
                        Precog.findAccount(userEmail, function(data){
                              var accountId = (data);
                              
                              Precog.describeAccount(userEmail, userPassword, accountId, function(data){
                              }, function(){
                                    console.log(data);
                                    
                                    $.cookie('PrecogAccount_Email', userEmail);
                                    $.cookie('PrecogAccount_ApiKey', userApiKey);
                                    $.cookie('PrecogAccount_WebService', userWebService);
                                    $.cookie('PrecogAccount_RootPath', userRootPath);
                              }, function(){
                                    alert(e);
                              });
                              
                        }, function(){
                        
                        });
                  });*/
                  
                  e.preventDefault();
                  return false;
            });
            
            $("#precog-form-create-account").submit(function(e){
                  var userEmail = $("#user-email").val();
                  var userName = $("#login-name").val();
                  var userCompany = $("#login-company").val();
                  var userTitle = $("#login-title").val();
                  var userPassword = $("#new-password").val();
                  var userNewPassword = $("#new-password-confirm").val();
                  
                  /*if (userPassword == userNewPassword) {
                        console.log(userEmail);
                        console.log(userName);
                        console.log(userCompany);
                        console.log(userTitle);
                        console.log(userPassword);
                        console.log(userNewPassword);
                        
                        Precog.createAccount(userEmail, userPassword, function(data){
                              var accountDetail = (data);
                              
                              Precog.describeAccount(userEmail, userPassword, accountDetails.id, function(data){
                                    var additionalAccountDetails = (data);
                                    
                                    $.cookie('PrecogAccount_Email', userEmail);
                                    $.cookie('PrecogAccount_ApiKey', userApiKey);
                                    $.cookie('PrecogAccount_WebService', userWebService);
                                    $.cookie('PrecogAccount_RootPath', userRootPath);
                              });
                        }, function(e){
                              alert(e);
                        });
                      
                  } else {
                        $(".precog-account-form").append("<div id='form-error'><p class='error-font'>The passwords you have entered do not match. Please check your entry and try again.</p></div>").find("#form-error").delay(5000).fadeOut(1000);
                  }*/
                  
                  e.preventDefault();
                  return false;
            });
      
      }
      
      /*ACCOUNT-PAGE*/
      if (currentLocation == "/account/home/") {
            var userEmail = $.cookie('PrecogAccount_Email');
            var userApiKey = $.cookie('PrecogAccount_ApiKey');
            var userWebService = $.cookie('PrecogAccount_WebService');
            var userRootPath = $.cookie('PrecogAccount_RootPath');
            
            $("#account-email").html(userEmail);
            $("#account-apikey").html(userApiKey);
            $("#account-webservice").html(userWebService);
            $("#account-rootpath").html(userRootPath);
            
            $.removeCookie(userEmail);
            $.removeCookie(userApiKey);
            $.removeCookie(userWebService);
            $.removeCookie(userRootPath);
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
                        
                        console.log(precogService);
                        
                        function success(r){
                              window.location = "https://labcoat.precog.com/?analyticsService=" + encodeURIComponent("https://" + precogService + "/");
                        }
                        
                        $.ajax({
                              type: "POST",
                              url: path,
                              processData : false,
                              contentType : "application/json",
                              data: JSON.stringify(data),
                              success: success,
                        });
                      
                  } else {
                        $(".precog-account-form").append("<div id='form-error'><p class='error-font'>The passwords you have entered do not match. Please check your entry and try again.</p></div>").find("#form-error").delay(5000).fadeOut(1000);
                  }
                  
                  e.preventDefault();
                  return false;
            });
      
      }
      
      //EVENTS PAGE
      if (currentLocation == "/about/events/") {
            Eventbrite({'app_key': "5AI72CC3MRJSEYOERZ", 'user_key':"136580247858400500469"}, function(eb_client){
                  eb_client.user_list_events ( {}, function( response ){
                        $( '#everbrite-event-list' ).html( eb_client.utils.eventList( response, eb_client.utils.eventListRow ));
                  });      
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
      
});