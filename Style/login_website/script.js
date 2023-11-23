const text_box = document.querySelector('.text-box');
const wrapper = document.querySelector('.wrapper');
const loginlink = document.querySelector('.login-link');
const loginlink_student = document.querySelector('.login-link2');
const loginlink_teacher = document.querySelector('.login-link3');
const registerlink = document.querySelector('.register-link');
const btnLogin = document.querySelector('.btnLogin');
const iconClose = document.querySelector('.icon-close');
const butteach = document.querySelector('.butteach');
const butstud = document.querySelector('.butstud');


/*---------------------------------------------------------------*/ 
// 跳轉到學生老師選擇
registerlink.addEventListener('click', ()=>{
    wrapper.classList.add('active');
});

loginlink.addEventListener('click', ()=>{
    wrapper.classList.remove('active');
});

/*---------------------------------------------------------------*/ 
// 跳轉到學生註冊介面與跳轉至老師介面
butstud.addEventListener('click', ()=>{
    wrapper.classList.add('active-student');
});

butteach.addEventListener('click', ()=>{
    wrapper.classList.add('active-teacher');
});

loginlink_student.addEventListener('click', ()=>{
    wrapper.classList.remove('active');
    wrapper.classList.remove('active-student');
});

loginlink_teacher.addEventListener('click', ()=>{
    wrapper.classList.remove('active');
    wrapper.classList.remove('active-teacher');
});

/*----------------------------------------------------------------*/

btnLogin.addEventListener('click', ()=>{
    wrapper.classList.add('active-login');
    text_box.classList.add('active-text');
});

iconClose.addEventListener('click', ()=>{
    wrapper.classList.remove('active-login');
    text_box.classList.remove('active-text');
    wrapper.classList.remove('active');
    wrapper.classList.remove('active-student');
    wrapper.classList.remove('active-teacher');
});


//-------------------以下全域變數------------------------------------------------------

var Caplock = document.getElementById('Cap');
var intemail = document.getElementById('inputemail');
var inputpwd = document.getElementById('pwd');

//-------------------以下是驗證三次密碼鎖定功能----------------------------------------- 
var wrongAttempts = 0;
var wrongcap = 0;
var correctPassword = '123456'; // 正確的密碼

function checkPassword() {
    
    // 從 localStorage 中獲取錯誤嘗試次數
    var wrongAttempts = localStorage.getItem('wrongAttempts');
    if (wrongAttempts === null) {
        wrongAttempts = 0;
    } else {
        wrongAttempts = parseInt(wrongAttempts, 10);
    }
    
    if (inputpwd.value !== correctPassword) {
        wrongAttempts++;
        localStorage.setItem('wrongAttempts', wrongAttempts);
        
        if (wrongAttempts >= 3) {
            Caplock.disabled = true;
            inputpwd.disabled = true;
            intemail.disabled = true;
            showAlert('You have made an incorrect entry three times. Please try again in 30 seconds.');
            setTimeout(function() {
                inputpwd.disabled = false;
                Caplock.disabled = false;
                intemail.disabled = false;
                inputpwd.value='';
                localStorage.removeItem('wrongAttempts');
            }, 30000);
        } else {
            showAlert('Password incorrect, please try it again');
            inputpwd.value='';
        }
    } else {
        localStorage.removeItem('wrongAttempts');
    }
    
    inputpwd.value = '';
}

// 在頁面載入時檢查錯誤嘗試次數
window.onload = function() {
    var wrongAttempts = localStorage.getItem('wrongAttempts');
    if (wrongAttempts !== null && parseInt(wrongAttempts, 10) >= 3) {
        inputpwd.disabled = true;
        Caplock.disabled = true;
        intemail.disabled = true;
        setTimeout(function() {
            inputpwd.disabled = false;
            Caplock.disabled = false;
            intemail.disabled = false;
            localStorage.removeItem('wrongAttempts');
        }, 30000);
    }
    generateCaptcha();
}

// -----------------------以下是驗證email是否正確(使用正規表達式)----------------------------

function checkEmail() {
    
    if (intemail.validity.patternMismatch) {
        showAlert('Format error, please enter again');
        return false;  // 返回 false 表示電子郵件地址不符合規定
    } else {
        return true;  // 返回 true 表示電子郵件地址符合規定
    }
}

// -------------------------以下是將password與email驗證改成同步執行-------------------------------

function checkBoth() {
    if (checkEmail()) {
        checkPassword();
    }
}

document.getElementById('loginButton').onclick = checkBoth;
document.getElementById('signup').onclick = checkEmail;

// ------------------------以下是驗證是否為機器人的程式--------------------------------------------

function generateCaptcha() {
    var captcha = Math.floor(Math.random() * 900000) + 100000;
    document.getElementById("captcha").innerText = captcha;
    return captcha;
}

function validateCaptcha() {
    var captcha = document.getElementById("captcha").innerText;
    var userCaptcha = document.getElementsByName("captcha")[0].value;
    if (captcha !== userCaptcha) {
        wrongcap++;
        localStorage.setItem('wrongcap', wrongcap);

        if (wrongcap >= 3) {
            Caplock.disabled = true;
            inputpwd.disabled = true;
            intemail.disabled = true;
            showAlert('You have made an incorrect CAPTCHA three times. Please try again in 30 seconds.');
            setTimeout(function() {
                inputpwd.disabled = false;
                Caplock.disabled = false;
                intemail.disabled = false;
                Caplock.value='';
                localStorage.removeItem('wrongcap');
            }, 30000);
        } else {
            Caplock.value='';
            showAlert('CAPTCHA is incorrect. Please try again.');
            generateCaptcha();
        }
    } else {
        localStorage.removeItem('wrongcap');
    }
}

// -------------------------以下是解決alert衝突的問題---------------------------------------------

var alertQueue = [];
var alertInProgress = false;

function showAlert(message) {
    alertQueue.push(message);
    processAlertQueue();
}

function processAlertQueue() {
    if (!alertInProgress && alertQueue.length > 0) {
        alertInProgress = true;
        alert(alertQueue.shift());
        alertInProgress = false;
        processAlertQueue();
    }
}


