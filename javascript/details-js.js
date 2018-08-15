//小火箭
var oBackToTopBtn = document.getElementsByClassName('rocket-btn')[0];
var offset = 0;
//窗口滚动 ，获取Y轴滚动部分的偏移
window.onscroll = function () {
    //兼容IE浏览器
    offset = document.body.scrollTop || document.documentElement.scrollTop;
    oBackToTopBtn.style.display = offset > 1000 ? "block" : "none";
    //查看控制台是否获取高度
    // console.log(offset);
};
oBackToTopBtn.onclick = function () {
    //设置帧动画
    var duration = 600;
    var interval = 30;
    var speed    = Math.ceil(offset / (duration / interval));
    var t = setInterval(function () {
        if(offset > 0){
            //设置scrollTop = 0 回到顶部
            document.body.scrollTop = document.documentElement.scrollTop = offset - speed;
        }else {
            clearInterval(t);
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
    },interval);
}
//样式图 获取大图的盒子
var oBigImg = document.getElementsByClassName('big-img')[0];
//获取小图的盒子
var smallImgs = document.querySelectorAll('.img-lists li');
//函数封装
change(oBigImg, smallImgs);
oBigImg.style.backgroundSize = 'cover !important';
function change(element, chang) {
    for(var i = 0; i < chang.length; i++){
        chang[i].onmouseenter = function () {
            var oImg = this.getElementsByTagName('img')[0].src;
            element.getElementsByTagName('img')[0].src = oImg;
        }
    }
}
