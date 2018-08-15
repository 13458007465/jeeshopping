
var oNavBox = document.getElementsByClassName('nav-box')[0];
var oContentsBox = document.getElementsByClassName('contents-box')[0];
var isAnimating = false;

//创建元素
for(var i = 0;i < jsonData.length;i++){
    //1.nav-box ->创建a
    var oA = document.createElement('a');
    oA.setAttribute('href','javascript:void(0);');
    oA.setAttribute('class','nav-item');
    oA.appendChild(document.createTextNode(jsonData[i]['navName']));
    oNavBox.appendChild(oA);
    //2.contents ->创建div
    var oDiv = document.createElement('div');
    oDiv.setAttribute('class','contents-item');
    //左右盒子
    var oFl = document.createElement('div');
    var oFr = document.createElement('div');
    oFl.setAttribute('class','fl');
    oFr.setAttribute('class','fr');

    oFl.style.background = 'url("images/'+ jsonData[i]['img'] + '") no-repeat center';

    var imgName = 'images/' + jsonData[i]['imgs'];
    oFr.innerHTML = `
         <h4>${jsonData[i]['title']}</h4>
         <h5>${jsonData[i]['time']}</h5>
         <b></b>
         <p>${jsonData[i]['contents']}</p>
         <img src="${imgName}">
    `
    oDiv.appendChild(oFl);
    oDiv.appendChild(oFr);
    oContentsBox.appendChild(oDiv);
}
var aA = oNavBox.children;
var aDiv = oContentsBox.children;
aA[0].classList.add('active');
aDiv[0].style.opacity = '1';
aDiv[0].flag = true;
/**
 * 事件添加
 */
for(var i = 0;i < aA.length; i++){
    aA[i].idx = i;
    aA[i].onclick = function () {
        if(isAnimating || aDiv[this.idx].flag){
            return;
        }
        isAnimating = true;
        for(var j = 0; j < aA.length; j++){
            if (aDiv[j].flag || aA[j].classList.contains('active')){
                aA[j].classList.remove('active');
                fade(aDiv[j],0,500)
                aDiv[j].flag = false;
                break;
            }
        }
        this.classList.add('active')
        fade(aDiv[this.idx],100,500,function () {
            isAnimating = false;
        });
        aDiv[this.idx].flag = true;
    }
}
function fade(element, target, duration, completed) {
    if(!element || target == undefined) {
        throw 'Error：Parameter is not complete in function \'changeOpacity\'.';
    }
    duration  = duration  ? duration  : 1000;
    var curOpa = getCurrentOpacity();
    var offset   = target - curOpa;
    var interval = 30;
    var speed    = offset > 0 ? Math.ceil(offset / (duration / interval)) : Math.floor(offset / (duration / interval));
    var t = setInterval(function () {
        curOpa = getCurrentOpacity();
        if((offset > 0 && curOpa < target) || (offset < 0 && curOpa > target)) {
            element.style.opacity = (curOpa + speed) / 100
        }else {
            element.style.opacity = target / 100;
            clearInterval(t);
            if(completed) {
                completed();
            }
        }
    }, interval);
    function getCurrentOpacity() {
        var curOpa = 0;
        if(element.currentStyle) {
            curOpa = element.currentStyle['opacity'] * 100;
        }else {
            curOpa = getComputedStyle(element, false)['opacity'] * 100;
        }
        return curOpa;
    }
}