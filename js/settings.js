module.exports = function(){

  $("#settingsbutton").click(function(e){
    e.stopPropagation();
    $("#settingspane").animate({width:'toggle'},350);
  });

  $("#namebox").keypress(function(e){
    //if key was enter key
    if(event.keyCode === 13){
      e.preventDefault();
      e.stopPropagation();
      var name = e.target.textContent;
      window.localStorage.setItem("goodMorningAnna_userName", name);
      e.target.textContent = '';
    }
  });

  $("#refererbox").keypress(function(e){
    //if key was enter key
    if(event.keyCode === 13){
      e.preventDefault();
      e.stopPropagation();
      var referer = e.target.textContent;
      window.localStorage.setItem("goodMorningAnna_refererName", referer);
      e.target.textContent = '';
    }
  });

  $("#referredgroupbox").keypress(function(e){
    //if key was enter key
    if(event.keyCode === 13){
      e.preventDefault();
      e.stopPropagation();
      var referredGroup = e.target.textContent;
      window.localStorage.setItem("goodMorningAnna_referredGroup", referredGroup);
      e.target.textContent = '';
    }
  });

};
