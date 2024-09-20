const BASE_URL = "https://join--projekt-default-rtdb.europe-west1.firebasedatabase.app/";

async function getData(path = "") {
    let response = await fetch(BASE_URL + path + '.json');
    let responseAsJson = await response.json();
    return responseAsJson
}


async function postData(path="", data={}) {
    let response = await fetch(BASE_URL + path + '.json', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    let responseToJson = await response.json();
    return responseToJson;
}


async function putData(path="", data={}) {
    let response = await fetch(BASE_URL + path + '.json', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    let responseToJson = await response.json();
    return responseToJson;
}


async function deleteData(path="" , data={}) {
    let response = await fetch(BASE_URL + path + '.json', {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    let responseToJson = await response.json();
    return responseToJson;
}
