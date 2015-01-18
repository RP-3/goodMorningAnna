var Firebase = require('firebase');
var messageRef = new Firebase('https://goodmorninganna.firebaseIO.com/messages');

module.exports = function(){

  //load up messages from messageRef
  messageRef
  .limitToLast(25)
  .on('value', function(snapshot){
    //empty the messagebox
    $("#messagebox").empty();

    var messageArray = [];
    var data = snapshot.val();

    for(var message in data){
      messageArray.push(data[message]);
    }

    var formattedMessages = messageArray
    .sort(function(a, b){
      return a.time - b.time;
    })
    .map(function(element, index){
      return "<p class='message'><strong>"+element.sender+": </strong>"+ element.text +"</p>";
    });

    $("#messagebox").append(formattedMessages);
  });
  
  //add event listener to chatpane button
  $("#chatbutton").click(function(e){
    e.stopPropagation();
    $("#chatpane").animate({width:'toggle'},350);
  });

  //add event listener for chat submission
  $("#inputbox").keypress(function(e){
    //if key was enter key
    if(event.keyCode === 13){
      e.preventDefault();
      e.stopPropagation();
      var message = e.target.textContent;
      messageRef.push({
        sender: window.localStorage.getItem("goodMorningAnna_userName"),
        text: message,
        time: Date.now()
      });
      e.target.textContent = '';
    }
  });

  //set the height of the messageBox
  var setChatHeight = function(){
    panelHeight = $(window).height() - (150 + 35 + 48);
    $("#messagebox").height(panelHeight);
    console.log(panelHeight);
  };

  setChatHeight();

  $(window).on('resize', function(e){
    setChatHeight();
  });

};