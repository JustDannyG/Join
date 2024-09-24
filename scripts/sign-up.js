let containerOverlayIds = [
    "legalNoticeLink",
    "privacyPolicyLink",
    "linkPricacyPolicyCheckbox",
    "signupButton",
    "myCheckbox",
    "formInputsContainer",
    "backBtn"
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
                }, 500);
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

async function signUp() {
    let userName = document.getElementById('name-input').value;
    let userEmail = document.getElementById('email-input').value;
    let userPwd = document.getElementById('user-pwd').value;
    let userConfPwd = document.getElementById('user-conf-pwd').value;

    await postData(path = "/users", data = {
        'name': userName,
        'email': userEmail,
        'password': userPwd
    })
}

function checkPasswordMatch() {
    // Zugriff auf die beiden Input-Felder
    const password = document.getElementById('user-pwd').value;
    const confirmPassword = document.getElementById('user-conf-pwd').value;
    
    // Zugriff auf das Span-Element für die Fehlermeldung
    const errorMessage = document.getElementById('error-message');
    
    // Vergleich der beiden Passwortfelder
    if (password !== confirmPassword) {
        // Wenn die Passwörter nicht übereinstimmen
        document.getElementById('user-conf-pwd').setCustomValidity("Passwords do not match");
        errorMessage.style.display = 'inline';  // Zeige die Fehlermeldung an
    } else {
        // Wenn die Passwörter übereinstimmen
        document.getElementById('user-conf-pwd').setCustomValidity(""); // Entfernt die 'required'-Warnung
        errorMessage.style.display = 'none';  // Verstecke die Fehlermeldung
    }
}
