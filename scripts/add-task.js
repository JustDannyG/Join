let currentSubtasks = [];


function addPrioColorToUrgent() {
    document.getElementById("urgent-btn").classList.add("urgent")
    document.getElementById("medium-btn").classList.remove("medium")
    document.getElementById("low-btn").classList.remove("low")
    document.getElementById("prio-icon-urgent").src = "./assets/icons/prio-urgent-icon-active.png"
    document.getElementById("prio-icon-medium").src = "./assets/icons/prio-medium-icon.png"
    document.getElementById("prio-icon-low").src = "./assets/icons/prio-low-icon.png"
}

function addPrioColorToMedium() {
    document.getElementById("medium-btn").classList.add("medium")
    document.getElementById("urgent-btn").classList.remove("urgent")
    document.getElementById("low-btn").classList.remove("low")
    document.getElementById("prio-icon-urgent").src = "./assets/icons/prio-urgent-icon.png"
    document.getElementById("prio-icon-medium").src = "./assets/icons/prio-medium-icon-active.png"
    document.getElementById("prio-icon-low").src = "./assets/icons/prio-low-icon.png"
}

function addPrioColorToLow() {
    document.getElementById("low-btn").classList.add("low")
    document.getElementById("urgent-btn").classList.remove("urgent")
    document.getElementById("medium-btn").classList.remove("medium")
    document.getElementById("prio-icon-urgent").src = "./assets/icons/prio-urgent-icon.png"
    document.getElementById("prio-icon-medium").src = "./assets/icons/prio-medium-icon.png"
    document.getElementById("prio-icon-low").src = "./assets/icons/prio-low-icon-active.png"
}


function toggleDropdown(id, iconId) {
    const dropdown = document.getElementById(id);
    const dropdownIcon = document.getElementById(iconId);
    dropdown.classList.add("show-dropdown");

    if (dropdown.classList.contains("show-dropdown")) {
        dropdownIcon.style.transform = 'rotate(180deg)';
    } else {
        dropdownIcon.style.transform = 'rotate(0deg)';
    }
}

function openDropdown(id, iconId) {
    const dropdown = document.getElementById(id);
    const dropdownIcon = document.getElementById(iconId);
    dropdown.classList.add("show-dropdown");
    dropdownIcon.style.transform = 'rotate(180deg)';

}

function closeDropdown(id, iconId) {
    const dropdown = document.getElementById(id);
    const dropdownIcon = document.getElementById(iconId);

    dropdown.classList.remove("show-dropdown");
    dropdownIcon.style.transform = 'rotate(0deg)';
}

function selectCategory(category) {
    const selectedCategory = document.getElementById("drop-down-text");
    selectedCategory.innerHTML = category;
}


const contacts = [{ name: 'John Doe' }, { name: 'Jane Smith' }, { name: 'Emily Johnson' }];
const selectedContacts = [];

function init() {
    renderContacts(contacts);
}

function renderContacts(arr) {
    const dropDownRef = document.getElementById("assign-to-dropdown-contacts");
    clearContent(dropDownRef)
    sortByAlphabet(arr)
    getContactOfContacts(arr, dropDownRef)


}

function getContactOfContacts(arr, ref) {
    for (let i = 0; i < arr.length; i++) {
        const contact = arr[i];
        let initials = createInititals(contact.name)
        ref.innerHTML += contactInDropDownHTML(i, contact, initials);

        if (isCheckBoxChecked(contact)) {
            setSelectedDesign(i);

        } else if (!isCheckBoxChecked(contact)) {
            setUnSeletedDesign(i);
        }
    }
}

function setSelectedDesign(i) {
    let contactContainerRef = document.getElementById("contact" + i);
    let checkboxRef = document.getElementById("checkbox" + i);
    contactContainerRef.classList.add("contact-active");
    checkboxRef.setAttribute("checked", "true")
}

function setUnSeletedDesign(i) {
    let contactContainerRef = document.getElementById("contact" + i);
    contactContainerRef.classList.remove("contact-active");
}


function selectContact(name, i) {
    const index = selectedContacts.findIndex(contact => contact.name === name);
    const indexContacts = contacts.findIndex(contact => contact.name === name);
    let checkboxRef = document.getElementById("checkbox" + i);
    let contactContainerRef = document.getElementById("contact" + i);

    checkboxRef.checked = !checkboxRef.checked;

    if (index === -1) {
        removeFromContactsList(contacts, indexContacts);
        updateContactsList(selectedContacts, name, checkboxRef.checked);
        updateContactsList(contacts, name, checkboxRef.checked);

        contactContainerRef.classList.add("contact-active");
    } else if (index >= 0) {
        selectedContacts.splice(index, 1);
        removeFromContactsList(contacts, indexContacts);
        updateContactsList(contacts, name, checkboxRef.checked);

        contactContainerRef.classList.remove("contact-active");
    }
    renderSelectetContacts();
}

