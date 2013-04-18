$(document).ready(function(){
    /*FORM FUNCTIONALITY*/
    
    
    
var expose = window.PrecogWeb || (window.PrecogWeb = {});
var animateGraphicsLevel2 = expose.animateGraphicsLevel2 = function(evaluationInput, questionsLeft, remainingMissableQuestions){
    var totalPowerShields = parseInt($("#progress-shields").css('width'));
    var totalPowerRepair = (160 - parseInt($("#progress-engine").css('width')));
        
    function repeat(times, callback) {
        for(var start = 0; start<times; start++) callback();
    }
    
    if (evaluationInput == true) {
        
        function rotateArm(){
            $('#hero-arm').animate({  rotation: +20 }, {
                step: function(now,fx) {
                    $(this).css('-webkit-transform','rotate('+now+'deg)');
                    $(this).css('-moz-transform','rotate('+now+'deg)'); 
                    $(this).css('transform','rotate('+now+'deg)');  
                },
                duration:'slow'
            },'linear');
            $('#hero-arm').animate({  rotation: -20 }, {
                step: function(now,fx) {
                    $(this).css('-webkit-transform','rotate('+now+'deg)');
                    $(this).css('-moz-transform','rotate('+now+'deg)'); 
                    $(this).css('transform','rotate('+now+'deg)');  
                },
                duration:'slow'
            },'linear');
            
        }
        
        var engineR = (totalPowerRepair / questionsLeft);
        
        $("#progress-engine").animate({
            'width': '+=' + engineR
        });
        
        if (questionsLeft == 1) {
            $("#overlay").animate({
                'opacity': '0.4'
            });
            $("#success").fadeIn(1000);
        }
        
        repeat(4, rotateArm);
        
    } else if (evaluationInput == false) {
        
        $("#meteor").animate({
                top: '100px',
                left: '330px'
            }, 700,"linear",function()
                {
                    $(this).animate({
                        opacity: '0.0'
                    }, 1, "linear", function(){
                            $(this).css({
                            'left': '-500px',
                            'top': '20px',
                            'opacity': '1.0'
                        });
                    });
                }
            );
        
        $("#game-progress").delay(600).effect("shake", { distance: 3, times:6 }, 150);
        
        $("#rocket-shield").delay(600).animate({
                opacity: '1.0'
            }, 100,"linear",function()
                {
                    $(this).animate({
                        opacity: "0.1"
                    }, 2000);
                }
        );
        
        var shieldR = (totalPowerShields / remainingMissableQuestions);
        
        $("#progress-shields").animate({
            'width': '-=' + shieldR
        });
        
        
        if (remainingMissableQuestions == 1) {
            $("#overlay").animate({
                'opacity': '0.4'
            });
            $("#fail").fadeIn(1000);
        }
        
    }
    
    return false
}

});
