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

function contactInDropDownHTML(contact, initials) {
    return /*html*/ `
            <li id="contact${contact.id}" onclick="selectContact(${contact.id}); stopEventBubbling(event)">
                <div class="d-flex contact-row">
                    <div class="center gap">
                        <div class="contact center" style="background-color:${contact.color}">${initials}</div>
                        <span>${contact.name}</span>
                    </div>
                    <div class="container">
                        <input type="checkbox" id="checkbox${contact.id}" onclick="selectContact('${contact.name}'); stopEventBubbling(event)">
                        <span class="checkmark"></span>
                    </div>
                </div>
            </li>`;
}

function contactSelectionCircleHTML(contact, initials) {
    return /*html*/ `<div class="contact center " style="background-color:${contact.color}">${initials}</div>`;
}


////////////////////////////////////////////
/////  Board  -  Tasks  Templates     //////
///////////////////////////////////////////

function generateTaskHTML(task, index, className) {
    return `<div id="${task.id}" draggable="true" dragleave="animationOndrag(${task.id})"  ondragstart="startDragging(${task.id})"  onclick="classChangeAction('overlaver','overlaver-active','add'); openTask(${task.id})" class="task">
              <div class="task-category ${className}">${task.categoryText}</div>
              <h4 class="task-title">${task.title}</h4>
              <div class="task-description">${task.description}</div>
              <div class="d-flex task-amount-container">
                  <div id="${task.category}progress-bar${index}" class="progress-bar d-none">
                      <div class="progress" id="${task.category}-progress${index}"></div>
                  </div>
                  <div id="${task.category}-amount${index}" class="task-amount"></div>
              </div>
              <div class="d-flex task-footer">
                  <div id="${task.category}contatcs-container${index}" class="d-flex contatcs-container"></div>
                  <div id="${task.category}contatcs-container${index}num" class="d-flex contatcs-container"></div>
                  <img id="${task.category}prio-icon${index}" class="prio-icon" src="" alt="">
              </div> `;
}


function generateNoTaskHTML(noTask) {
    return /*html*/ `<div class="no-task"> No task in ${noTask}</div> `;
}


////////////////////////////////////////////////////
/////     Add-Task - Subtask     Templates    /////
//////////////////////////////////////////////////

function subtaskBtnHTML() {
    return `
        <div class="subtasks-btns">

         <div class="svg-btn" onclick="clearSubtask()"> 
            <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M6.24959 6.99984L11.4926 12.2428M1.00659 12.2428L6.24959 6.99984L1.00659 12.2428ZM11.4926 1.75684L6.24859 6.99984L11.4926 1.75684ZM6.24859 6.99984L1.00659 1.75684L6.24859 6.99984Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
           </svg>
        </div>

           <span class="break-line"></span>

           <div class="svg-btn" onclick="addSubtask()">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M5.79923 9.15L14.2742 0.675C14.4742 0.475 14.7117 0.375 14.9867 0.375C15.2617 0.375 15.4992 0.475 15.6992 0.675C15.8992 0.875 15.9992 1.1125 15.9992 1.3875C15.9992 1.6625 15.8992 1.9 15.6992 2.1L6.49923 11.3C6.29923 11.5 6.0659 11.6 5.79923 11.6C5.53256 11.6 5.29923 11.5 5.09923 11.3L0.79923 7C0.59923 6.8 0.503397 6.5625 0.51173 6.2875C0.520064 6.0125 0.62423 5.775 0.82423 5.575C1.02423 5.375 1.26173 5.275 1.53673 5.275C1.81173 5.275 2.04923 5.375 2.24923 5.575L5.79923 9.15Z" fill="black"/>
           </svg>
        </div>
          
        </div>
`
}


function subtaskTaskHTML(subtask, i) {
    return `
        <div id="subtask${i}" class="subtask">
           <div class="subtask-text" onclick="editWord(${i})">
             <p>${subtask.sub}</p> 
             <img src="./assets/icons/edit.png" alt="">
             
           </div>
           <span class="break-line"></span>
            <img class="" src="./assets/icons/delete.png" alt="" onclick="deleteSubtask(${i})">
        </div>
        `;
}


