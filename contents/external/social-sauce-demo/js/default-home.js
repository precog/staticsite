$(document).ready(function(){
	
	/*HOME PAGE*/
	$("#howitworks-right ul li").mouseenter(function(){
		var currentElement = $(this).find("span").html();
		$(this).animate({
			'border-left': '0px'
		});
		
		$("#howitworks-left ul li." + currentElement).animate({
			'background-color': '#fff',
			'border-color': '#cccccc'
		}, { queue: false});
	}).mouseleave(function(){
		$("#howitworks-left ul li").animate({
			'background-color': '#f7f7f7',
			'border-color': '#f7f7f7'
		}, { queue: false});
	});

	$(".headline-right").click(function(){
		window.location.href = "dashboard.htm"
	});
});