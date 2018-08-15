//注册登陆
var rigeter = document.getElementById('rigeter');
var username = document.getElementsByClassName('username')[0];
var phone = document.getElementsByClassName('phone')[0];
var codeNum = document.getElementsByClassName('codeNum')[0];
var email = document.getElementsByClassName('email')[0];
var pwd = document.getElementsByClassName('pwd')[0];
var repwd = document.getElementsByClassName('repwd')[0];
var check = document.getElementsByClassName('check')[0];
var code = document.getElementById('getCode');
var nameReg = /^[\u4E00-\u9FA5]{1,5}$/; //匹配中文
var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/; // 匹配电话号码
var emialReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; //匹配邮箱
// 提交信息
rigeter.onclick = function () {
    if(!check.getAttribute('checked')){
        check.nextSibling.nextSibling.style.display = 'block'
    }else {
        check.nextSibling.nextSibling.style.display = 'none'
    }
    if(removeAllSpace(username.value).length == 0 || !nameReg.test(removeAllSpace(username.value))){
       username.nextSibling.style.display = 'block';
        return
    }else {
        username.nextSibling.style.display = 'none';
    }
    if(removeAllSpace(phone.value).length == 0 || !phoneReg.test(removeAllSpace(phone.value))){
        phone.nextSibling.style.display = 'block';
        return
    }else {
        phone.nextSibling.style.display = 'none';
    }
    if(removeAllSpace(codeNum.value) != removeAllSpace(code.innerHTML)){
        codeNum.nextSibling.nextSibling.style.display = 'block';
        return
    }else {
        codeNum.nextSibling.nextSibling.style.display = 'none';
    }
    if(removeAllSpace(email.value).length == 0 || !emialReg.test(removeAllSpace(email.value))){
        email.nextSibling.style.display = 'block';
        return
    }else {
        email.nextSibling.style.display = 'none';
    }
    if(removeAllSpace(pwd.value).length < 6){
        pwd.nextSibling.style.display = 'block';
        return
    }else {
        pwd.nextSibling.style.display = 'none';
    }
    if(removeAllSpace(pwd.value) != removeAllSpace(repwd.value)){
        repwd.nextSibling.style.display = 'block';
        return
    }else {
        repwd.nextSibling.style.display = 'none';
    }
    alert('提交成功');
    setTimeout(function () {
        var model = document.getElementsByClassName('model')[0]
        model.innerHTML = '<h2>注册成功</h2>'
    },1500)
};

// 获取验证码
function MathRand() {
    var Num = "";
    for (var i = 0; i < 4; i++) {
        Num += Math.floor(Math.random() * 10);
    }
    return Num;
}
code.onclick = function () {
    var num = MathRand();
    code.innerHTML = num
};

function removeAllSpace(str) {
    return str.replace(/\s+/g, "");
}