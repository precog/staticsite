var currentLocation = window.location.href;

$(document).ready(function(){
    
    //MENU ACTIVATION
    if(currentLocation.indexOf("getting-started") > -1) {
        $("#fixed-menu ul.getting-started").addClass("active")
    } else if (currentLocation.indexOf("how-tos") > -1) {
        $("#fixed-menu ul.how-tos").addClass("active")
    } else if (currentLocation.indexOf("rest-apis") > -1) {
        $("#fixed-menu ul.rest-apis").addClass("active")
    } else if (currentLocation.indexOf("viz-api") > -1) {
        $("#fixed-menu ul.viz-api").addClass("active")
    }
    
    //API KEY
    $("#page-content p, #page-content ul li").each(function(){
        var html = $(this).html();
        var newHtml = html.replace(/API Key|API key|api key|Api key|Api Key/gi, '<span id="api-key" class="tt-link">API Key</span>').replace(/Root Path|Root path|RootPath|ROOT Path/gi, '<span id="root-path" class="tt-link">Root Path</span>').replace(/Account ID|Account id|Account Id/gi, '<span id="account-id" class="tt-link">Account ID</span>').replace(/grant-id|Grant-id|Grant-Id|Grant-ID/gi, '<span id="grant-id" class="tt-link">Grant ID</span>').replace(/auth api key|Auth Api Key|Auth API key/gi, '<span id="auth-api-key" class="tt-link">Auth API Key</span>').replace(/Query|query|QUERY/gi, '<span id="query" class="tt-link">Query</span>');
        
        $(this).html(newHtml);
    });
    
    //TEXT TOOL TIP FUNCTION
    $(".tt-link").mouseenter(function(){
        var currentTip = $(this).attr("id");
        var currentPosition = $(this).offset();
        var leftAdjustment = 600 - ($(this).width());
        
        var panelHeight = ($("#" + currentTip + "-tt").height()) + 120;

        $("#" + currentTip + "-tt").css({
            left: currentPosition.left -leftAdjustment,
            top: currentPosition.top -panelHeight
        }).fadeIn(100);
    }).mouseleave(function(){
        $(".tool-tip").fadeOut(100);
    });
    
    //DYNAMIC LINK GENERATION
    $("#body-content h1, #body-content h2, #body-content h3, #body-content h4, #body-content h5").each(function(){
        var val = $(this).html().replace(/ /g,'').replace(/(\r\n|\n|\r)/gm,"");
        $(this).attr('id', val);
    });
      
    $("#body-content").find("#page-content h2, #page-content h3").each(function(){
        var link = $(this).attr("id");
        var title = $(this).html();
        var tagName = this.tagName.toLowerCase();
        
        $("#section-index").append('<li class="' + tagName + '"><a href="#'+ link +'">'+ title +'</a></li>');
    });
    
    //BODY LINK SMOOTH SCROLL
    /*$("#section-index").on("click", "a", function(e){
        e.preventDefault();
        
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 50
        }, 500);
    });*/
    
    //UL DETECT
    $("ul li").each(function(){
        currentHTML = $(this).html();
        
        if (currentHTML == "JSON") {
            $(this).parent("ul").addClass("rest-request");
        }
    });
    
});
