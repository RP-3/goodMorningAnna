//choose today's image and display it
module.exports = function(){
  var start = Date.parse("Fri Jan 16 2015 21:18:33 GMT-0800 (PST)");
  var day = 1000*60*60*24;
  var elapsedDays = (Date.now() - start) / day;
  while(elapsedDays > 64){ elapsedDays = elapsedDays - 64;}
  var src = './images/' + Math.ceil(elapsedDays) + '.jpg';

  var img = document.createElement('img');
  img.src = src;
  img.className = 'bg';
  img.style.zIndex = '-1';
  document.body.appendChild(img);
};
