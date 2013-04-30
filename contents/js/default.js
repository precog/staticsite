var currentLocation = window.location.pathname;

$(document).ready(function(){
      
      if (currentLocation == "/about/") {
            /*TEAM ANIMATIONS*/
            $("#section-body #previous").mouseenter(function(){
                  $(this).css('opacity','1.0');
                  function leftFunction() {
                        var currentPosition = $("#section-body #team-cards #cards-slider").css("left");
                        var cpValue = parseInt(currentPosition, 10);
                        
                        if(cpValue < 0){
                              $("#section-body #team-cards #cards-slider").animate({left:"+=10"},1, leftFunction);     
                        } 
                  }
                  $(leftFunction);    
      
            }) .mouseleave(function(){
                  $(this).css('opacity','0.7');
                  $("#section-body #team-cards #cards-slider").stop();
            });
            
            $(function(){
                  var totalNumber = parseInt($("#cards-slider ul li").length);
                  var totalWidth = parseInt($("#cards-slider ul li").outerWidth(true));
                  var totalLength = totalNumber * totalWidth;
                  $("#section-body #team-cards #cards-slider").css('width', totalLength)
                  $("#section-body #team-cards #cards-slider").css('width', totalLength)
                  if($("#team-cards").length) {$("body").css('overflow-x', 'hidden');}
            });
            
            
            $("#section-body #next").mouseenter(function(){
                  $(this).css('opacity','1.0');
                  function rightFunction() {
                        var totalNumber = parseInt($("#cards-slider ul li").length);
                        var totalWidth = parseInt($("#cards-slider ul li").outerWidth(true));
                        var totalLength = totalNumber * totalWidth;
                        var stopValue = totalLength - 1050;
                        var currentPosition = $("#section-body #team-cards #cards-slider").css("left");
                        var cpValue = parseInt(currentPosition, 10) * -1;    
                        
                        if(cpValue != stopValue) {
                              $("#section-body #team-cards #cards-slider").animate({left:"-=10"},1, rightFunction);
                        }
                  }
                  $(rightFunction);
                  
            }).mouseleave(function(){
                  $(this).css('opacity','0.7');
                  $("#section-body #team-cards #cards-slider").stop();
            });
            
            /*EMPLOYEE ANIMATIONS*/
            $(function() {
                  var photoPopulate = $("#team-cards #cards-slider ul li").each(function(){
                        var photoPopulate2 = $(this).text().replace(/ /g,'').toLowerCase();
                        $(this).addClass(photoPopulate2);
                  });
            });
            
            if(window.location.hash) {
                  var urlEmployee = window.location.hash.substring(1);
                  setTimeout(function (){
                        var elementIndex = $("#cards-slider ul li." + urlEmployee).index();
                        var elementWidth = $("#cards-slider ul li." + urlEmployee).outerWidth(true);
                        var leftAdjust = elementIndex * elementWidth
                        
                        $("#section-body #team-cards #cards-slider").animate({
                              left: "-" + leftAdjust
                            }, 1000 );
                  }, 0);
                  
                  $("#team-information .information-employee").css('display', 'none');
                  $("#team-information ." + urlEmployee).css('display', 'block');
            }
            
            $("#team-cards #cards-slider ul li").hover(function(){
                  var currentValue = "." + $(this).text().replace(/ /g,'').toLowerCase();
                  $("#team-information .information-employee").css('display', 'none');
                  $(currentValue).css('display', 'block');
                  
                  var changeHeight = parseInt($("#team-information " + currentValue).css("height"));
                  
                  $("#section-body #team-information").animate({
                        'height': changeHeight + 60
                        }, {queue: false}
                  );
            });
      }
      
      $("#body-links").on("click", "a", function(e){
            e.preventDefault();
            
            $('html, body').animate({
                  scrollTop: $($(this).attr('href')).offset().top - 80
            }, 500);
      });
      
      /*PROTECTED LINKS*/
      $(".phone-link").html("888.673.9958");
      $(".sales-link").html("sales@precog.com").attr("href", "mailto:sales@precog.com");
      $(".jobs-link").html("jobs@precog.com").attr("href", "mailto:jobs@precog.com");
      $(".marketing-link").html("marketing@precog.com").attr("href", "mailto:marketing@precog.com");

});