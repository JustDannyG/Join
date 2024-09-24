let currentSortKeys = [];


function showContact() {
    let currentContact = document.getElementById('current-contact');
    let detailsContainer = document.getElementById('details');
    let detail = getCurrentContactDetail();

    currentContact.innerHTML = contactCirleHTML(detail);
    detailsContainer.innerHTML = contactInformationsHTML(detail);
}


function getCurrentContactDetail() {
    let contactsArray = getFromLocalStorage('contacts');
    return contactsArray[currentContactDetails];
}


function toggleOverlayDisplay() {
    let overlay = document.getElementById('edit-overlay-bg');
    overlay.classList.toggle('hide-overlay');
    editDetails();
}


function editDetails() {
    let currentDetail = getCurrentContactDetail();
    document.getElementById('edit-name').value = currentDetail.name;
    document.getElementById('edit-email').value = currentDetail.email;
    document.getElementById('edit-phone').value = currentDetail.phone;

}



async function getCurrentKey() {
  let allContacts = await getData(path = "/contacts");
  let contactKeys = Object.keys(allContacts)
  contactKeys.forEach((key, i) => {
    currentSortKeys.push({
      'name': allContacts[key].name,
      'key': key
    })
  });
  sortByAlphabet(currentSortKeys);
  editContact()
}


function editContact() {

  let key = currentSortKeys[currentContactDetails].key;
  let name = document.getElementById('edit-name').value;
  let email = document.getElementById('edit-email').value;
  let phone = document.getElementById('edit-phone').value;
  let contactsArray = getFromLocalStorage('contacts');
  putData(path = `/contacts/${key}`, data = {
    'color': contactsArray[currentContactDetails].color,
    'name': name,
    'email': email,
    'phone': phone
  })
}

function deleteContact() {
  let key = currentSortKeys[currentContactDetails].key;
  deleteData(path=`/contacts/${key}`, data={})
}