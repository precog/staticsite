$(document).ready(function(){
    /*FORM FUNCTIONALITY*/
    
var expose = window.PrecogWeb || (window.PrecogWeb = {});
var animateGraphicsLevel3 = expose.animateGraphicsLevel3 = function(evaluationInput, questionsLeft, remainingMissableQuestions){
        
        if (evaluationInput == true) {
            
            var currentLeft = (parseInt($("#hero").css('left'))) - 432;
            var moveLeft = (currentLeft / questionsLeft);
            
            var currentTop = (parseInt($("#hero").css('top')) - 171);
            var moveTop = (currentTop / questionsLeft);
            
            var currentHeight = (parseInt($("#hero").css('height')) - 29);
            var scaleHeight = (currentHeight / questionsLeft);
            
            var currentWidth = (parseInt($("#hero").css('width')) - 19);
            var scaleWidth = (currentWidth / questionsLeft);
            
            $("#hero").animate({
                    'left': '-=' + moveLeft,
                    'top': '-=' + moveTop,
                    'height': '-=' + scaleHeight,
                    'width': '-=' + scaleWidth
            }, 1000);
            
            if (questionsLeft == 1) {
                $("#overlay").animate({
                    'opacity': '0.4'
                });
                $("#success").fadeIn(1000);
            }
            
        } else if (evaluationInput == false) {
            
            var currentHeight = (parseInt($("#mountain-lava").css('top'))) - 212;
            
            var lavaTop = (currentHeight / remainingMissableQuestions);
            console.log(lavaTop);
            
            $("#mountain-lava").animate({
                    top: "-=" + lavaTop
                }, 700);
            
            $("#mountain, #rocket, #hero").delay(100).effect("shake", { distance: 1, times:6 }, 600);
            
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
