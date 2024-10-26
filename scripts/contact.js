let contactIndex = getFromLocalStorage("currentDetails");
let contactsArray = getFromLocalStorage("contacts");

////////////////////
///    Start   ////
///////////////////

/**
 * Initializes the contact list by fetching contacts and rendering them.
 */
async function initContacts() {
    await getContacts();
    await renderContacts();
}

/////////////////////////////////
///    Render Contact List   ////
////////////////////////////////

/**
 * Renders the list of contacts in the HTML container, including the user's own contact and their other contacts.
 */
async function renderContacts() {
    let containerRef = document.getElementById("contacts-container");
    containerRef.innerHTML = "";
    let firstLetter = "";
    if (user !== "Guest") {
        containerRef.innerHTML = firstLetterHtml("My User");
        containerRef.innerHTML += ownContactListHtml(await ownContact());
        containerRef.innerHTML += firstLetterHtml("Contacts");
    }

    contacts.forEach((contact, i) => {
        if (firstLetter !== contact.name.charAt(0).toUpperCase()) {
            firstLetter = contact.name.charAt(0).toUpperCase();
            containerRef.innerHTML += firstLetterHtml(firstLetter);
        }
        containerRef.innerHTML += contactListHtml(contact, i);
    });
}

/**
 * Opens the details of a selected contact.
 *
 * @param {number} index - The index of the contact in the contacts array.
 */
async function openContact(index) {
    await initContacts();
    saveToLocalStorage("currentDetails", index);
    saveToLocalStorage("contacts", contacts);
    if (screenMode == "mobile") {
        window.location.href = "contact-details.html";
    } else if (screenMode == "desktop") {
        contactIndex = index;
        contactsArray = contacts;
        classChangeAction("dialog-add-contact", "hide-overlay", "add");
        await showContact();
        highlightContact(index);
    }
}

function highlightContact(i) {
    let liRef = Array.from(document.getElementsByClassName("contact-list"));
    liRef.forEach((element) => {
        element.classList.remove("contact-highlight");
    });
    document.getElementById(`contact-list${i}`).classList.add("contact-highlight");
    document.getElementById("ownContact").classList.remove("contact-highlight");
}
/**
 * Opens the current user's own contact details.
 */
async function openOwnContact() {
    if (screenMode == "mobile") {
        saveToLocalStorage("contacts", "user");
        window.location.href = "contact-details.html";
    } else if (screenMode == "desktop") {
        classChangeAction("dialog-add-contact", "hide-overlay", "add");
        await showOwnContact();
        highlightOwnContact();
    }
}

function highlightOwnContact() {
    let liRef = Array.from(document.getElementsByClassName("contact-list"));
    liRef.forEach((element) => {
        element.classList.remove("contact-highlight");
    });
    document.getElementById("ownContact").classList.add("contact-highlight");
}

/**
 * Displays the current user's own contact details.
 */
async function showOwnContact() {
    let currentContact = document.getElementById("current-contact");
    currentContact.innerHTML = contactOwnCirleHTML(await ownContact());
}

/**
 * Changes the edit buttons for the user's own contact in the UI.
 */
function changeOwnEditButtons() {
    document.getElementById("edit-contact").innerHTML = `
 <div class="edit-contact d-flex " onclick="toggleOwnOverlayDisplay()">
            <img src="./assets/icons/edit.png " alt="Edit Button" /> Edit
        </div>


`;
}

/////////////////////////////////////////////////
///   LocalStorage - Save / Load Functions   ////
/////////////////////////////////////////////////

/**
 * Saves a value to localStorage.
 *
 * @param {string} key - The key to store the value under.
 * @param {any} value - The value to be stored.
 */
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Retrieves a value from localStorage.
 *
 * @param {string} key - The key of the value to retrieve.
 * @returns {any|null} - The value stored under the key, or null if not found.
 */
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

/**
 * Adds a new contact by collecting input data and saving it to the backend.
 */
async function addContact() {
    let nameRef = document.getElementById("add-name-input");
    let emailRef = document.getElementById("add-mail-input");
    let phoneNumRef = document.getElementById("add-phone-input");
    let inputs = getInputs(nameRef, emailRef, phoneNumRef);
    if (!formValidation(nameRef.value, emailRef.value, phoneNumRef.value, "add")) {
        return;
    }
    document.getElementById("submit-add-contact-btn").setAttribute("disabled", true);
    clearInput(nameRef);
    clearInput(emailRef);
    clearInput(phoneNumRef);

    await postData((path = "contacts"), (data = { name: `${inputs.name}`, email: `${inputs.email}`, phone: `${inputs.phone}`, color: `${inputs.color}` }));
    const contactIndex = await findContact(inputs.name, inputs.email, inputs.phone);
    console.log(contactIndex);
    toogleDialog("dialog-add-succes", contactIndex);
}

