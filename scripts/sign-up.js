async function signUp() {
    let userNameInput = document.getElementById("name-input").value;
    let userEmailInput = document.getElementById("email-input").value;
    let userPwd = document.getElementById("user-pwd").value;
    let userConfPwd = document.getElementById("user-conf-pwd").value;
    checkbox = document.getElementById("myCheckbox");
    await checkIfUserAllreadyExists(userNameInput, userEmailInput, userPwd, userConfPwd, checkbox);
    errorStyles(userNameInput, userEmailInput, userPwd, userConfPwd);
}

async function capitalizeFirstLetter(userEmailInput, userPwd) {
    let userNameInput = document.getElementById("name-input");
    let userNameValue = userNameInput.value;
    if (userNameValue.length > 0) {
        let capitalizedUserName = userNameValue.charAt(0).toUpperCase() + userNameValue.slice(1);
        userNameValue = capitalizedUserName;
        await postSignUpData(userNameValue, userEmailInput, userPwd);
    }
}

function checkIfEmailHaveAnAtt(emailInput, userEmailError, userEmailContainer) {
    if (!containsAtSymbol(emailInput) && emailInput !== "") {
        userEmailError.textContent = "Your email isn't an Email";
        userEmailError.classList.add("visible");
        userEmailContainer.classList.add("red-border");
        shake(userEmailError);
    } else {
        document.getElementById("email-error").classList.remove("visible");
        document.getElementById("email-input-container").classList.remove("red-border");
    }
}

function shake(Error) {
    Error.classList.add("shake");
    setTimeout(() => {
        Error.classList.remove("shake");
    }, 300);
}

function containsAtSymbol(emailInput) {
    return emailInput.includes("@");
}

function checkboxError() {
    checkbox = document.getElementById("myCheckbox");
    if (!checkbox.checked) {
        let checkboxError = document.getElementById("checkbox-error");
        // let ckeckboxContainer = document.getElementById("checkbox-container");
        checkboxError.textContent = "Please agree to our terms and conditions!";
        checkboxError.classList.add("visible");
        // ckeckboxContainer.classList.add("red-border");
        shake(checkboxError);
    } else {
        document.getElementById("checkbox-error").classList.remove("visible");
        document.getElementById("checkbox-container").classList.remove("red-border");
    }
}

function userInputErrorStyle(userNameInput) {
    if (userNameInput === "") {
        let userNameError = document.getElementById("name-error");
        let userNameContainer = document.getElementById("name-input-container");
        userNameError.textContent = "Please enter your name!";
        userNameError.classList.add("visible");
        userNameContainer.classList.add("red-border");
        shake(userNameError);
    } else {
        document.getElementById("name-error").classList.remove("visible");
        document.getElementById("name-input-container").classList.remove("red-border");
    }
}

function emailInputErrorStyle(userEmailInput) {
    let userEmailError = document.getElementById("email-error");
    let userEmailContainer = document.getElementById("email-input-container");
    if (userEmailInput === "") {
        userEmailError.textContent = "Please enter your Email!";
        userEmailError.classList.add("visible");
        userEmailContainer.classList.add("red-border");
        shake(userEmailError);
    } else if (userEmailInput !== "") {
        checkIfEmailHaveAnAtt(userEmailInput, userEmailError, userEmailContainer);
        shake(userEmailError);
    } else {
        document.getElementById("email-error").classList.remove("visible");
        document.getElementById("email-input-container").classList.remove("red-border");
    }
}

function passwordInputErrorStyle(userPwd) {
    if (userPwd === "") {
        let userPwdError = document.getElementById("password-error");
        let userPwdContainer = document.getElementById("pwd-input-container");
        userPwdError.textContent = "Please enter any Password!";
        userPwdError.classList.add("visible");
        userPwdContainer.classList.add("red-border");
        shake(userPwdError);
    } else {
        document.getElementById("password-error").classList.remove("visible");
        document.getElementById("pwd-input-container").classList.remove("red-border");
    }
}

function passwordConfInputErrorStyle(userConfPwd) {
    if (userConfPwd === "") {
        let userConfPwdError = document.getElementById("conf-pwd-error");
        let userConfPwdContainer = document.getElementById("conf-pwd-input-container");
        userConfPwdError.textContent = "Please confirm your Password!";
        userConfPwdError.classList.add("visible");
        userConfPwdContainer.classList.add("red-border");
        shake(userConfPwdError);
    } else {
        document.getElementById("conf-pwd-error").classList.remove("visible");
        document.getElementById("conf-pwd-input-container").classList.remove("red-border");
    }
}

