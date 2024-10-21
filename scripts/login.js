let userFound = false;
let users;
let currentUser;
let remeberMe;
let remeberMeUser;

async function loginInit() {
    users = await getData("users");
    userIds = Object.keys(users);
    remeberMe = getFromLocalStorage("rememberMe");
    remeberMeUser = getFromLocalStorage("rememberMeUser");
    if (remeberMe) {
        document.getElementById("email").value = remeberMeUser.email;
        document.getElementById("password").value = remeberMeUser.password;
        login();
    }
}

async function login() {
    let emailInput = document.getElementById("email").value;
    let passwordInput = document.getElementById("password").value;

    searchUserInDatabase(emailInput, passwordInput, users, userIds);
    if (!userFound) {
        emailInputErrorStyle(emailInput);
        passwordInputErrorStyle(passwordInput, emailInput);
    }
}

function searchUserInDatabase(emailInput, passwordInput, users, userIds) {
    let emailInputLower = emailInput.toLowerCase();
    let remeberMeRef = document.getElementById("myCheckbox");
    for (let i = 0; i < userIds.length; i++) { 
        userId = userIds[i];
        currentUser = users[userId];
        if (currentUser.email.toLowerCase() === emailInputLower && currentUser.password === passwordInput) {
            userFound = true;
            userLogin(remeberMeRef, userId);
            break;
        }
    }
}
function userLogin(remeberMeRef, userId) {
    localStorage.setItem("user", currentUser.name);
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", currentUser.name);
    if (remeberMeRef.checked) {
        saveToLocalStorage("rememberMe", remeberMeRef.checked);
        saveToLocalStorage("rememberMeUser", currentUser);
    }
    window.location.href = "summary.html";
}

function shake(Error) {
    Error.classList.add("shake");
    setTimeout(() => {
        Error.classList.remove("shake");
    }, 300);
}

// async function logOut() {
//     let users = await getData('users');
//     let userIds = Object.keys(users);
//     for (let i = 0; i < userIds.length; i++) {
//         let userId = userIds[i];
//         currentUser = users[userId];
//         // if (xxx) {
//         // }
//     }
// }

// async function saveLoggedUser(emailInput, checkbox, userId) {
//     emailInput = true;
//     await putData(path = `/users/${userId}/loggedIn`, data = {
//         'email': emailInput,
//         'remember-me-checkbox': checkbox.checked,
//     });
// }

function emailInputErrorStyle(emailInput) {
    let userEmailError = document.getElementById("email-error");
    let userEmailContainer = document.getElementById("email-input-container");
    checkIfEmailInputFilled(emailInput, userEmailError, userEmailContainer);
    checkIfEmailHaveAnAtt(emailInput, userEmailError, userEmailContainer);
}

function checkIfEmailInputFilled(emailInput, userEmailError, userEmailContainer) {
    if (emailInput === "") {
        userEmailError.textContent = "Please enter your Email!";
        userEmailError.classList.add("visible");
        userEmailContainer.classList.add("red-border");
        shake(userEmailError);
    } else {
        userEmailError.classList.remove("visible");
        userEmailContainer.classList.remove("red-border");
    }
}

function checkIfEmailHaveAnAtt(emailInput, userEmailError, userEmailContainer) {
    if (!containsAtSymbol(emailInput) && emailInput !== "") {
        userEmailError.textContent = "Your email isn't an email";
        userEmailError.classList.add("visible");
        userEmailContainer.classList.add("red-border");
        shake(userEmailError);
    }
}

function containsAtSymbol(emailInput) {
    return emailInput.includes("@");
}

function passwordInputErrorStyle(passwordInput, emailInput) {
    let userPwdError = document.getElementById("password-error");
    let userPwdContainer = document.getElementById("pwd-input-container");
    checkIfPasswordInputFilled(passwordInput, userPwdError, userPwdContainer);
    checkIfPasswordMatch(passwordInput, userPwdError, emailInput);
}

function checkIfPasswordMatch(passwordInput, userPwdError, emailInput) {
    if ((passwordInput !== "" && passwordInput !== currentUser.password) || (emailInput !== currentUser.email && passwordInput !== "")) {
        userPwdError.textContent = "Email or Password isn't correct";
        userPwdError.classList.add("visible");
        shake(userPwdError);
    }
}

function checkIfPasswordInputFilled(passwordInput, userPwdError, userPwdContainer) {
    if (passwordInput === "") {
        userPwdError.textContent = "Please enter your Password!";
        userPwdError.classList.add("visible");
        userPwdContainer.classList.add("red-border");
        shake(userPwdError);
    } else {
        userPwdError.classList.remove("visible");
        userPwdContainer.classList.remove("red-border");
    }
}

function goSummery() {
    localStorage.setItem("user", "Guest");
    window.location.href = "summary.html";
}

document.addEventListener("DOMContentLoaded", function () {
    const svgImage = document.getElementById("loginSvg");

    svgImage.addEventListener("animationend", function () {
        svgImage.src = "./assets/icons/logo-dark.svg"; // Ändere das Bild nach der Animation
    });
});
