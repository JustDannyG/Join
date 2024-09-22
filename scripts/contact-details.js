
function showContact() {
    let currentContact = document.getElementById('current-contact');
    let detailsContainer = document.getElementById('details');
    let detail = getCurrentContactDetail();

    currentContact.innerHTML = `
    <div class="current-contact-circle center" style="background:${detail.color}">${createInititals(detail.name)}</div>
      <h2>${detail.name}</h2>
    `

    detailsContainer.innerHTML = `
    <h3>Contact Information</h3>
      <p class="bold">Email</p>
      <a href="mailto:${detail.email}">${detail.email}</a>
      <p class="bold">Phone</p>
      <a href="tel:${detail.phone}">${detail.phone}</a>
    `
}

function getCurrentContactDetail() {
    let contactsArray = getFromLocalStorage('contacts');
    return contactsArray[currentContactDetails];
}