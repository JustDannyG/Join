function goSignUp() {
    window.location.href = "sign-up.html";
}

async function enterData() {
    let userData = await getData("users");
    let firstUserKey = Object.keys(userData)[0]; // Holt den ersten Benutzer
    let user = userData[firstUserKey]; // Holt die Daten des ersten Benutzers
    let emailInput = document.getElementById("email");
    let passwordInput = document.getElementById("password");
    emailInput.value = user.email;
    passwordInput.value = user.password;
}

function rememberMe() {

}