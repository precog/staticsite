$(document).ready(function(){

  $("#click").click(function(){
    createOverlay();
  });
  
  function removeMe() {
    $("#overlay").remove();
  }

  function createOverlay() {
    console.log("Clicked");
    $("body").prepend("<div id='overlay'></div>");
  }
  
  $("#overlay").on("click", removeMe);

});
