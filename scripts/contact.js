let contacts = [];

let currentContactDetails = localStorage.getItem("currentDetails");


async function initContacts() {
    await getContacts();
    renderContacts();


}


async function getContacts() {
    const contactsData = await getData("contacts");
    const keys = Object.keys(contactsData);
    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        const contact = contactsData[key];
        contacts.push(contact);
    }
    sortByAlphabet(contacts);
}


function sortByAlphabet(arr) {
    arr.sort((a, b) => a.name.localeCompare(b.name));
    return arr;
}


function renderContacts() {
    let containerRef = document.getElementById("contacts-container");
    containerRef.innerHTML = '';
    let firstLetter = '';
    contacts.forEach((contact, i) => {
        if (firstLetter !== contact.name.charAt(0).toUpperCase()) {
            firstLetter = contact.name.charAt(0).toUpperCase();
            containerRef.innerHTML += firstLetterHtml(firstLetter);
        }
        containerRef.innerHTML += contactListHtml(contact, i);
    });
}


function firstLetterHtml(firstLetter) {
    return `<div class="contacts-first-letter">${firstLetter}</div>`;
}


function contactListHtml(contact, i) {
    return ` <div onclick="openContact(${i})" class="contact-list d-flex">
      <span class="contact-initials center" style="background:${contact.color}">${createInititals(contact.name)}</span>
      <div>
        <p>${contact.name}</p>
        <a href="#">${contact.email}</a>
      </div>
    </div>`;
}


function createInititals(selectName) {
    let firstsChar = selectName;
    parts = firstsChar.split(' ');
    if (parts.length == 1) {
        neededPartOne = parts[0].slice(0, 1);
        return neededPartOne;
    } else if (parts.length == 2) {
        neededPartOne = parts[0].slice(0, 1);
        neededPartTwo = parts[1].slice(0, 1);
        return neededPartOne + neededPartTwo;
    } else if (parts.length == 3) {
        neededPartOne = parts[0].slice(0, 1);
        neededPartThree = parts[2].slice(0, 1);
        return neededPartOne + neededPartThree;
    }
}


function randomColor() {
    let random = Math.floor(Math.random() * 16777215).toString(16);
    let hexCode = '#' + random;
    return hexCode;

}


function openContact(index) {
    currentContactDetails = index;
    // localStorage.setItem('currentDetails', currentContactDetails);
    saveToLocalStorage('currentDetails', currentContactDetails)
    saveToLocalStorage('contacts', contacts)
    window.location.href = "contact-details.html";
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
    let myArr = JSON.parse(localStorage.getItem(key));
    if (myArr !== null) {
        myData = myArr
    }
    return myData;
}

async function addContact() {
    const nameRef = document.getElementById("edit-name-input")
    const emailRef = document.getElementById("edit-mail-input")
    const phoneNumRef = document.getElementById("edit-phone-input")

    const inputs = getInputs(nameRef, emailRef, phoneNumRef)

    clearInput(nameRef)
    clearInput(emailRef)
    clearInput(phoneNumRef)

    await postData(path = "contacts", data = { "name": `${inputs.name}`, "email": `${inputs.email}`, "phone": `${inputs.phone}`, "color": `${inputs.color}` });
    const contact = await findContact(inputs.name, inputs.email, inputs.phone)
    toogleDialog('dialog-add-succes', contact)
}

function getInputs(nameRef, emailRef, phoneNumRef) {
    const name = nameRef.value
    const email = emailRef.value
    const phone = phoneNumRef.value
    const color = randomColor()
    return { name, email, phone, color }
}

function toogleDialog(id, index) {
    document.getElementById(id).classList.add("dialog-active");

    setTimeout(function() {
        document.getElementById(id).classList.remove("dialog-active");
        // openContact(index);
    }, 2000);
}

async function findContact(name, email, phone) {
    contacts = []
    await getContacts()
    return contacts.findIndex(e => e.name == name && e.email == email && e.phone == phone);


}