function updateContactsList(contactArray, name, checked) {
    contactArray.push({ "name": name, "checked": checked });
}

function removeFromContactsList(contactArray, index) {
    if (index !== -1) {
        contactArray.splice(index, 1);
    }
}

function renderSelectetContacts() {
    const containerRef = document.getElementById("selected-contacts-container");
    containerRef.innerHTML = '';
    for (let contact of selectedContacts) {
        let initials = createInititals(contact.name);
        containerRef.innerHTML += contactSelectionCircleHTML(initials);
    }
}

function handleInputClick(event) {
    clearInput(event.target);
    openDropdown('assign-to-dropdown-contacts', 'drop-down-icon1');
    stopEventBubbling(event);
}



function filter(id) {
    const inputRef = document.getElementById(id);
    const input = inputRef.value.toLowerCase();

    if (checkLengthGreater(input, 2)) {
        const result = findInput(input);
        if (result.length === 0) {
            displayNoContactFoundMessage();
        }
        renderContacts(result);
    } else {
        renderContacts(contacts);
    }
}

function displayNoContactFoundMessage() {
    const containerRef = document.getElementById("not-found-container");
    containerRef.innerHTML = 'No Contact found!';
}

function findInput(input) {
    let result = contacts.filter(contact =>
        !contact.checked && contact.name.toLowerCase().includes(input))
    return result
}

///////////////////
// Subtasks
////////////////////


function subtaskInputBtn() {
    let subtaskInput = document.getElementById('subtasks-input');
    let subtaskButtons = document.getElementById('add-subtask-btn');

    if (subtaskInput.value.length > 0) {
        subtaskButtons.innerHTML = `
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
    } else {
        subtaskButtons.innerHTML = `<img src="./assets/icons/add -subtasks.png" alt=""></img>`;
    }
}

function setInputFocus() {
    document.getElementById("subtasks-input").focus();
}


function clearSubtask() {
    let subtaskInput = document.getElementById('subtasks-input');
    subtaskInput.value = '';
    subtaskInputBtn();
}


function addSubtask() {
    let subtaskInput = document.getElementById('subtasks-input');
    currentSubtasks.push(subtaskInput.value);
    renderSubtask();
    subtaskInput.value = '';
    subtaskInputBtn();
}

function renderSubtask() {
    let subtaskContainer = document.getElementById('subtasks-container');
    subtaskContainer.innerHTML = '';
    for (let i = 0; i < currentSubtasks.length; i++) {
        const subtask = currentSubtasks[i];
        subtaskContainer.innerHTML += `
        <div id="subtask${i}" class="subtask">
           <div class="subtask-text" onclick="editWord(${i})">
             <p>${subtask}</p> 
             <img src="./assets/icons/edit.png" alt="">
             
           </div>
           <span class="break-line"></span>
            <img class="" src="./assets/icons/delete.png" alt="" onclick="deleteSubtask(${i})">
        </div>
        `;
    }
}


function editWord(index) {
    let wordListHTML = '';

    for (let i = 0; i < currentSubtasks.length; i++) {
        if (i === index) {
            wordListHTML += `<div class="word-item">
                <input type="text" id="editInput${i}" value="${currentSubtasks[i]}">
                <button onclick="deleteSubtask(${i})"><img src="./assets/icons/delete.png" alt=""></button>
                <span class="break-line"></span>
                <svg onclick="saveWord(${i})" width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.79911 9.15L14.2741 0.675C14.4741 0.475 14.7116 0.375 14.9866 0.375C15.2616 0.375 15.4991 0.475 15.6991 0.675C15.8991 0.875 15.9991 1.1125 15.9991 1.3875C15.9991 1.6625 15.8991 1.9 15.6991 2.1L6.49911 11.3C6.29911 11.5 6.06578 11.6 5.79911 11.6C5.53245 11.6 5.29911 11.5 5.09911 11.3L0.799113 7C0.599113 6.8 0.50328 6.5625 0.511613 6.2875C0.519946 6.0125 0.624113 5.775 0.824113 5.575C1.02411 5.375 1.26161 5.275 1.53661 5.275C1.81161 5.275 2.04911 5.375 2.24911 5.575L5.79911 9.15Z" fill="black"/>
                 </svg>
                
            </div>`;
        } else {
            wordListHTML += `<div class="word-item">
                <span onclick="editWord(${i})">${currentSubtasks[i]}</span>
            </div>`;
        }
    }

    document.getElementById('subtasks-container').innerHTML = wordListHTML;
}

function saveWord(index) {
    const newValue = document.getElementById(`editInput${index}`).value;
    currentSubtasks[index] = newValue;
    renderSubtask();
    return false;
}


function deleteSubtask(i) {
    currentSubtasks.splice(i, 1);
    renderSubtask();
}

