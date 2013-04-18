$(document).ready(function(){
    /*FORM FUNCTIONALITY*/ 
    
    var expose = window.PrecogWeb || (window.PrecogWeb = {});
    var animateGraphicsLevel5 = expose.animateGraphicsLevel5 = function(evaluationInput, questionsLeft, remainingMissableQuestions){
        
        var answer = $("#answer").val();
        
        if (evaluationInput == true) {
            
            var leftEnd = 190;
            var beginLeft = 386;
            var currentLeft = parseInt($("#robot").css('left'));
            var leftTest = (currentLeft - leftEnd);
            var leftTest2 = (leftTest / questionsLeft)
            
            $("#robot, #heroine").animate({
                    'left': '-=' + leftTest2
            }, 700);
            $("#rope").animate({
                width: '-=' + leftTest2
            }, 700);
            $("#heroine .win").fadeIn(500).delay(1000).fadeOut(2000);
            
            if (questionsLeft == 1) {
                $("#overlay").animate({
                    'opacity': '0.4'
                });
                $("#success").fadeIn(1000);
                $("#robot").animate({
                    'left': '196'
                }, 700, function(){
                    $("#rope").fadeOut(1);
                    $("#heroine").animate({
                        'top': '240',
                        'left': '166'
                    }, 700);
                });
            }
            
        } else if (evaluationInput == false) {
            
            var rightEnd = 650;
            var beginLeft = 386;
            var currentLeft = parseInt($("#robot").css('left'));
            var leftTest = (rightEnd - currentLeft);
            console.log(leftTest);
            var leftTest2 = (leftTest / remainingMissableQuestions)
            
            $("#robot, #heroine").animate({
                    left: '+=' + leftTest2
                }, 700);
            $("#rope").animate({
                width: '+=' + leftTest2
            }, 700);
            $("#heroine .lose").fadeIn(500).delay(1000).fadeOut(2000);
            
            if (remainingMissableQuestions == 1) {
                $("#overlay").animate({
                    'opacity': '0.4'
                });
                $("#fail").fadeIn(1000);
            }
            
        }
        
        return false
    };

});