function editIconsHTML(i) {
    return `<div class="word-item">
                <input type="text" id="editInput${i}" value="${currentSubtasks[i].sub}">
                <button onclick="deleteSubtask(${i})"><img src="./assets/icons/delete.png" alt=""></button>
                <span class="break-line"></span>
                <svg onclick="saveWord(${i})" width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.79911 9.15L14.2741 0.675C14.4741 0.475 14.7116 0.375 14.9866 0.375C15.2616 0.375 15.4991 0.475 15.6991 0.675C15.8991 0.875 15.9991 1.1125 15.9991 1.3875C15.9991 1.6625 15.8991 1.9 15.6991 2.1L6.49911 11.3C6.29911 11.5 6.06578 11.6 5.79911 11.6C5.53245 11.6 5.29911 11.5 5.09911 11.3L0.799113 7C0.599113 6.8 0.50328 6.5625 0.511613 6.2875C0.519946 6.0125 0.624113 5.775 0.824113 5.575C1.02411 5.375 1.26161 5.275 1.53661 5.275C1.81161 5.275 2.04911 5.375 2.24911 5.575L5.79911 9.15Z" fill="black"/>
                 </svg>
                
            </div>`;
}


function generateAssignedToOerlayLiHTML(a, i) {
    return `
                        <li>
                            <div class="assigned-to-contact d-flex">
                                <div title="${a.name}" class="initials-circle center" style="background-color:${a.color}">${createInititals(a.name)}</div>
                                <span class="name">${a.name}</span>
                            </div>
                        </li>`
}

//////////////////////////////////////////////////
///// mobile and desktop header and sidebar //////
//////////////////////////////////////////////////

function mobileHeader() {
    return `<header class="d-flex header-mobile">
      <img class="logo-mobile" src="./assets/icons/logo-dark.svg" alt="Join Logo" />
      <div onclick="classChangeAction('menu', 'menu-active', 'toggle'), stopEventBubbling(event)" id="current-user-header" class="current-user-header center">T</div>
      <div id="menu" class="column menu">
        <a href="./help.html">Help</a>
        <a href="./legal-notice.html">Legal Notice</a>
        <a href="./privacy-policy.html">Privacy Policy</a>
        <a href="#">Log out</a>
      </div>
    </header>`;
}


function desktopHeader() {
    return `
        <header class="header-desktop">
        <p class="header-title">Kanban Project Management Tool</p>
        <div class="header-actions">
            <a href="help.html"> <img class="help-icon" src="./assets/icons/help-icon.png" alt="Help"></a>
            <div onclick="classChangeAction('user-menu', 'd-none', 'toggle'); stopEventBubbling(event)" id="header-initials" class="header-initials-btn">
                SM
            </div>
        </div>
        
       <nav id="user-menu" class="user-menu d-none">
        <a href="legal-notice.html">Legal Notice</a>
        <a href="privacy-policy.html">Privacy Policy</a>
        <a href="#">Log out</a>
       </nav>

    </header>`;
}


function mobileSidebar() {
    return `<aside class="d-flex sidebar-mobile">
      <a class="center column nav-link-mobile" href="./summary.html"><img src="./assets/icons/summary-icon.png"
          alt="Summary" />Summary</a>
      <a class="center column nav-link-mobile" href="./board.html"><img src="./assets/icons/board-icon.png"
          alt="Board" />Board</a>
      <a class="center column nav-link-mobile" href="./add-task.html"><img src="./assets/icons/add-task-icon.png"
          alt="Add Task" />Add Task</a>
      <a class="center column nav-link-mobile" href="./contact.html"><img src="./assets/icons/contacts-icon.png"
          alt="Contacts" />Contacts</a>
    </aside>`;
}


function desktopSidebar() {
    return `<aside class="sidebar-desktop">
        <img class="sidebar-logo-desktop" src="./assets/icons/join-logo-light.png" alt="">
        <nav class="sidebar-nav">
            <a class="nav-link-desktop" href="summary.html"><img src="./assets/icons/summary-icon.png" alt=""> Summary</a>
            <a class="nav-link-desktop" href="add-task.html"><img src="./assets/icons/add-task-icon.png" alt=""> Add Task</a>
            <a class="nav-link-desktop" href="board.html"><img src="./assets/icons/board-icon.png" alt=""> Board</a>
            <a class="nav-link-desktop" href="contact.html"><img src="./assets/icons/contacts-icon.png" alt=""> Contacts</a>
        </nav>
        <div class="sidebar-info">
            <a href="privacy-policy.html">Privacy Policy</a>
            <a href="legal-notice.html">Legal notice</a>
        </div>
    </aside>`;
}


