const excludedIds = [
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
    let isExcluded = excludedIds.some(id => target.id === id || target.closest(`#${id}`));

    if (!isExcluded) {
        for (let i = 0; i < excludedIds.length; i++) {
            let id = excludedIds[i];
            let element = document.getElementById(id);
            if (element) {
                let overlay = document.createElement('div');
                overlay.classList.add('overlay');
                let { top, left, width, height } = element.getBoundingClientRect();
                overlay.style.cssText = `
                    position: absolute;
                    top: ${top}px;
                    left: ${left}px;
                    width: ${width}px;
                    height: ${height}px;
                `;
                document.body.appendChild(overlay);
                setTimeout(() => {
                    overlay.remove();
                }, 333);
            }
        }
    }
}
