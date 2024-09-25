async function signUp() {
    let userName = document.getElementById('name-input').value;
    let userEmail = document.getElementById('email-input').value;
    let userPwd = document.getElementById('user-pwd').value;
    let userConfPwd = document.getElementById('user-conf-pwd').value;

    userInputErrorStyle(userName);
    emailInputErrorStyle(userEmail);
    passwordInputErrorStyle(userPwd);
    passwordConfInputErrorStyle(userConfPwd);
    checkIfConfPwd(userPwd, userConfPwd);
    checkIfAllInputsFilled(userName, userEmail, userPwd, userConfPwd);
}

function userInputErrorStyle(userName) {
    if (userName === "") {
        let userNameError = document.getElementById('name-error');
        let userNameContainer = document.getElementById('name-input-container');
        userNameError.textContent = "Please enter your name!";
        userNameError.classList.add('visible');
        userNameContainer.classList.add('red-border');
    } else {
        document.getElementById('name-error').classList.remove('visible');
        document.getElementById('name-input-container').classList.remove('red-border');
    }
}

function emailInputErrorStyle(userEmail) {
    if (userEmail === "") {
        let userEmailError = document.getElementById('email-error');
        let userEmailContainer = document.getElementById('email-input-container');
        userEmailError.textContent = "Please enter your Email!";
        userEmailError.classList.add('visible');
        userEmailContainer.classList.add('red-border');

    } else {
        document.getElementById('email-error').classList.remove('visible');
        document.getElementById('email-input-container').classList.remove('red-border');
    }
}

function passwordInputErrorStyle(userPwd) {
    if (userPwd === "") {
        let userPwdError = document.getElementById('password-error');
        let userPwdContainer = document.getElementById('pwd-input-container');
        userPwdError.textContent = "Please enter any Password!";
        userPwdError.classList.add('visible');
        userPwdContainer.classList.add('red-border');

    } else {
        document.getElementById('password-error').classList.remove('visible');
        document.getElementById('pwd-input-container').classList.remove('red-border');
    }
}

function passwordConfInputErrorStyle(userConfPwd) {
    if (userConfPwd === "") {
        let userConfPwdError = document.getElementById('conf-pwd-error');
        let userConfPwdContainer = document.getElementById('conf-pwd-input-container');
        userConfPwdError.textContent = "Please confirm your Password!";
        userConfPwdError.classList.add('visible');
        userConfPwdContainer.classList.add('red-border');
    }
    else {
        document.getElementById('conf-pwd-error').classList.remove('visible');
        document.getElementById('conf-pwd-input-container').classList.remove('red-border');
    }
}

function checkIfConfPwd(userPwd, userConfPwd) {
    if (userPwd !== userConfPwd) {
        let userConfPwdError = document.getElementById('conf-pwd-error');
        let userConfPwdContainer = document.getElementById('conf-pwd-input-container');
        userConfPwdError.textContent = "Please confirm your Password!";
        userConfPwdError.classList.add('visible');
        userConfPwdContainer.classList.add('red-border');
    } else {
        document.getElementById('conf-pwd-error').classList.remove('visible');
        document.getElementById('conf-pwd-input-container').classList.remove('red-border');
    }
}

async function checkIfAllInputsFilled(userName, userEmail, userPwd, userConfPwd) {
    if (userName === "" && userEmail === "" && userPwd !== userConfPwd) {
        userInputErrorStyle(userName);
        emailInputErrorStyle(userEmail);
        passwordInputErrorStyle(userPwd);
        passwordConfInputErrorStyle(userConfPwd);
    } else {
        await postData(path = "/users", data = {
            'name': userName,
            'email': userEmail,
            'password': userPwd
        });
    }
}