function editBoardTaskHTML() {
    return ` <div class="overlay-edit-task column" onclick="closeDropdown(); stopEventBubbling(event)">
    <div class="button-row">
             <button class="btn close-btn" onclick="classChangeAction('overlaver', 'overlaver-active', 'remove'); stopEventBubbling(event);"><img class="icon" src="./assets/icons/close-icon-dark.png" alt=""></button>
    </div>
   
            <form id="edit-task-form" class="column edit-form" onsubmit="submitEdit(); return false;">

            <div class="column">
                <label for="title">Title</label>
                <input class="input" id="title" type="text" placeholder="Enter a title">
            </div>

            <div class="column mt-16">
                <label for="description">Description</label>
                <textarea id="description" class="textarea" name="description" placeholder="Enter a Description"></textarea>
            </div>

            <div class="column mt-16">
                <label for="assign-to-dropdown">Assigned to</label>
                <div id="dropdown" class="drop-down d-flex">
                    <input id="assign-to-dropdown" class="input" onkeyup="filter('assign-to-dropdown')" onclick="handleInputClick(event)" value="Select contacts to assign">
                    <button class="btn dropdown-btn" onclick="handleDropdownButtonClick(event)" type="button">
                                <img id="drop-down-icon1" src="./assets/icons/arrow-drop-down.png">
                            </button>
                </div>
                <ul id="assign-to-dropdown-contacts" class="dropdown-options"></ul>
            </div>

            <div id="selected-contacts-container" class="d-flex selectet-contacts-container"></div>

            <div class="column mt-16">
                <label for="date">Due date</label>
                <input id="date" class="input" required type="date">
            </div>

            <div class="prio mt-16">
                <span>Prio</span>
                <div class="d-flex row">
                    <button id="urgent-btn" class=" btn prio-btn" type="button" onclick="addPrio('urgent'), stopEventBubbling(event)">Urgent<img id="prio-icon-urgent"
                                    src="./assets/icons/prio-urgent-icon.png"></button>
                    <button id="medium-btn" class="btn prio-btn" type="button" onclick="addPrio('medium')">Medium<img
                                    id="prio-icon-medium" src="./assets/icons/prio-medium-icon.png"></button>
                    <button id="low-btn" class="btn prio-btn" type="button" onclick="addPrio('low')">Low<img
                                    id="prio-icon-low" src="./assets/icons/prio-low-icon.png"></button>
                </div>
            </div>

            <div class="column mt-16">
                <label for="selected-category">Category</label>
                <select id="selected-category" class="select-category">
                            <option value="">Select task category:</option>
                            <option value="Technical Task">Technical Task</option>
                            <option value="User Story">User Story</option>
                        </select>
            </div>

            <div class="form-field column mt-16">
                <label for="subtasks-input">Subtasks</label>
                <div class="add-task-input">
                    <input id="subtasks-input" type="subtasks" name="subtasks" onkeyup="subtaskInputBtn()" placeholder="Add new subtask" />
                    <div class="add-subtask-btn" id="add-subtask-btn">
                        <img src="./assets/icons/add -subtasks.png" alt="" onclick="setInputFocus()" />
                    </div>
                </div>
            </div>

           <div id="subtasks-container" class="subtasks-container"></div>

        </form>

        <button class="btn submit submit-btn" type="submit" form="edit-task-form">Ok <img src="./assets/icons/check.png"></button>
    
        </div>`
}

function taskBoardOverlay(id) {
    return `<div class="overlay-task column">
            <div class="task-header d-flex">
                <span id="task-category-overlay">User Story</span>
                <button class="btn" onclick="classChangeAction('overlaver','overlaver-active','remove')">
                    <img class="icon" src="./assets/icons/close-icon-dark.png" alt="">
                </button>
            </div>
            <span id="task-title-overlay" class="task-title"></span>
            <span id="task-discription-overlay" class="discription"></span>
            <div class="task-details-container">
                <div class="info">
                    <span class="info-title">Due date:</span>
                    <span id="task-date-overlay" class="info-value"></span>
                </div>
                <div class="info">
                    <span class="info-title">Priority:</span>
                    <div class="info-value">
                        <span id="task-prio-overlay"></span>
                        <img id="prio-icon-overlay" class="prio-icon" src="" alt="">
                    </div>
                </div>
                <div class="assigned-to-container">Assigned To:
                    <ul id="assigned-to-list">

                    </ul>

                    <div class="task-details"></div>


                </div>
                <div class="subtask">Subtask
                    <ul id="subtask-overlay">

                    </ul>
                </div>
            </div>
            <div class="edit-task-container d-flex">
                <button class="btn">
                    <img class="icon" src="./assets/icons/delete.png" alt="">Delete</button>
                <div class="divider"></div>
                <button onclick="showEditTaskValues(); stopEventBubbling(event);" class="btn">
                    <img class="icon" src="./assets/icons/edit.png" alt="">Edit</button>
            </div>
        </div>`;
}