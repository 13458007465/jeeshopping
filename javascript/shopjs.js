// 获取页面元素
var oWrap  = document.getElementsByClassName('wrap')[0];
var oPrev  = document.getElementsByClassName('prev')[0];
var oNext  = document.getElementsByClassName('next')[0];
var aImgs  = document.getElementsByClassName('imgs-box')[0].children;
var aIdots = document.getElementsByClassName('idots-box')[0].children;
// 记录当前显示图片位置
var curImgIdx = 0;
// 记录动画执行状态
var isAnimating = false;
// 定时器（自动轮播）
var timer = null;

// 显示默认图片
tab();
// 自动轮播
autoplay();

/**
 * 事件添加
 */
oPrev.onclick = function () {
    // 异常处理，如果当前正在执行图片过渡，则不做任何处理
    if(isAnimating) {
        return;
    }
    curImgIdx = curImgIdx == 0 ? 2 : --curImgIdx;
    tab();
}
oNext.onclick = function () {
    if(isAnimating) {
        return;
    }
    curImgIdx = curImgIdx == 2 ? 0 : ++curImgIdx;
    tab();
}

for(var i = 0; i < aIdots.length;i++) {
    aIdots[i].idx = i;
    addEvent(aIdots[i], 'click', function () {
        if(isAnimating || this.classList.contains('active')) {
            return;
        }
        curImgIdx = this.idx;
        tab();
    });
}

oWrap.onmouseenter = stop;
oWrap.onmouseleave = autoplay;

/**
 * 函数封装
 */
function tab() {
    isAnimating = true;

    // 异常处理
    for(var i = 0; i < aImgs.length; i++) {
        if(aImgs[i].flag || aIdots[i].classList.contains('active')) {
            fade(aImgs[i], 0);
            aImgs[i].flag = null;
            aIdots[i].classList.remove('active');
            break;
        }
    }
    fade(aImgs[curImgIdx], 100, 1000, function () {
        isAnimating = false;
    });
    aImgs[curImgIdx].flag = true;
    aIdots[curImgIdx].classList.add('active');
}

/**
 * 自动播放
 */
function autoplay() {
    // console.log(1);
    timer = setInterval(function () {
        oNext.onclick();
    }, 3000);
}
/**
 * 停止播放
 */
function stop() {
    clearInterval(timer);
}

function addEvent(element, type, callBack) {
    // 兼容IE10.0以下
    if(element.attachEvent) {
        element.attachEvent('on' + type, callBack);
    }else {
        element.addEventListener(type, callBack, false);
    }
}

function fade(element, target, duration, completed) {
    // Exception handling
    if(!element || target == undefined) {
        throw 'Error：Parameter is not complete in function \'changeOpacity\'.';
    }
    // Set the default value
    duration  = duration  ? duration  : 1000;
    // Gets the current opacity
    var curOpa = getCurrentOpacity();
    // Calculating offset
    var offset   = target - curOpa;
    // Set the interval
    var interval = 30;
    // Calculating speed
    var speed    = offset > 0 ? Math.ceil(offset / (duration / interval)) : Math.floor(offset / (duration / interval));
    // Execute transition animations
    var t = setInterval(function () {
        // Update the current opacity
        curOpa = getCurrentOpacity();
        // Determine whether to reach the target
        if((offset > 0 && curOpa < target) || (offset < 0 && curOpa > target)) {
            // Frame by frame change
            element.style.opacity = (curOpa + speed) / 100
        }else { // Has completed the transition animation
            element.style.opacity = target / 100;
            clearInterval(t);
            // Invoke the callback function
            if(completed) {
                completed();
            }
        }
    }, interval);

    function getCurrentOpacity() {
        var curOpa = 0;
        // Compatible with IE browser
        if(element.currentStyle) {
            curOpa = element.currentStyle['opacity'] * 100;
        }else {
            curOpa = getComputedStyle(element, false)['opacity'] * 100;
        }
        return curOpa;
    }
}
//登录注册
//获取元素
var oLogin  = document.getElementsByClassName('login') [0];
var ologBtn = document.getElementsByClassName('loginbtn')[0];
var closeBtn = document.getElementsByClassName('close')[0];
//绑定时间
ologBtn.onclick = function () {
    oLogin.style.display = 'block';
    document.body.appendChild(oMask);
}
closeBtn.onclick = function () {
    oLogin.style.display = 'none';
    oMask.remove();
}
//创建遮罩
var oMask = document.createElement('div');
oMask.className = 'mask';



