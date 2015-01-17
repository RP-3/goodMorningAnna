

module.exports = function(){
  
  //add event listener to chatpane button
  $("#chatbutton").click(function(e){
    e.stopPropagation();
    $("#chatpane").animate({width:'toggle'},350);
  });

};