function checkIfConfPwd(userPwd, userConfPwd) {
    if (userPwd !== userConfPwd) {
        let userConfPwdError = document.getElementById("conf-pwd-error");
        let userConfPwdContainer = document.getElementById("conf-pwd-input-container");
        userConfPwdError.textContent = "Your passwords don't match. Please try again.";
        userConfPwdError.classList.add("visible");
        userConfPwdContainer.classList.add("red-border");
        shake(userConfPwdError);
    } else {
        document.getElementById("conf-pwd-error").classList.remove("visible");
        document.getElementById("conf-pwd-input-container").classList.remove("red-border");
    }
}

async function checkIfAllInputsFilled(userNameInput, userEmailInput, userPwd, userConfPwd, user) {
    if (userNameInput === "" && userEmailInput === "" && userPwd !== userConfPwd && !checkbox.checked && !emailInput.includes("@")) {
        errorStyles(userNameInput, userEmailInput, userPwd, userConfPwd);
    } else if (userNameInput !== "" && userEmailInput !== "" && userPwd !== "" && userConfPwd !== "" && userPwd == userConfPwd && checkbox.checked && user.email !== userEmailInput && user.name !== userNameInput) {
        userSuccessfullySignedup();
    }
}

async function postSignUpData(userNameInput, userEmailInput, userPwd) {
    await postData(
        (path = "/users"),
        (data = {
            name: userNameInput,
            email: userEmailInput,
            password: userPwd,
        })
    );
    setTimeout(() => {
        goLogin();
    }, 1500);
}

function goLogin() {
    window.location.href = "index.html";
}

function errorStyles(userNameInput, userEmailInput, userPwd, userConfPwd) {
    let userEmailError = document.getElementById("email-error");
    let userEmailContainer = document.getElementById("email-input-container");
    userInputErrorStyle(userNameInput);
    checkIfEmailHaveAnAtt(userEmailInput, userEmailError, userEmailContainer);
    emailInputErrorStyle(userEmailInput);
    passwordInputErrorStyle(userPwd);
    passwordConfInputErrorStyle(userConfPwd);
    checkIfConfPwd(userPwd, userConfPwd);
    checkboxError();
}

async function checkIfUserAllreadyExists(userNameInput, userEmailInput, userPwd, userConfPwd, checkbox) {
    let users = await getData("users");
    let userIds = Object.keys(users);
    let nameExists = false;
    let emailExists = false;
    hideErrorMsg("name-error");
    hideErrorMsg("email-error");
    checkUserNameAndEmail(users, userIds, userNameInput, userEmailInput, nameExists, emailExists);

    if (checkbox.checked && userNameInput !== "" && userEmailInput !== "" && userEmailInput.includes("@") && userPwd !== "" && userConfPwd !== "" && userPwd === userConfPwd && nameExists == false && emailExists == false) {
        checkIfAllInputsFilled(userNameInput, userEmailInput, userPwd, userConfPwd, users);
        await capitalizeFirstLetter(userEmailInput, userPwd);
    }
}

function checkUserNameAndEmail(users, userIds, userNameInput, userEmailInput, nameExists, emailExists) {
    for (let i = 0; i < userIds.length; i++) {
        let user = users[userIds[i]];
        nameExists = checkNameExist(user, userNameInput, nameExists);
        emailExists = checkEmailExist(user, userEmailInput, emailExists);
        if (nameExists || emailExists) break;
    }
}

function checkNameExist(user, userNameInput, nameExists) {
    if (user.name == userNameInput) {
        nameExists = true;
        userAlreadyExistsMsg("name-error", "Name");
    } else {
        return nameExists;
    }
}

function checkEmailExist(user, userEmailInput, emailExists) {
    if (user.email == userEmailInput) {
        emailExists = true;
        userAlreadyExistsMsg("email-error", "Email");
    } else {
        return emailExists;
    }
}

function hideErrorMsg(errorInput) {
    let errorRef = document.getElementById(errorInput);
    errorRef.innerHTML = "";
    errorRef.style.display = "none";
}

function userAlreadyExistsMsg(errorInput, errorText) {
    let errorRef = document.getElementById(errorInput);
    errorRef.innerHTML = `User ${errorText} already exists`;
    errorRef.style.display = "block";
    shake(errorRef);
}

function userSuccessfullySignedup() {
    toogleDialog("dialog-signup-succes");
}

function toogleDialog(id) {
    document.getElementById(id).classList.add("dialog-active");

    setTimeout(function () {
        document.getElementById(id).classList.remove("dialog-active");
    }, 2000);
}
