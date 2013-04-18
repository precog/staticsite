/*ANIMATE FUNCTIONALITY*/
(function(){
var expose = window.PrecogWeb || (window.PrecogWeb = {});
var animate = expose.animate = {
    "graphics": function(level, evaluationInput, questionsInGame, missedAllowed){
        if(level === 0){
            window.PrecogWeb.animateGraphicsLevel1(evaluationInput, questionsInGame, missedAllowed);
         } else if (level === 1){
            window.PrecogWeb.animateGraphicsLevel2(evaluationInput, questionsInGame, missedAllowed);
         } else if (level === 2){
            window.PrecogWeb.animateGraphicsLevel3(evaluationInput, questionsInGame, missedAllowed);
         } else if (level === 3){
            window.PrecogWeb.animateGraphicsLevel4(evaluationInput, questionsInGame, missedAllowed);
         } else if (level === 4){
            window.PrecogWeb.animateGraphicsLevel5(evaluationInput, questionsInGame, missedAllowed);
         }
    }    
}
})(); 