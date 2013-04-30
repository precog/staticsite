var currentLocation = window.location.pathname;

$(document).ready(function(){
      
      $("h1, h2, h3, h4, h5").each(function(){
        var h2Value = $(this).html().replace(/ /g,'').replace(/(\r\n|\n|\r)/gm,"");
        $(this).attr('id', h2Value);
      });
      
      /*$(window).scroll(function(){
          var currentActive = $("#pages-documentation #main-nav #menu .active-link");
          console.log($(currentActive).closest(".first-level").children("ul"));
          $(currentActive).closest(".first-level").children("ul").addClass("visible-link");
          $(currentActive).closest(".first-level").siblings().children("ul").removeClass("visible-link");
      });
  
      $(window).scroll(function(){
          var currentActive = $("#pages-documentation #main-nav #menu ul > li").children("a.active-link").not("ul li ul a");
          console.log(currentActive);
          $(currentActive).parent().siblings().find("li a").removeClass("visible-link");
          $(currentActive).parent().find("li a").addClass("visible-link");
      });});*/
          
      var windowHeight = $(window).height();
      $(window).resize(function(){
         windowHeight = $(window).height();
         resizeWindow();
      });
      
      function resizeWindow () {
          $("#pages-documentation #main-nav #menu>ul").css({height: windowHeight - 40});
      }
      resizeWindow();
      
      $.fn.scrollBottom = function() {
          return $(document).height() - this.scrollTop() - this.height();
      };
  
      var $el = $('#menu, #developer-center-tooltips');
      var $window = $(window);
  
      $window.bind("scroll resize", function() {
          var gap = $window.height() - $el.height() - 40;
          var visibleFoot = 110 - $window.scrollBottom();
          var scrollTop = $window.scrollTop()
  
          if(scrollTop < 110 - 40){
              $el.css({
                  top: (110 - scrollTop) + "px",
                  bottom: "auto"
              });
          }else if (visibleFoot > gap) {
              $el.css({
                  top: "auto",
                  bottom: visibleFoot + "px"
              });
          } else {
              $el.css({
                  top: 40,
                  bottom: "auto"
              });
          }
      });
      
      /*function body_scroll() {
          $("#body h1").each(function(){        
              console.log(this);
              
          });
      }
      
      $(window).scroll(body_scroll);
      */
      
      /*var $ul = $("#menu ul");
      $("#body h1").each(function(){
          var $h1 = $(this),
              $li1 = $ul.append('<li class="first-level"><a href="#'+$(this).attr("id")+'">' + $(this).text() + '</a><ul></ul></li>').find("li:last"),
              $ul1 = $li1.find("ul");
          $li1.find("a").click(function(e){
              $("body,html").animate({
                          'scrollTop': $h1.offset().top
                      }, 350
                      );
                      e.preventDefault();
          });
          $(window).scroll(function() {
              $ul.find("a").removeClass("active-link");
              var found = false;
              var last = $("h1:first")[0];
              $("h1, h2, h3").each(function(){
                  if (found) return;
                  if ($(this).offset().top >= $(document).scrollTop() + 10) {
                      found = true;
                      $ul.find('a[href="#'+ $(last).attr("id") +'"]').addClass("active-link");
                  }
                  last = this;
              });
          });
          $(this).parent().find("h2").each(function(){
              var $h2 = $(this),
                  $li2 = $ul1.append('<li><a href="#'+$(this).attr("id")+'">' + $(this).text() + '</a><ul></ul></li>').find("li:last"),
                  $ul2 = $li2.find("ul");
              $li2.find("a").click(function(e){
                  $("body,html").animate({
                          'scrollTop': $h2.offset().top
                      }, 350
                      );
                      e.preventDefault();
              });            
              $(this).parent().find("h3").each(function(){
                  var $h3 = $(this),
                      $li3 = $ul2.append('<li><a href="#'+$(this).attr("id")+'">' + $(this).text() + '</a></li>').find("li:last");
                  $li3.find("a").click(function(e){
                      $("body,html").animate({
                          'scrollTop': $h3.offset().top
                      }, 350
                      );
                      e.preventDefault();
                  });
              });
          });
      });*/
      
      $(this).find("h2").each(function(){
          $(this).after('<ul id="section-index"></ui>');
          $(this).parent().find("h3").each(function(){
              var h3Value = $(this).html().replace(/ /g,'')
              var h3ValueAlt = $(this).html();
          $(this).parent().find("ul:first").append('<li><a href="#'+ h3Value +'">'+ h3ValueAlt +'</a></li>');
          });
      });
      
      $("a.button-launch-labcoat").click(function() {
        scriptRun = $(this).parent()[0].childNodes[1].nodeValue;
        scriptClean = scriptRun.replace(new RegExp(String.fromCharCode(160), "g"), '');
        labCoatAddress = ("http://labcoat.precog.com/?q=")
        
        window.open (labCoatAddress + encodeURIComponent(scriptClean));
    });
    
    $("#body").ready(function(){
        $("#body pre.execute-code").each(function(){
            var scriptRun = $(this)[0].childNodes[1].nodeValue;
            var container = $(this);
            Precog.query(scriptRun, function(result){
                container.after().append('<p>--query results--</p>' + JSON.stringify(result)); 
            });
        });
    });
    
    /*$("a.button-execute-query").click(function(e) {
        var scriptRun = $(this).parent()[0].firstChild.nodeValue;
        var container = $(this).parent();
        $(this).remove();
        Precog.query(scriptRun, function(result){
            container.parent().after().append('<h5><span>Results</span></h5><pre>' + JSON.stringify(result) + '</pre>'); 
        });
        e.preventDefault();
        return false;
    });
    
    $("a.button-copy").zclip({
        path:'/templates/Precog_Documentation/js/ZeroClipboard.swf',
        copy:function(){
            return $(this).parent()[0].firstChild.nodeValue;
        }
    });*/
    
    $("span.tool-tip-path").mouseenter(function(){
        $("#developer-center-tooltips .tool-tip").css('display', 'none');
        $("#tool-tip-path").stop(true, true).fadeIn("fast");
        }) .mouseleave(function() {
        $("#tool-tip-path").stop(true, true).delay(6000).fadeOut(500);
    });
    
    $("span.tool-tip-apikey").mouseenter(function(){
        $("#developer-center-tooltips .tool-tip").css('display', 'none');
        $("#tool-tip-apikey").stop(true, true).fadeIn("fast");
        }) .mouseleave(function() {
        $("#tool-tip-apikey").stop(true, true).delay(6000).fadeOut(500);
    });
    
    $("span.tool-tip-query").mouseenter(function(){
        $("#developer-center-tooltips .tool-tip").css('display', 'none');
        $("#tool-tip-query").stop(true, true).fadeIn("fast");
        }) .mouseleave(function() {
        $("#tool-tip-query").stop(true, true).delay(6000).fadeOut(500);
    });
    
    $("span.tool-tip-root-path").mouseenter(function(){
        $("#developer-center-tooltips .tool-tip").css('display', 'none');
        $("#tool-tip-root-path").stop(true, true).fadeIn("fast");
        }) .mouseleave(function() {
        $("#tool-tip-root-path").stop(true, true).delay(6000).fadeOut(500);
    });

    $("span.tool-tip-grant-id").mouseenter(function(){
        $("#developer-center-tooltips .tool-tip").css('display', 'none');
        $("#tool-tip-grant-id").stop(true, true).fadeIn("fast");
        }) .mouseleave(function() {
        $("#tool-tip-grant-id").stop(true, true).delay(6000).fadeOut(500);
    });
    
    $("span.tool-tip-account-id").mouseenter(function(){
        $("#developer-center-tooltips .tool-tip").css('display', 'none');
        $("#tool-tip-account-id").stop(true, true).fadeIn("fast");
        }) .mouseleave(function() {
        $("#tool-tip-account-id").stop(true, true).delay(6000).fadeOut(500);
    });
      
});