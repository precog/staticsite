$(document).ready(function(){
    /*FORM FUNCTIONALITY*/

    var expose = window.PrecogWeb || (window.PrecogWeb = {});
    var animateGraphicsLevel1 = expose.animateGraphicsLevel1 = function(evaluationInput, questionsLeft, remainingMissableQuestions){
        
        if (evaluationInput == true) {
            console.log($("#liquid").css('top'));
            
            var currentTop = parseInt($("#liquid").css('top'));
            console.log(currentTop);
            var topAdjustment = (currentTop / questionsLeft);
            console.log(topAdjustment);
            
            $("#liquid").animate({
                'top': '-=' + topAdjustment
            });
            
            if (questionsLeft == 1) {
                $("#overlay").animate({
                    'opacity': '0.4'
                });
                
                $("#success").fadeIn(1000);
                
                $("#rocket").delay(1000).animate({
                    top: '-400px'
                });
            }
            
        } else if (evaluationInput == false) {
            
            var zombieWalk = parseInt($("#zombie").css("left")) - 200;
            console.log(zombieWalk);
            var zombieMove = (zombieWalk / remainingMissableQuestions);
            console.log(zombieMove);
            
            $("#zombie").animate({
                'left': '-=' + zombieMove
            }, 1000);
            
            $("#zombie p").fadeIn(1000).delay(1000).fadeOut(1000);
            
            if (remainingMissableQuestions == 1) {
                $("#overlay").animate({
                    'opacity': '0.4'
                });
                $("#fail").fadeIn(1000);
                
                $("#censored-flag h4").fadeIn(1000);
            }
        }
        
        return false
    }
});
