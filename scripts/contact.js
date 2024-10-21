// let currentSortKeys = [];
let contactIndex = getFromLocalStorage("currentDetails");
let contactsArray = getFromLocalStorage("contacts");
// let currentContactDetails = localStorage.getItem("currentDetails");

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

async function renderContacts() {
    let containerRef = document.getElementById("contacts-container");
    containerRef.innerHTML = "";
    let firstLetter = "";
    if (user !== "Guest") {
        containerRef.innerHTML = firstLetterHtml("Me");
        containerRef.innerHTML += ownContactListHtml(await ownContact());
    }

    contacts.forEach((contact, i) => {
        if (firstLetter !== contact.name.charAt(0).toUpperCase()) {
            firstLetter = contact.name.charAt(0).toUpperCase();
            containerRef.innerHTML += firstLetterHtml(firstLetter);
        }
        containerRef.innerHTML += contactListHtml(contact, i);
    });
}

async function openContact(index) {
    // currentContactDetails = index;
    await initContacts();
    saveToLocalStorage("currentDetails", index);
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

async function openOwnContact() {
    if (screenMode == "mobile") {
        // let myUser = await ownContact();
        saveToLocalStorage("contacts", 'user');
        window.location.href = "contact-details.html";
    } else if (screenMode == "desktop") {
        classChangeAction("dialog-add-contact", "hide-overlay", "add");
        showOwnContact();
    }
}

async function showOwnContact() {
    let currentContact = document.getElementById("current-contact");
    currentContact.innerHTML = contactOwnCirleHTML(await ownContact());
}


function changeOwnEditButtons() {
    document.getElementById('edit-contact').innerHTML = `
 <div class="edit-contact d-flex " onclick="toggleOwnOverlayDisplay()">
            <img src="./assets/icons/edit.png " alt="Edit Button" /> Edit
        </div>

        <div class="edit-contact d-flex " onclick="alert('yes')">
            <img src="./assets/icons/delete.png " alt="Delete Button" /> Delete
        </div>
`;
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
    let nameRef = document.getElementById("add-name-input");
    let emailRef = document.getElementById("add-mail-input");
    let phoneNumRef = document.getElementById("add-phone-input");
    let inputs = getInputs(nameRef, emailRef, phoneNumRef);
    document.getElementById("submit-add-contact-btn").setAttribute("disabled", true);
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
        buttonRef = document.getElementById("submit-add-contact-btn").removeAttribute("disabled");
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

async function showContact() {
    let currentContact = document.getElementById("current-contact");
    if (contactsArray == 'user') {
        currentContact.innerHTML = contactOwnCirleHTML(await ownContact());
        changeOwnEditButtons()
    } else {
        let detail = contactsArray[contactIndex];
        currentContact.innerHTML = contactCirleHTML(detail);
    }
}



function toggleOverlayDisplay() {
    let overlay = document.getElementById("edit-overlay-bg");
    overlay.classList.toggle("hide-overlay");
    if (screenMode == 'desktop') {
        document.getElementById('edit-action-btns').innerHTML = `
                    <button class="edit-delete-btn center" onclick="deleteContact(); return false">Delete</button>
                    <button class="edit-save-btn center">Save <img src="./assets/icons/check.png" alt="" /></button>`;
    }
    editDetails();
}



///////////////////////////////
//   Own User Details   ///
///////////////////////////////

function toggleOwnOverlayDisplay() {
    let overlay = document.getElementById("edit-overlay-bg");
    overlay.classList.toggle("hide-overlay");
    document.getElementById('edit-action-btns').innerHTML = `<button class="edit-save-btn center" onclick="editOwnUser(); return false">Save <img src="./assets/icons/check.png" alt="" /></button>`;
    editOwnDetails();
}

async function editOwnDetails() {
    let currentDetail = await ownContact()
    document.getElementById("edit-name").value = currentDetail.name;
    document.getElementById("edit-email").value = currentDetail.email;
    document.getElementById("edit-phone").value = currentDetail.phone;
    document.getElementById("edit-initals-container").innerHTML = `
    <span style="background-color:${currentDetail.color}" class="edit-initals center">${createInititals(currentDetail.name)}
                        <input id="edit-color" type="color" value="${currentDetail.color}">
                    </span>
    `;
}


async function editOwnUser() {
    let name = document.getElementById("edit-name").value;
    let email = document.getElementById("edit-email").value;
    let phone = document.getElementById("edit-phone").value;
    let color = document.getElementById("edit-color").value;
    let pw = await getData(`users/${userId}/password`)

    await putData(
        (path = `/users/${userId}`),
        (data = {
            color: color,
            name: name,
            email: email,
            phone: phone,
            password: pw
        })
    );
    await initContacts();
    showOwnContact();
    toggleOwnOverlayDisplay()
}

function deletePopUp() {  /// Her Pop up um fragen ob user wirklich gelöscht werden soll 
    
}

async function deleteOwnUser() {  // user Entgültig löschen und ausloggen 
   await deleteData(path = `/users/${userId}`)
   logOut();
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


// async function getCurrentKey() {
//     let allContacts = await getData((path = "/contacts"));
//     let contactKeys = Object.keys(allContacts);
//     currentSortKeys = [];
//     contactKeys.forEach((key) => {
//         currentSortKeys.push({
//             name: allContacts[key].name,
//             key: key,
//         });
//     });
//     sortByAlphabet(currentSortKeys);
// }

async function editContact() {
    // await getCurrentKey();
    // let key = currentSortKeys[contactIndex].key;
    await getContacts()
    console.log("Contacts:", contacts);
    console.log("Contact Index:", contactIndex);
    let name = document.getElementById("edit-name").value;
    let email = document.getElementById("edit-email").value;
    let phone = document.getElementById("edit-phone").value;
    let color = document.getElementById("edit-color").value;
    await putData(
        (path = `/contacts/${contacts[contactIndex].key}`),
        (data = {
            color: color,
            name: name,
            email: email,
            phone: phone,
        })
    );
    showEditedContact(contacts, name, email, phone);
}

async function showEditedContact(contacts, name, email, phone) {
    saveToLocalStorage("contacts", contacts);
    if (screenMode == "mobile") {
        // await initContacts();
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

// async function deleteContact() {
//     await getCurrentKey();
//     await getTasks();
//     let key = currentSortKeys[contactIndex].key;
//     await deleteData((path = `/contacts/${key}`), (data = {}));
//     await updateTasksWithRemovedContact();
//     window.location.href = "contact.html";
// }

async function deleteContact() {
    await getContacts()
    await deleteData((path = `/contacts/${contacts[contactIndex].key}`), (data = {}));
    window.location.href = "contact.html";
}

async function updateTasksWithRemovedContact() {
    let allTasks = await getData((path = "/tasks"));
    let keyOfTask = Object.keys(allTasks);
    let contactToDelete = contactsArray[contactIndex];
    for (let i = 0; i < tasksArray.length; i++) {
        const task = tasksArray[i];
        if (task.assignedTo) {
            await checkAndRemoveAssignedContact(task, contactToDelete, keyOfTask[i], allTasks);
        }
    }
}

async function checkAndRemoveAssignedContact(task, contactToDelete, taskKey, allTasks) {
    for (let j = 0; j < task.assignedTo.length; j++) {
        const assignedContact = task.assignedTo[j];
        if (assignedContact.name === contactToDelete.name) {
            task.assignedTo.splice(j, 1);
            await putData(
                (path = `/tasks/${taskKey}`),
                (data = {
                    ...allTasks[taskKey],
                    assignedTo: task.assignedTo,
                })
            );
            j--;
        }
    }
}
