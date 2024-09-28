function welcomeMessage(user) {
    
    let welcomeDiv = document.getElementById('welcomeMessage');
    welcomeDiv.classList.add('show');
    setTimeout(() => {
        welcomeDiv.classList.remove('show');
    }, 2000);
}

function welcomeMessageTemplate(user) {
    return /*html*/ `
    <h2>Good morning,</h2>
    <h1>${user}</h1>`;
}