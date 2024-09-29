//Templates for Contact-Details

function contactCirleHTML(detail) {
    return /*html*/ `
    <div class="current-contact-circle center" style="background:${detail.color}">
        ${createInititals(detail.name)}
    </div>
      <h2>${detail.name}</h2>
    `;
}

function contactInformationsHTML(detail) {
    return /*html*/ `
    <h3>Contact Information</h3>
      <p class="bold">Email</p>
      <a href="mailto:${detail.email}">${detail.email}</a>
      <p class="bold">Phone</p>
      <a href="tel:${detail.phone}">${detail.phone}</a>
    `;
}

//Templates for Contact List

function firstLetterHtml(firstLetter) {
    return /*html*/ `<div class="contacts-first-letter">${firstLetter}</div>`;
}

function contactListHtml(contact, i) {
    return /*html*/ `<div onclick="openContact(${i})" class="contact-list d-flex">
      <span class="contact-initials center" style="background:${contact.color
        }">${createInititals(contact.name)}</span>
      <div>
        <p>${contact.name}</p>
        <a href="#">${contact.email}</a>
      </div>
    </div>`;
}

//Templates for Add Task

function contactInDropDownHTML(i, contact, initials) {
    return /*html*/`
            <li id="contact${i}" onclick="selectContact(${i}); stopEventBubbling(event)">
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
            </li>`;
}

function contactSelectionCircleHTML(contact, initials) {
    return /*html*/ `<div class="contact center " style="background-color:${contact.color}">${initials}</div>`;
}

//Templates for Tasks

function generateTaskHTML(task, index, className) {
    return `<div draggable="true" ondragstart="startDragging(${task.id})" class="task">
              <div class="task-category ${className}">${task.categoryText}</div>
              <h4 class="task-title">${task.title}</h4>
              <div class="task-description">${task.description}</div>
              <div class="d-flex task-amount-container">
                  <div class="progress-bar">
                      <div class="progress"></div>
                  </div>
                  <div class="task-amount">1/2 Subtask</div>
              </div>
              <div class="d-flex task-footer">
                  <div id="${task.category}contatcs-container${index}" class="d-flex contatcs-container"></div>
                  <div id="${task.category}contatcs-container${index}num" class="d-flex contatcs-container"></div>
                  <img id="${task.category}prio-icon${index}" class="prio-icon" src="" alt="">
              </div> `;
}

function generateNoTaskHTML() {
    return /*html*/ `<div class="no-task"> No task To do</div> `;
}