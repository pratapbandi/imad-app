console.log('Loaded!');
//change text
var  element = document.getElementById('main-text');
element.innerHTML = 'New value by Patap.';

//moving image
var img = document.getElementById('madi');
var marginleft = 0;
function moveRight(){
    marginleft = marginleft + 1;
    img.style.marginleft = marginleft + 'px';
}
img.onclick = function(){
    var interval = setInterval(moveRight, 50);
};