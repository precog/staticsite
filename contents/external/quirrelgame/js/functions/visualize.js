/*VISUALIZE FUNCTIONALITY*/
(function(){
var expose = window.PrecogWeb || (window.PrecogWeb = {});
var access = window.PrecogWeb.access;
//var game1level1 = game1level1;

var visualize = expose.visualize = {

"populateLevel":  function() {
      //var text = getCurrentQuestion().question
      // populate instruction box pre tag with question
      //   jQuery("#background-body #instructions-box pre").html(function(){text);
      if(window.PrecogWeb.user.currentQuestion >= access.getCurrentLevel().questions.length){
        window.PrecogWeb.user.resetCurrentQuestion();
      }
        window.PrecogWeb.user.resetQuestionsMissed();
        window.PrecogWeb.user.save();
        jQuery("#background-body #instructions-box h2").html(function(){return access.getCurrentLevel().levelName});
        jQuery("#background-body #instructions-box p#background").html(function(){return access.getCurrentLevel().description});
        jQuery("#background-body #instructions-box h1").html(function(){return access.getCurrentLevel().welcome});
        jQuery("#background-body #instructions-box p#action").html(function(){return access.getCurrentLevel().getStarted});
        jQuery("#background-body #instructions-box pre").remove();
        jQuery("#menu-score h3").html(window.PrecogWeb.user.score );
       
         //   jQuery("#background-body #instructions-box h3").html(function(){getCurrentLevel().)
    },
    
    "populateQ": function() {
        jQuery("#background-body #instructions-box p#background").html(function(){return access.getCurrentQuestion().background});
        jQuery("#background-body #instructions-box h2").html(function(){return access.getCurrentQuestion().questionName});
        jQuery("#background-body #instructions-box p#action").html(function(){return access.getCurrentQuestion().question});
        jQuery("#background-body #instructions-box pre").remove();
        jQuery("#background-body #instructions-box h1").remove();
        jQuery("#editor-submit").fadeIn(1);
        jQuery("#next-reminder").fadeOut(400);
        jQuery("#next-question").addClass('disabled-button');
        console.log(PrecogWeb.user.currentQuestion);
        if(PrecogWeb.user.currentQuestion === 0){
                jQuery("#previous-question").addClass('disabled-button');
        } else {
                jQuery("#previous-question").removeClass('disabled-button');
                }
    },
    
    "populateCorrectA":  function() {
      var text = access.getCurrentQuestion().question
      // populate instruction box pre tag with question
       // jQuery("#background-body #instructions-box p").html(function(){text);
        jQuery("#background-body #instructions-box p#action").html("Click the next button below to proceed to the next question");
        jQuery("#background-body #instructions-box p#background").html(function(){return access.getCurrentQuestion().correct.text});
      //  jQuery("#background-body #instructions-box h2").html(function(){getCurrentLevel().description);
       // jQuery("#background-body #instructions-box pre").remove();
      jQuery("#next-reminder").fadeIn(200).animate({
            'top': '-=6'
      }, 200, function(){
            jQuery(this).animate({
                  'top': '+=6'
            }, 200);
      });
    },
    
    "populateIncorrectA": function() {
      var text = access.getCurrentQuestion().question
      // populate instruction box pre tag with question
     //   jQuery("#background-body #instructions-box p$action").html(function(){);
        jQuery("#background-body #instructions-box p#background").html(function(){return access.getCurrentQuestion().incorrect.text});
      //  jQuery("#background-body #instructions-box h2").html(function(){getCurrentLevel().description);
       // jQuery("#background-body #instructions-box pre").remove();
    }
}
})(); 