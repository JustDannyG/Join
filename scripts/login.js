let currentUser;

async function login(event) {
    event.preventDefault();
    let emailInput = document.getElementById("email").value;
    let passwordInput = document.getElementById("password").value;
    let checkbox = document.getElementById("myCheckbox");
    let users = await getData("users");
    let userIds = Object.keys(users);
    let userFound = false;
    searchUserInDatabase(emailInput, passwordInput, users, userIds, userFound, checkbox);
    emailInputErrorStyle(emailInput);
    passwordInputErrorStyle(passwordInput, emailInput);
}

async function searchUserInDatabase(emailInput, passwordInput, users, userIds, userFound, checkbox) {
    let emailInputLower = emailInput.toLowerCase();
    for (let i = 0; i < userIds.length; i++) {
        let userId = userIds[i];
        currentUser = users[userId];
        if (currentUser.email.toLowerCase() === emailInputLower && currentUser.password === passwordInput) {
            userFound = true;
            localStorage.setItem("user", currentUser.name);
            localStorage.setItem("userId", userId);  
            window.location.href = "summary.html";
        }
    }
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
        document.getElementById("email-error").classList.remove("visible");
        document.getElementById("email-input-container").classList.remove("red-border");
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
        document.getElementById("password-error").classList.remove("visible");
        document.getElementById("pwd-input-container").classList.remove("red-border");
    }
}

function goSummery(event) {
    localStorage.setItem("user", "Guest");
    window.location.href = 'summary.html';
}


// Hier a tag verwenden dann ist keine funktion nötig !!!

function goSignUp() {
    window.location.href = "sign-up.html";
}



// Das kann man in den @media auf display ein und ausblenden !!!

function screeWidth() {
    if (window.innerWidth >= 1440) {
        document.getElementById("content-small").style.display = "none";
        document.getElementById("svg-image-small-content").style.display = "none";
        // document.getElementById('content-large').style.display = 'block';
    } else {
        // document.getElementById('content-small').style.display = 'block';
        document.getElementById("svg-image-large-content").style.display = "none";
        document.getElementById("content-large").style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const svgImage = document.getElementById('loginSvg');

    svgImage.addEventListener('animationend', function() {
        svgImage.src = "/assets/icons/logo-dark.svg"; // Ändere das Bild nach der Animation
    });
});