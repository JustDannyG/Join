


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