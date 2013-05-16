$(document).ready(function(){

  //BUBBLE CHART HOME PAGE
  $("#custom-bubble-vis span").each(function(){
    var elemVar = $(this).html() / 110;
    var textVar = elemVar / 5;
    
    $(this).css({width: elemVar, height: elemVar, fontSize: textVar, borderRadius: elemVar, lineHeight: (elemVar + "px")})
    console.log(elemVar);
  });
  
});