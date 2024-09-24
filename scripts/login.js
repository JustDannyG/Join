let containerOverlayIds = [
    "legalNoticeLink",
    "privacyPolicyLink",
    "myCheckbox",
    "signupButton",
    "guestLoginButton",
    "loginButton",
    "myInput"
  ];
  
  function highlightAll(event) {
    let target = event.target;
    let isExcluded = containerOverlayIds.some(id => target.id === id || target.closest(`#${id}`));
  
    if (!isExcluded) {
        for (let i = 0; i < containerOverlayIds.length; i++) {
            let id = containerOverlayIds[i];
            let element = document.getElementById(id);
            if (element) {
                let overlay = document.createElement('div');
                overlay.classList.add('overlay');
                let { top, left, width, height } = element.getBoundingClientRect();
                overlayStyle(overlay, top, left, width, height);
                document.body.appendChild(overlay);
                setTimeout(() => {
                    overlay.remove();
                }, 333);
            }
        }
    }
  }
  
  function overlayStyle(overlay, top, left, width, height) {
    overlay.style.cssText = `
                    position: absolute;
                    top: ${top}px;
                    left: ${left}px;
                    width: ${width}px;
                    height: ${height}px;
                `;
    return;
  }

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