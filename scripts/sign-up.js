async function signUp() {
    let userNameInput = document.getElementById('name-input').value;
    let userEmailInput = document.getElementById('email-input').value;
    let userPwd = document.getElementById('user-pwd').value;
    let userConfPwd = document.getElementById('user-conf-pwd').value;
    checkbox = document.getElementById('myCheckbox');
    ceckIfUserAllreadyExists(userNameInput, userEmailInput, userPwd, userConfPwd, checkbox);
    userInputErrorStyle(userNameInput);
    emailInputErrorStyle(userEmailInput);
    passwordInputErrorStyle(userPwd);
    passwordConfInputErrorStyle(userConfPwd);
    checkIfConfPwd(userPwd, userConfPwd);
    checkboxError();
    //checkIfAllInputsFilled(userNameInput, userEmailInput, userPwd, userConfPwd);
}

function checkboxError() {
    checkbox = document.getElementById('myCheckbox');
    if (!checkbox.checked) {
        let checkboxError = document.getElementById('checkbox-error');
        let ckeckboxContainer = document.getElementById('checkbox-container');
        checkboxError.textContent = "Please agree to our terms and conditions!";
        checkboxError.classList.add('visible');
        ckeckboxContainer.classList.add('red-border');
    } else {
        document.getElementById('checkbox-error').classList.remove('visible');
        document.getElementById('checkbox-container').classList.remove('red-border');
    }
}

function userInputErrorStyle(userNameInput) {
    if (userNameInput === "") {
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

function emailInputErrorStyle(userEmailInput) {
    if (userEmailInput === "") {
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
    } else {
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

async function checkIfAllInputsFilled(userNameInput, userEmailInput, userPwd, userConfPwd) {
    if (userNameInput === "" && userEmailInput === "" && userPwd !== userConfPwd && !checkbox.checked) {
        errorStyles(userNameInput, userEmailInput, userPwd, userConfPwd);
    } else if (userNameInput !== "" && userEmailInput !== "" && userPwd !== "" && userConfPwd !== "" && userPwd == userConfPwd && checkbox.checked) {
        postSignUpData(userNameInput, userEmailInput, userPwd);
        userSuccessfullySignedup();
    }
}

async function postSignUpData(userNameInput, userEmailInput, userPwd) {
    await postData(path = "/users", data = {
        'name': userNameInput,
        'email': userEmailInput,
        'password': userPwd
    });
}

function errorStyles(userNameInput, userEmailInput, userPwd, userConfPwd) {
    userInputErrorStyle(userNameInput);
    emailInputErrorStyle(userEmailInput);
    passwordInputErrorStyle(userPwd);
    passwordConfInputErrorStyle(userConfPwd);
    checkIfConfPwd(userPwd, userConfPwd);
    checkboxError();
}

async function ceckIfUserAllreadyExists(userNameInput, userEmailInput, userPwd, userConfPwd, checkbox) {
    let users = await getData('users');
    let userIds = Object.keys(users);
    let user;
    for (let i = 0; i < userIds.length; i++) {
        let userId = userIds[i];
        user = users[userId];
        if (user.email === userEmailInput && user.name === userNameInput  && checkbox.checked && userConfPwd !== "") {
            userAllreadyExists();
            break;
        } 
    }
    if (user.email !== userEmailInput && checkbox.checked && userNameInput !== "" && userEmailInput !== "" && userPwd !== "") {
        postSignUpData(userNameInput, userEmailInput, userPwd);
    }
}

function userSuccessfullySignedup() {
    console.log('User successfully signed up!');
    toogleDialog('dialog-signup-succes');
}

function userAllreadyExists() {
    console.log('User allready exists!');
    toogleDialog('dialog-allready-exists');
}

function toogleDialog(id) {
    document.getElementById(id).classList.add("dialog-active");

    setTimeout(function() {
        document.getElementById(id).classList.remove("dialog-active");
    }, 2000);
}