/**
 * Retrieves and returns user input from the contact form.
 *
 * @param {HTMLElement} nameRef - The input element for the name.
 * @param {HTMLElement} emailRef - The input element for the email.
 * @param {HTMLElement} phoneNumRef - The input element for the phone number.
 */
function getInputs(nameRef, emailRef, phoneNumRef) {
    const name = nameRef.value;
    const email = emailRef.value;
    const phone = phoneNumRef.value;
    const color = randomColor();
    return { name, email, phone, color };
}

/**
 * Toggles the visibility of a dialog and opens the specified contact.
 *
 * @param {string} id - The ID of the dialog to toggle.
 * @param {number} index - The index of the contact to open.
 */
function toogleDialog(id, index) {
    document.getElementById(id).classList.add("dialog-active");

    setTimeout(function () {
        document.getElementById(id).classList.remove("dialog-active");
        buttonRef = document.getElementById("submit-add-contact-btn").removeAttribute("disabled");
        openContact(index);
    }, 2000);
}

/**
 * Finds a contact based on the name, email, and phone.
 *
 * @param {string} name - The contact's name.
 * @param {string} email - The contact's email.
 * @param {string} phone - The contact's phone number.
 */
async function findContact(name, email, phone) {
    await getContacts();
    return contacts.findIndex((e) => e.name == name && e.email == email && e.phone == phone);
}

/**
 * Clears the input fields for adding a contact.
 */
function clearAddInputs() {
    document.getElementById("add-name-input").value = "";
    document.getElementById("add-mail-input").value = "";
    document.getElementById("add-phone-input").value = "";
}

///////////////////////////////
//   Show Contact Details   ///
///////////////////////////////

/**
 * Displays the details of the currently selected contact.
 */
async function showContact() {
    let currentContact = document.getElementById("current-contact");
    if (contactsArray == "user") {
        currentContact.innerHTML = contactOwnCirleHTML(await ownContact());
        changeOwnEditButtons();
    } else {
        let detail = contactsArray[contactIndex];
        currentContact.innerHTML = contactCirleHTML(detail);
    }
}

/**
 * Toggles the display of the edit overlay.
 */
function toggleOverlayDisplay() {
    let overlay = document.getElementById("edit-overlay-bg");
    overlay.classList.toggle("hide-overlay");
    if (screenMode == "desktop") {
        document.getElementById("edit-action-btns").innerHTML = `
                    <button class="edit-delete-btn center" onclick="deleteContact();return false;">Delete</button>
                    <button class="edit-save-btn center">Save <img src="./assets/icons/check.png" alt="" /></button>`;
    }
    editDetails();
}

///////////////////////////////
//   Own User Details   ///
///////////////////////////////

/**
 * Toggles the display of the user's own contact edit overlay.
 */
function toggleOwnOverlayDisplay() {
    let overlay = document.getElementById("edit-overlay-bg");
    overlay.classList.toggle("hide-overlay");
    document.getElementById("edit-action-btns").innerHTML = `
    <button class="edit-delete-btn center" onclick="deletePopUp(); return false">Delete</button>
    <button class="edit-save-btn center" onclick="editOwnUser(); return false">Save <img src="./assets/icons/check.png" alt="" /></button>`;
    editOwnDetails();
}

/**
 * Populates the edit form with the user's own contact details.
 */
async function editOwnDetails() {
    let currentDetail = await ownContact();
    document.getElementById("edit-name").value = currentDetail.name;
    document.getElementById("edit-email").value = currentDetail.email;
    document.getElementById("edit-phone").value = currentDetail.phone;
    document.getElementById("edit-initals-container").innerHTML = `
    <span style="background-color:${currentDetail.color}" class="edit-initals center">${createInititals(currentDetail.name)}
        <details class="change-color">
           <summary>
              Change Color
           </summary>
           <input id="edit-color" type="color" value="${currentDetail.color}">
       </details>    
                    </span>
    `;
}

/**
 * Saves the user's own contact details after editing.
 */
async function editOwnUser() {
    let name = document.getElementById("edit-name").value;
    let email = document.getElementById("edit-email").value;
    let phone = document.getElementById("edit-phone").value;
    let color = document.getElementById("edit-color").value;
    let pw = await getData(`users/${userId}/password`);

    await putData(
        (path = `/users/${userId}`),
        (data = {
            color: color,
            name: name,
            email: email,
            phone: phone,
            password: pw,
        })
    );
    if (screenMode == "desktop") {
        await initContacts();
    }
    showOwnContact();
    toggleOwnOverlayDisplay();
}

/**
 * Displays a delete confirmation popup for the user.
 */
function deletePopUp() {
    document.getElementById("delete-user-popup").classList.toggle("d-none");
}

/**
 * Deletes the user's account and logs them out.
 */
async function deleteOwnUser() {
    await deleteData((path = `/users/${userId}`));
    logOut();
}

