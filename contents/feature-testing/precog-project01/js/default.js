$(document).ready(function(){

    $("#main-background").mouseenter(function(){
	
	setTimeout(function(){
	    
	    $("#precog-rocket").animate({'top': 60},1500);
	    $("#precog-logo").fadeOut(1500);
	    $("#rr-beam").animate({
		"opacity": 0.8
	    },300 );
	    $("#rr-beam").animate({
		"opacity": 0.6
	    },300 );
	    $("#rr-beam").animate({
		"opacity": 0.7
	    },300 );
	    $("#rr-beam").animate({
		"opacity": 0.5
	    },300 );
	    $("#rr-beam").animate({
		"opacity": 0.0
	    },300 );
	    
	    setTimeout(function(){
	    
		$("#body-content").animate({
		    'left': 0,
		    'opacity': 1.0
		}, 1000);
		    
		setTimeout(function(){
		    
		    $('#zombie-arm').animate({  rotation: +30 }, {
			step: function(now,fx) {
			    $(this).css('-webkit-transform','rotate('+now+'deg)');
			    $(this).css('-moz-transform','rotate('+now+'deg)'); 
			    $(this).css('transform','rotate('+now+'deg)');  
			},
			duration: 300
		    },'linear');
		    
		    setTimeout(function(){
			
			$('#zombie-arm').animate({  rotation: 0 }, {
			step: function(now,fx) {
			    $(this).css('-webkit-transform','rotate('+now+'deg)');
			    $(this).css('-moz-transform','rotate('+now+'deg)'); 
			    $(this).css('transform','rotate('+now+'deg)');  
			},
			duration: 300
			},'linear');
			
			$("#rr-beam").remove();
			
		    },1000);
		    
		    $("#rr-spaceship").hover(function(){
			$(this).fadeOut(1000);
			setTimeout(function(){
			    $(this).remove();
			},1000);
		    });
		
		},1500);
	    
	    }, 1500);
	    
	}, 1000);
	
    }).mouseleave(function(){
	
    });
    
});