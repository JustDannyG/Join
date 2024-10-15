let user;

async function login(event) {
    event.preventDefault();
    let emailInput = document.getElementById('email').value;
    let passwordInput = document.getElementById('password').value;
    let users = await getData('users');
    let userIds = Object.keys(users);
    let userFound = false;
    searchUserInDatabase(emailInput, passwordInput, users, userIds, userFound);
    emailInputErrorStyle(emailInput);
    passwordInputErrorStyle(passwordInput, emailInput);
}

function searchUserInDatabase(emailInput, passwordInput, users, userIds, userFound) {
    for (let i = 0; i < userIds.length; i++) {
        let userId = userIds[i];
        user = users[userId];
        if (user.email === emailInput && user.password === passwordInput) {
            userFound = true;
            window.location.href = 'summary.html';
            break;
        }
    }
}

function emailInputErrorStyle(emailInput) {
    if (emailInput === "") {
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

function passwordInputErrorStyle(passwordInput, emailInput) {
    let userPwdError = document.getElementById('password-error');
    let userPwdContainer = document.getElementById('pwd-input-container');
    checkIfPasswordInputFilled(passwordInput, userPwdError, userPwdContainer);
    checkIfPasswordMatch(passwordInput, userPwdError, userPwdContainer, emailInput);
}

function checkIfPasswordMatch(passwordInput, userPwdError, userPwdContainer, emailInput) {
    if (passwordInput !== "" && passwordInput !== user.password || emailInput !== user.email && passwordInput !== "") {
        userPwdError.textContent = "Email or Password isn't correct";
        userPwdError.classList.add('visible');
        userPwdError.classList.add('shake');
        setTimeout(() => {
            userPwdError.classList.remove('shake');
        }, 300);
        // userPwdContainer.classList.add('red-border');
    }
}

function checkIfPasswordInputFilled(passwordInput, userPwdError, userPwdContainer) {
    if (passwordInput === "") {
        userPwdError.textContent = "Please enter your Password!";
        userPwdError.classList.add('visible');
        userPwdContainer.classList.add('red-border');
    } else {
        document.getElementById('password-error').classList.remove('visible');
        document.getElementById('pwd-input-container').classList.remove('red-border');
    }
}

function rememberMe() {

}

function goSummery(event) {
    // event.preventDefault();
    window.location.href = 'summary.html';
}

function goSignUp(event) {
    // event.preventDefault();
    window.location.href = 'sign-up.html';
}
function screeWidth() {
    if (window.innerWidth >= 1440) {
        document.getElementById('content-small').style.display = 'none';
        document.getElementById('svg-image-small-content').style.display = 'none';
        // document.getElementById('content-large').style.display = 'block';
    } else {
        // document.getElementById('content-small').style.display = 'block';
        document.getElementById('svg-image-large-content').style.display = 'none';
        document.getElementById('content-large').style.display = 'none';
    }
}