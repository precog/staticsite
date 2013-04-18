$(document).ready(function(){
    /*FORM FUNCTIONALITY*/
    
var expose = window.PrecogWeb || (window.PrecogWeb = {});
var animateGraphicsLevel4 = expose.animateGraphicsLevel4 = function(evaluationInput, questionsLeft, remainingMissableQuestions){
        
        var totalPowerShields = parseInt($("#progress-shields").css('width'));
        var totalPowerInvasion = parseInt($("#progress-invasion").css('width'));
        
        function repeat(times, callback) {
            for(var start = 0; start<times; start++) callback();
        }
        
        if (evaluationInput == true) {
            
            function fireGun(){
                $('#hero-gun').animate({  rotation: +30 }, {
                    step: function(now,fx) {
                        $(this).css('-webkit-transform','rotate('+now+'deg)');
                        $(this).css('-moz-transform','rotate('+now+'deg)'); 
                        $(this).css('transform','rotate('+now+'deg)');  
                    },
                    duration:'fast'
                },'linear');
                $('#gun-blast, #gun-beam').fadeIn(100).delay(200).fadeOut(200);
                $('#hero-gun').animate({  rotation: 0 }, {
                    step: function(now,fx) {
                        $(this).css('-webkit-transform','rotate('+now+'deg)');
                        $(this).css('-moz-transform','rotate('+now+'deg)'); 
                        $(this).css('transform','rotate('+now+'deg)');  
                    },
                    duration:'slow'
                },'linear');
                
            }
            
            var invasionR = (totalPowerInvasion / questionsLeft);
            
            $("#progress-invasion").animate({
                'width': '-=' + invasionR
            });
            
            if (questionsLeft == 1) {
                $("#overlay").animate({
                    'opacity': '0.4'
                });
                $("#success").fadeIn(1000);
            }
            
            repeat(1, fireGun);
            
        } else if (evaluationInput == false) {
            
            $("#attack-cow").animate({
                    top: '88px',
                    left: '-50px'
                }, 700,"linear",function()
                    {
                        $("#attack-laser").css({
                            'opacity': '1.0'
                        });
                        $(this).delay(500).animate({
                            top: '-100px',
                            left: '400px',
                            opacity: '1.0'
                        }, 1000, "linear", function(){
                                $(this).css({
                                    'left': '-500px',
                                    'top': '20px',
                                    'opacity': '1.0'
                                });
                        });
                    }
                );
            
            $("#attack-laser").delay(700).animate({
                    left: '400px',
                }, 500,"linear",function()
                    {
                        $(this).animate({
                            opacity: '0.0'
                        }, 1, "linear", function(){
                                $(this).css({
                                'left': '0px',
                                'top': '138px',
                                'opacity': '0.0'
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
    };

});
