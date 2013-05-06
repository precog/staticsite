var currentLocation = window.location.pathname;

$(document).ready(function(){
      
      $("h1, h2, h3, h4, h5").each(function(){
        var val = $(this).html().replace(/ /g,'').replace(/(\r\n|\n|\r)/gm,"");
        $(this).attr('id', val);
      });
      
      $("#body h1:first-child").after('<ul id="section-index"></ui>');
      
      $("#body").find("h2, h3").each(function(){
            
          var link = $(this).attr("id");
          var title = $(this).html();
          var tagName = this.tagName.toLowerCase();
          
          $("#section-index").append('<li class="' + tagName + '"><a href="#'+ link +'">'+ title +'</a></li>');
      });
          
      var windowHeight = $(window).height();
            $(window).resize(function(){
         windowHeight = $(window).height();
         resizeWindow();
      });
      
      function resizeWindow () {
          $("#pages-documentation #main-nav #menu>ul").css({height: windowHeight - 50});
      }
      resizeWindow();
      
      $.fn.scrollBottom = function() {
          return $(document).height() - this.scrollTop() - this.height();
      };
      
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