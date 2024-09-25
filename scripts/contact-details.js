let currentSortKeys = [];
let contactIndex = getFromLocalStorage('currentDetails');
let contactsArray = getFromLocalStorage('contacts');



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
    let contactsArray = getFromLocalStorage('contacts');
    await putData(path = `/contacts/${key}`, data = {
        'color': contactsArray[currentContactDetails].color,
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