///////////////////////////////////////
//  Edit Contact Details Functions  ///
//////////////////////////////////////

/**
 * Populates the edit form with the currently selected contact's details.
 */
function editDetails() {
    let currentDetail = contactsArray[contactIndex];
    document.getElementById("edit-name").value = currentDetail.name;
    document.getElementById("edit-email").value = currentDetail.email;
    document.getElementById("edit-phone").value = currentDetail.phone;
    document.getElementById("edit-initals-container").innerHTML = `
    <span style="background-color:${currentDetail.color}" class="edit-initals center">${createInititals(currentDetail.name)}
                         <details class="change-color">
           <summary>
              Change Color
           </summary>
           <input id="edit-color" type="color" value="${currentDetail.color}">
       </details>    
                    </span>
    `;
}

/**
 * Saves the edited contact details to the backend.
 */
async function editContact() {
    await getContacts();
    let name = document.getElementById("edit-name").value;
    let email = document.getElementById("edit-email").value;
    let phone = document.getElementById("edit-phone").value;
    let color = document.getElementById("edit-color").value;
    if (!formValidation(name, email, phone, "edit")) {
        return;
    }
    await putData(
        (path = `/contacts/${contacts[contactIndex].key}`),
        (data = {
            color: color,
            name: name,
            email: email,
            phone: phone,
        })
    );
    await getContacts();
    showEditedContact(contacts, name, email, phone);
}

function formValidation(name, email, phone, mode) {
    let isValid = true;
    let nameError = document.getElementById(`name_error_${mode}`);
    let emailError = document.getElementById(`email_error_${mode}`);
    let phoneError = document.getElementById(`phone_error_${mode}`);
    nameError.innerHTML = "";
    emailError.innerHTML = "";
    phoneError.innerHTML = "";

    nameError.classList.remove("error-message");
    emailError.classList.remove("error-message");
    phoneError.classList.remove("error-message");

    if (!name || name.trim() === "") {
        nameError.innerHTML = "Name is required";
        isValid = false;
    } else if (name[0] !== name[0].toUpperCase()) {
        nameError.innerHTML = "Name should start with a capital letter";
        isValid = false;
    }

    if (!email || email.trim() === "") {
        emailError.innerHTML = "Email is required";
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.innerHTML = "Please enter a valid email";
        isValid = false;
    }

    if (!phone || phone.trim() === "") {
        phoneError.innerHTML = "Phone number is required";
        isValid = false;
    } else if (!/^\d+$/.test(phone)) {
        phoneError.innerHTML = "Phone number should contain only numbers";
        isValid = false;
    }

    nameError.classList.add("error-message");
    emailError.classList.add("error-message");
    phoneError.classList.add("error-message");

    return isValid;
}

/**
 * Displays the edited contact's details.
 *
 * @param {Array} contacts - The array of contact objects.
 * @param {string} name - The name of the contact.
 * @param {string} email - The email of the contact.
 * @param {string} phone - The phone number of the contact.
 */
async function showEditedContact(contacts, name, email, phone) {
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

/**
 * Deletes the selected contact and removes it from the backend.
 */
async function deleteContact() {
    await getContacts();
    await deleteTaskContact(contacts[contactIndex].key);
    await deleteData((path = `/contacts/${contacts[contactIndex].key}`), (data = {}));
    if (screenMode == "mobile") {
        window.location.href = "contact.html";
    } else if (screenMode == "desktop") {
        document.getElementById("current-contact").innerHTML = "";
        await initContacts();
    }
}

/**
 * Deletes a contact from all tasks where it has been assigned.
 *
 * This function fetches all tasks from the server, iterates over each task,
 * and checks if the contact is assigned to that task. If the contact is found,
 * it is removed from the task's assigned contacts. The updated task is then
 * sent back to the server.
 *
 * @param {string} deleteKey - The unique key of the contact to be deleted from the assigned tasks.
 * @returns {Promise<void>} - A promise that resolves once the contact has been removed from all relevant tasks.
 */
async function deleteTaskContact(deleteKey) {
    let response = await getData("/tasks"); // Warten auf das Auflösen der Daten
    let keyOfTask = Object.keys(response); // Extrahiere die Keys aus den Tasks

    for (let i = 0; i < keyOfTask.length; i++) {
        const key = keyOfTask[i];
        let task = response[key];
        if (task.assignedTo) {
            let assignedKey = Object.keys(task.assignedTo);

            let assignedTo = [];
            for (let j = 0; j < assignedKey.length; j++) {
                const assignKey = assignedKey[j];
                let assignContact = task.assignedTo[assignKey];

                if (assignContact.key !== deleteKey) {
                    assignedTo.push(assignContact);
                }
            }
            await putData((path = `/tasks/${key}/assignedTo`), assignedTo);
        }
    }
}
