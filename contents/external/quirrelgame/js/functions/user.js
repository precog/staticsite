/*USER DATA and LOCAL STORAGE FUNCTIONS*/
(function(){
var expose = window.PrecogWeb || (window.PrecogWeb = {});
var user = expose.user = (function() {
        var storage = window.localStorage || {},
            data = storage.savedUserData && JSON.parse(storage.savedUserData);
        if(!data) {
            data = {
                currentGame: 0,
                currentLevel: 0,
                currentQuestion: 0,
                score: 0,
                questionsMissed: 0,
                levelsCompleted: 0,
                scoreCategory: "http://bit.ly/10TiLYb" //1 stars

             //   completedLevels: arr
            }
        };
        data.save = function() {
                storage.savedUserData = JSON.stringify(data);
        };
        data.resetScore = function(){
                data.score = 0;
        };
        data.resetQuestionsMissed = function(){
                data.questionsMissed = 0;
        };
        data.resetCurrentQuestion = function(){
                data.currentQuestion = 0;   
        };
        data.categorize = function(){
                var pointsToPointsPossible = data.score/(window.PrecogWeb.access.getCurrentLevel().questions.length * 10) ;
                console.log("inside categorize");
                console.log(pointsToPointsPossible);

                if(pointsToPointsPossible > .9) {
                        data.scoreCategory =  "http://bit.ly/Y48Mee"; //3 stars
                } else if(pointsToPointsPossible > .7){             
                        data.scoreCategory =  "http://bit.ly/TxTh0y"; //2 stars
                } else {
                        data.scoreCategory = "http://bit.ly/10TiLYb";//1 stars
                }        
        }

        var url = window.location.href;
        var re = /(\d#?$|\d\?|\d\.html#?$)/;
        var level = parseInt(re.exec(url)[1]);
        
        data.currentLevel = level -1;
        return data;
    })();
})(); 