//获取li元素
var oLi = document.getElementsByClassName('mask-item')[0];

oLi.onmouseover = function () {
    document.body.appendChild(oMask);
};
oLi.onmouseout = function () {
    oMask.remove();
};
//创建遮罩车型
var oMask = document.createElement('div');
oMask.className = 'mask';
//图片轮播
var oWrap = $(`#wrap`);
var oImgBox =$(`#imglist`);
var oIdots = $(`#idotlist`).children;
var oPrev = $(`#perv`);
var oNext = $(`#next`);

var curImgIdx = 1;
var isAnimating = false;
play();
//左边按钮
oPrev.onclick = function () {

    if(isAnimating){
        return;
    }
    if(curImgIdx == 1){
        curImgIdx = 6;
    }else{
        curImgIdx--;
    }
    tab(1901);
//小圆点调用函数
    changeIdots();
}
//右边按钮
oNext.onclick = function(){
    if(isAnimating){
        return;
    }
    if(curImgIdx == 6){
        curImgIdx = 1;
    }else{
        curImgIdx++;
    }
    //位移像素
    tab(-1901);
    changeIdots();
};

for(var i = 0; i < oIdots.length; i++){
    oIdots[i].idx = i + 1;
    oIdots[i].onclick = function () {
        if (this.idx == curImgIdx || isAnimating){
            return;
        }
        var offset = -1901 * (this.idx - curImgIdx);
        curImgIdx = this.idx;
        tab(offset);
        changeIdots();
    }
}
//轮播鼠标移入play移出stop
oWrap.onmouseover = stop;
oWrap.onmouseout = play;
//图片轮播
function tab(offset) {
    var duration = 500;
    var interval = 15;
    var speed = Math.ceil(offset/(500/15));
    var desOffset = parseInt(getStyle(oImgBox, `left`)) + offset;
    var t = setInterval(function() {
        isAnimating = true;
        var curOffset  = parseInt(getStyle(oImgBox, `left`));
        if ((offset < 0 && curOffset > desOffset) || (offset > 0 && curOffset < desOffset)) {
            oImgBox.style.left = curOffset + speed + 'px';
        }else {
            isAnimating = false;
            oImgBox.style.left = desOffset + 'px';
            if (parseInt(oImgBox.style.left) < -11406) {
                oImgBox.style.left = `-1901px`;
            }else if(parseInt(oImgBox.style.left) > 1901) {
                oImgBox.style.left = `11406px`;
            }
            clearInterval(t);
        }
    }, interval);
}
//小圆点
function changeIdots() {
    for (var i = 0; i < oIdots.length; i++) {
        if (oIdots[i].classList.contains(`selected`)) {
            oIdots[i].classList.remove(`selected`);
            break;
        }
    }
    console.log(curImgIdx);
    oIdots[curImgIdx - 1].classList.add(`selected`);
}
function play() {
    timer = setInterval(function () {
        oNext.onclick();
    },3500);
}
//清除定时器函数
function stop() {
    clearInterval(timer);
}

//回到顶部
var oBackToTopBtn = document.getElementsByClassName('rocket-btn')[0];
var offset = 0;
