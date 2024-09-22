let contacts = [];

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
        console.log(contact);
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
            console.log(firstLetter);
            containerRef.innerHTML += firstLetterHtml(firstLetter);
        }
        containerRef.innerHTML += contactListHtml(contact, i);
    });
}


function firstLetterHtml(firstLetter) {
    return `<div class="contacts-first-letter">${firstLetter}</div>`;
}


function contactListHtml(contact, i) {
    return ` <div id="contact-list${i}" class="contact-list d-flex">
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


function toggleOverlay() {
    document.getElementById("dialog-add-contact").classList.toggle("active-overlay")
}