let currentSortKeys = [];
let contactIndex = getFromLocalStorage("currentDetails");
let contactsArray = getFromLocalStorage("contacts");
let currentContactDetails = localStorage.getItem("currentDetails");
let screenMode;

////////////////////
///    Start   ////
///////////////////

async function initContacts() {
    await getContacts();
    renderContacts();
}

/////////////////////////////////
///    Render Contact List   ////
////////////////////////////////

function renderContacts() {
    let containerRef = document.getElementById("contacts-container");
    containerRef.innerHTML = "";
    let firstLetter = "";
    contacts.forEach((contact, i) => {
        if (firstLetter !== contact.name.charAt(0).toUpperCase()) {
            firstLetter = contact.name.charAt(0).toUpperCase();
            containerRef.innerHTML += firstLetterHtml(firstLetter);
        }
        containerRef.innerHTML += contactListHtml(contact, i);
    });
}

async function openContact(index) {
    currentContactDetails = index;
    await initContacts();
    saveToLocalStorage("currentDetails", currentContactDetails);
    saveToLocalStorage("contacts", contacts);
    if (screenMode == "mobile") {
        window.location.href = "contact-details.html";
    } else if (screenMode == "desktop") {
        contactIndex = index;
        contactsArray = contacts;
        classChangeAction("dialog-add-contact", "hide-overlay", "add");
        showContact();
    }
}

/////////////////////////////////////////////////
///   LocalStorage - Save / Load Functions   ////
/////////////////////////////////////////////////

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
    let myData;
    let myArr = JSON.parse(localStorage.getItem(key));
    if (myArr !== null) {
        myData = myArr;
    }
    return myData;
}

////////////////////////////////////
///    Add Contacts Functions   ////
///////////////////////////////////

async function addContact() {
    const nameRef = document.getElementById("add-name-input");
    const emailRef = document.getElementById("add-mail-input");
    const phoneNumRef = document.getElementById("add-phone-input");
    const inputs = getInputs(nameRef, emailRef, phoneNumRef);
    clearInput(nameRef);
    clearInput(emailRef);
    clearInput(phoneNumRef);
    await postData((path = "contacts"), (data = { name: `${inputs.name}`, email: `${inputs.email}`, phone: `${inputs.phone}`, color: `${inputs.color}` }));
    const contactIndex = await findContact(inputs.name, inputs.email, inputs.phone);
    toogleDialog("dialog-add-succes", contactIndex);
}

function getInputs(nameRef, emailRef, phoneNumRef) {
    const name = nameRef.value;
    const email = emailRef.value;
    const phone = phoneNumRef.value;
    const color = randomColor();
    return { name, email, phone, color };
}

function toogleDialog(id, index) {
    document.getElementById(id).classList.add("dialog-active");

    setTimeout(function () {
        document.getElementById(id).classList.remove("dialog-active");
        openContact(index);
    }, 2000);
}

async function findContact(name, email, phone) {
    await getContacts();
    return contacts.findIndex((e) => e.name == name && e.email == email && e.phone == phone);
}

function clearAddInputs() {
    document.getElementById("add-name-input").value = "";
    document.getElementById("add-mail-input").value = "";
    document.getElementById("add-phone-input").value = "";
}

///////////////////////////////
//   Show Contact Details   ///
///////////////////////////////

function showContact() {
    let currentContact = document.getElementById("current-contact");
    let detail = contactsArray[contactIndex];
    currentContact.innerHTML = contactCirleHTML(detail);
    // let detailsContainer = document.getElementById("details");
    // detailsContainer.innerHTML = contactInformationsHTML(detail);
}

function toggleOverlayDisplay() {
    let overlay = document.getElementById("edit-overlay-bg");
    overlay.classList.toggle("hide-overlay");
    editDetails();
}

///////////////////////////////////////
//  Edit Contact Details Functions  ///
//////////////////////////////////////

function editDetails() {
    let currentDetail = contactsArray[contactIndex];
    document.getElementById("edit-name").value = currentDetail.name;
    document.getElementById("edit-email").value = currentDetail.email;
    document.getElementById("edit-phone").value = currentDetail.phone;
    document.getElementById("edit-initals-container").innerHTML = `
    <span style="background-color:${currentDetail.color}" class="edit-initals center">${createInititals(currentDetail.name)}
                        <input id="edit-color" type="color" value="${currentDetail.color}">
                    </span>
    `;
}

async function getCurrentKey() {
    let allContacts = await getData((path = "/contacts"));
    let contactKeys = Object.keys(allContacts);
    contactKeys.forEach((key) => {
        currentSortKeys.push({
            name: allContacts[key].name,
            key: key,
        });
    });
    sortByAlphabet(currentSortKeys);
}

async function editContact() {
    await getCurrentKey();
    let key = currentSortKeys[currentContactDetails].key;
    let name = document.getElementById("edit-name").value;
    let email = document.getElementById("edit-email").value;
    let phone = document.getElementById("edit-phone").value;
    let color = document.getElementById("edit-color").value;
    await putData(
        (path = `/contacts/${key}`),
        (data = {
            color: color,
            name: name,
            email: email,
            phone: phone,
        })
    );
    saveToLocalStorage("contacts", contacts);

    if (screenMode == "mobile") {
        window.location.href = "contact-details.html";
    } else if (screenMode == "desktop") {
        await initContacts();
        openContact(await findContact(name, email, phone));
        classChangeAction("edit-overlay-bg", "hide-overlay", "add");
    }
}

//////////////////////////
//   Delete Contact    ///
//////////////////////////

async function deleteContact() {
    await getCurrentKey();
    let key = currentSortKeys[contactIndex].key;
    await deleteData((path = `/contacts/${key}`), (data = {}));
    saveToLocalStorage("deletedContact", contacts[contactIndex]);
    window.location.href = "contact.html";
}
