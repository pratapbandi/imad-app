console.log('Loaded!');
//change text
var  element = document.getElementById('main-text');
element.innerHTML = 'New value by Patap.';

//moving image
var img = document.getElementById('madi');
function moveRight(){
    marginleft = marginleft + 1;
    img.style.marginleft = marginleft + 'px';
}
img.onclick = function(){
    var intervel = setIntervel(moveRight, 50);
};