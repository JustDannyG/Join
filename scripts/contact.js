let currentSortKeys = [];
let contactIndex = getFromLocalStorage('currentDetails');
let contactsArray = getFromLocalStorage('contacts');
let currentContactDetails = localStorage.getItem("currentDetails");

let screenMode;


async function initContacts() {
    await getContacts();
    renderContacts();
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


function openContact(index) {
    currentContactDetails = index;
    // localStorage.setItem('currentDetails', currentContactDetails);
    saveToLocalStorage('currentDetails', currentContactDetails)
    saveToLocalStorage('contacts', contacts)
    if (screenMode == 'mobile') {

        window.location.href = "contact-details.html";
    } else if (screenMode == 'desktop') {

    }
    showContact()
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

    setTimeout(function () {
        document.getElementById(id).classList.remove("dialog-active");
        openContact(index);
    }, 2000);
}


async function findContact(name, email, phone) {
    contacts = []
    await getContacts()
    return contacts.findIndex(e => e.name == name && e.email == email && e.phone == phone);
}


///////////////////
// Contact Details
////////////////////

function showContact() {
    let currentContact = document.getElementById('current-contact');
    let detailsContainer = document.getElementById('details');
    let detail = contactsArray[contactIndex];
    currentContact.innerHTML = contactCirleHTML(detail);
    detailsContainer.innerHTML = contactInformationsHTML(detail);
}


function toggleOverlayDisplay() {
    let overlay = document.getElementById('edit-overlay-bg');
    overlay.classList.toggle('hide-overlay');
    editDetails();
}


function editDetails() {
    let currentDetail = contactsArray[contactIndex];
    document.getElementById('edit-name').value = currentDetail.name;
    document.getElementById('edit-email').value = currentDetail.email;
    document.getElementById('edit-phone').value = currentDetail.phone;
    document.getElementById('edit-initals-container').innerHTML = `
    <span style="background-color:${currentDetail.color}" class="edit-initals center">${createInititals(currentDetail.name)}
                        <input id="edit-color" type="color" value="${currentDetail.color}">
                    </span>
    `;
}


async function getCurrentKey() {
    let allContacts = await getData(path = "/contacts");
    let contactKeys = Object.keys(allContacts)
    contactKeys.forEach((key) => {
        currentSortKeys.push({
            'name': allContacts[key].name,
            'key': key
        })
    });
    sortByAlphabet(currentSortKeys);
}


async function editContact() {
    await getCurrentKey();
    let key = currentSortKeys[currentContactDetails].key;
    let name = document.getElementById('edit-name').value;
    let email = document.getElementById('edit-email').value;
    let phone = document.getElementById('edit-phone').value;
    let color = document.getElementById('edit-color').value;
    // let contactsArray = getFromLocalStorage('contacts');
    await putData(path = `/contacts/${key}`, data = {
        'color': color,
        'name': name,
        'email': email,
        'phone': phone
    })
    await getContacts();
    saveToLocalStorage('contacts', contacts);
    window.location.href = "contact-details.html";
}


async function deleteContact() {
    await getCurrentKey();
    let key = currentSortKeys[contactIndex].key;
    await deleteData(path = `/contacts/${key}`, data = {})

    window.location.href = "contact.html";
}