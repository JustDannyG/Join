//Templates for Contact-Details

function contactCirleHTML(detail) {
    return `
    <div class="current-contact-circle center" style="background:${detail.color}">${createInititals(detail.name)}</div>
      <h2>${detail.name}</h2>
    `
}

function contactInformationsHTML(detail) {
    return `
    <h3>Contact Information</h3>
      <p class="bold">Email</p>
      <a href="mailto:${detail.email}">${detail.email}</a>
      <p class="bold">Phone</p>
      <a href="tel:${detail.phone}">${detail.phone}</a>
    `
}

//Templates for Contact List

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

//Templates for Add Task

function contactInDropDownHTML(i, contact, initials) {
    return `
            <li id="contact${i}" onclick="selectContact(${i},'${contact.name}'); stopEventBubbling(event)">
                <div class="d-flex contact-row">
                    <div class="center gap">
                        <div class="contact center" style="background-color:${contact.color}">${initials}</div>
                        <span>${contact.name}</span>
                    </div>
                    <div class="container">
                        <input type="checkbox" id="checkbox${i}" onclick="selectContact('${contact.name}'); stopEventBubbling(event)">
                        <span class="checkmark"></span>
                    </div>
                </div>
            </li>`
}

function contactSelectionCircleHTML(contact, initials) {
    return `  <div class="contact center " style="background-color:${contact.color}">${initials}</div>`

}