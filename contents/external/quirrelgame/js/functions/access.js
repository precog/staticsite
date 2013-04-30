/*GET FUNCTIONS TO ACCESS GAME DATA*/
(function(){
var expose = window.PrecogWeb || (window.PrecogWeb = {});
var access = expose.access = {
    
    "getCurrentLevel":  function() {
      return window.PrecogWeb.index.games[window.PrecogWeb.user.currentGame][window.PrecogWeb.user.currentLevel]
    },
    
    "getCurrentQuestion": function() {
      return window.PrecogWeb.access.getCurrentLevel().questions[window.PrecogWeb.user.currentQuestion]
    },
    
    "previousQ": function() {
     //   this.regressLevelIfNecessary();
        if(window.PrecogWeb.user.currentQuestion > 0){
        window.PrecogWeb.user.currentQuestion -= 1;
        window.PrecogWeb.user.save();
        window.PrecogWeb.visualize.populateQ();
        } else alert("No Previous Question");
    },
    "disableFunctionality" : function(){
      jQuery("#editor-submit").addClass("disabled-button");
     jQuery("#previous-question").addClass("disabled-button");
    },
    "enableFunctionality" : function(){
     jQuery("#editor-submit").removeClass("disabled-button");
     jQuery("#previous-question").removeClass("disabled-button");
    }
    
    /*
    "advanceLevelIfNecessary": function() {
        var maxQuestion = this.getCurrentLevel().questions.length - 1
        
        if (window.PrecogWeb.user.currentQuestion > maxQuestion) {
            window.PrecogWeb.user.currentQuestion = 0
            window.PrecogWeb.user.currentLevel += 1
            window.PrecogWeb.user.levelsCompleted += 1
            this.advanceGameIfNecessary() 
        }
    },
    
    "advanceGameIfNecessary": function() {
        var maxLevel = window.PrecogWeb.index.games[window.PrecogWeb.user.currentGame].length - 1
        console.log("max level:");
        console.log(maxLevel);
        console.log(window.PrecogWeb.user.currentLevel);
        if (window.PrecogWeb.user.currentLevel > maxLevel) {
            var maxGame = window.PrecogWeb.index.games.length - 1
              console.log(maxGame);
            if (window.PrecogWeb.user.currentGame == maxGame) {
              // no max game, display winning
              console.log("WINNER!!!!");
            }
            else {
              console.log("xxxxxx");
              window.PrecogWeb.user.currentLevel = 0
              window.PrecogWeb.user.currentGame += 1
            }
        }
      },
    
    "regressLevelIfNecessary": function() {
      
      if (window.PrecogWeb.user.currentQuestion === 0) {
          
          //fix this
          if(window.PrecogWeb.user.currentLevel > 0){
          window.PrecogWeb.user.currentLevel -= 1
          window.PrecogWeb.user.currentQuestion = getCurrentLevel().questions.length - 1
          this.regressGameIfNecessary()
          } else alert("No Previous Level");
          
    
        //  var gameChild = window.PrecogWeb.user.currentGame+1;
         // var levelChild = window.PrecogWeb.user.currentLevel+1;  
      }
    },
    
    "regressGameIfNecessary": function() {
       // var maxLevel = games[window.PrecogWeb.user.currentGame].length - 1
        
        if (window.PrecogWeb.user.currentLevel === 1) {
            //var maxGame = games.length - 1
            
            if (window.PrecogWeb.user.currentGame === 0) {
              // no max game, display winning
              alert("No Previous Game");
            }
            else {
              window.PrecogWeb.user.currentGame -= 1
              window.PrecogWeb.user.currentLevel = window.PrecogWeb.user.currentGame.length -1
            }
        }
    }
    */
}
})(); 
