$(document).ready(function(){
    /*ANIMATED GRAPHICS*/
    function menuClose() {
        console.log("closemenu");
        $(".minor-levels").hide().animate({
            'opacity': '0.0'
        }, 300);
    }
    
    $("#levels-major .major").mouseleave(function(){
        menuClose();
    });
    
    $(".major").click(function(){
        $(this).find(".minor-levels").show().animate({
            'opacity': '1.0'
        }, 300);
    });
    
    $('.minor-levels a').click(function(e){
        
        var checkClass = $(this).parent('li').attr('class');
        
        if(checkClass !== "box-checked"){
            e.preventDefault();
        }
    });
    
    var levelsCompleted = window.PrecogWeb.user.levelsCompleted;
    
    for(i = 0; i <= levelsCompleted +1; i++){
    $(".minor-levels #" + i).addClass("box-checked");
    };

    $("#tweet-me").click(function(){
        console.log(window.PrecogWeb.user.scoreCategory);
          $(this).attr("href", "https://twitter.com/share?url=http%3A%2F%2Fwww2.precog.com%2flearn-quirrel-level-"+(window.PrecogWeb.user.currentLevel+1) +"&text=Check%20out%20my%20%23QuirrelGame%20score%20and%20badge!%20Score:" + window.PrecogWeb.user.score +"%20Badge:%20" + window.PrecogWeb.user.scoreCategory +"%20Play%20here!");
    });
    //<a href="http://twitpic.com/by5e2r" title="hero -test on Twitpic"><img src="http://twitpic.com/show/thumb/by5e2r.png" width="150" height="150" alt="hero -test on Twitpic"></a>

    /*RELOAD PAGE*/
    $('#fail a').click(function() {
        
        window.PrecogWeb.user.resetScore();
        window.PrecogWeb.user.resetQuestionsMissed();
        window.PrecogWeb.user.resetCurrentQuestion();
        window.PrecogWeb.user.save();
		window.PrecogWeb.access.enableFunctionality();
        location.reload();
    });
	/*
	var loadData = function(url) {
		console.log("loading data...");
		jQuery.get(url, function(text, status) {
			var html = jQuery(text);
			console.log(html);
			html.find("h1").each(function(h1) {
				h1.find("h2").each(function(h2) {
					// Every one of these is a question / answer
					var qa = h2.nextUntil("h2");
					console.log(qa);
					var body = qa.nextUntil("h3");
					console.log(body);
					var prompt = body.nextAll("p").last();
					console.log(prompt);
					prompt.addClass("prompt");
					
					var correctIncorrect = qa.nextAll("h3");
					
					var correct = correctIncorrect.eq(0);
					var incorrect = correctIncorrect.eq(1);
					
					
				})
			});
		});
	}
      */
      /*RUN QUERY*/
    var visualize = window.PrecogWeb.visualize;
    var access = window.PrecogWeb.access;
    var questionsLeft = access.getCurrentLevel().questions.length - window.PrecogWeb.user.currentQuestion;
    var remainingMissableQuestions = (Math.round(access.getCurrentLevel().questions.length/4)+4) - window.PrecogWeb.user.questionsMissed

    var executeAnswerQuery = function() {
      
        var question = access.getCurrentQuestion()
        var contents = editor.getSession().getValue()
		jQuery("#editor-submit").addClass('disabled-button');
		showLoad();
       // console.log(question.verify(contents));
        Precog.query(contents,
            function(data){
                showResults(data);
                if (question.verify(data, contents )){
                    questionsLeft = ((access.getCurrentLevel().questions.length) - (window.PrecogWeb.user.currentQuestion));

                    visualize.populateCorrectA();
                    window.PrecogWeb.user.score += question.correct.score
                    jQuery("#menu-score h3").html(window.PrecogWeb.user.score );
                    window.PrecogWeb.animate.graphics(window.PrecogWeb.user.currentLevel, true, questionsLeft, remainingMissableQuestions);
                    window.PrecogWeb.user.currentQuestion += 1
                    questionsLeft = ((access.getCurrentLevel().questions.length) - (window.PrecogWeb.user.currentQuestion));
                    jQuery("#next-question").removeClass('disabled-button');
                    
                    if(questionsLeft === 0){

                        window.PrecogWeb.user.levelsCompleted += 1
                        console.log(window.PrecogWeb.user.levelsCompleted);
                        window.PrecogWeb.user.categorize();
                        window.PrecogWeb.user.save();
                        console.log(window.PrecogWeb.user.scoreCategory);
						window.PrecogWeb.access.disableFunctionality();
                        
                    }
                    
               //     populateA(); //jQuery("#background-body #instructions-box p").html(question.correct.text +"\n\n" + getCurrentQuestion().question);
                    window.PrecogWeb.user.save();
                    console.log(questionsLeft);
                    
                }  else {
                    console.log(remainingMissableQuestions);
                  // use question.incorrect.text for text
                   visualize.populateIncorrectA();
                   // jQuery("#background-body #instructions-box p").html(question.incorrect.text +"\n\n" + getCurrentQuestion().question );
                    window.PrecogWeb.user.score += question.incorrect.score;
                    window.PrecogWeb.animate.graphics(window.PrecogWeb.user.currentLevel, false, questionsLeft, remainingMissableQuestions);
                    window.PrecogWeb.user.questionsMissed++;
                    remainingMissableQuestions = (Math.round(access.getCurrentLevel().questions.length/4)+4) - window.PrecogWeb.user.questionsMissed;
                    jQuery("#menu-score h3").html(window.PrecogWeb.user.score );
                    window.PrecogWeb.user.save();
                    console.log(remainingMissableQuestions);
                    
                     
                }
            }, function(data){
                alert(access.getCurrentQuestion().incorrect.text);
            }
        );
    }
    
     var executeTestQuery = function() {
      
        var question = window.PrecogWeb.access.getCurrentQuestion()
        var contents = editor.getSession().getValue()
		showLoad();
       // console.log(question.verify(contents));
        Precog.query(contents,
            function(data){
                showResults(data);
            }, function(data){
                alert("Your query failed to return, please try again.");
            }
        );
    }
    
    /*EDITOR*/
 
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/tomorrow");
    editor.getSession().setMode("ace/mode/quirrel");
    editor.renderer.setShowGutter(false);  //removes numbers and side bar until css issue can be resolved (first character cannot be seen underneath the gutter)
    editor.getSession().setValue("");
    editor.commands.addCommand({
      name : "executeQuery",
            bindKey: {
                win: 'Shift-Return',
                mac: 'Shift-Return|Command-Return',
                sender: 'editor|cli'
            },
            exec: executeTestQuery
    });
    
	editor.getSession().on('change', function(e) {
		if(questionsLeft !== 0){
			jQuery("#editor-submit").removeClass('disabled-button');
		}
	});
    /*READ ONLY PANEL*/
    
    var resultsPanel = ace.edit("resultsPanel");
    resultsPanel.setTheme("ace/theme/tomorrow");
    resultsPanel.getSession().setMode("ace/mode/json");
    resultsPanel.renderer.setShowGutter(false);
    resultsPanel.setReadOnly(true);
    resultsPanel.setHighlightActiveLine(false);
    resultsPanel.getSession().setValue("");
    
    var showResults = function(data){
       resultsPanel.getSession().setValue(JSON.stringify(data, null, "  "));
    }
	
	var showLoad = function(data){
	   resultsPanel.getSession().setValue("loading...");
    }
    /*Initial Functions to Call*/
//loadData("http://precog.com/external/quirrelgame/js/content/QuirrelGameIScript.htm");
   
    visualize.populateLevel();
    jQuery("#next-question").click(
        function(){visualize.populateQ();
        jQuery("#previous-question").fadeIn(1000);
        jQuery(this).find(".replace").html("next")
    }); //change to appropriate button (next)
    jQuery("#editor-run").click(function(){
		executeTestQuery();
		}); 
    jQuery("#editor-submit").click(function(){
		console.log(!jQuery("#editor-submit").hasClass("disabled-button"));
        if(!jQuery("#editor-submit").hasClass("disabled-button")){
			executeAnswerQuery();
		}
    }); //change to appropriate button (submit/answer)
    jQuery("#previous-question").click(function(){
		if(!jQuery("#previous-question").hasClass("disabled-button")){
			access.previousQ();
		}	
		}); 
   
    jQuery(".next-level-clear").click(function(){
        window.PrecogWeb.user.resetScore();
        window.PrecogWeb.user.resetQuestionsMissed();
        window.PrecogWeb.user.resetCurrentQuestion();
        window.PrecogWeb.user.save();
		window.PrecogWeb.access.enableFunctionality();
    });

});  
