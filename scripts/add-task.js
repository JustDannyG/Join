let categoryInput;
let prio = "medium";

let curretCategory = "todo";
let selectedContacts = [];
let subtaskArray = [];
let currentSubtasks = [];
let isDropdownOpen = false;

async function addTaskInit() {
    updateBtnColor();
    await getContacts();
    getSelectedContacts();
    renderContacts(selectedContacts);
    styleSelecet();
}

function addPrio(prioInput) {
    if (prioInput == prio) {
        prio = null;
    } else {
        prio = prioInput;
    }
    updateBtnColor();
}

function updateBtnColor() {
    document.getElementById("urgent-btn").classList.remove("urgent");
    document.getElementById("medium-btn").classList.remove("medium");
    document.getElementById("low-btn").classList.remove("low");

    document.getElementById("prio-icon-urgent").src = "./assets/icons/prio-urgent-icon.png";
    document.getElementById("prio-icon-medium").src = "./assets/icons/prio-medium-icon.png";
    document.getElementById("prio-icon-low").src = "./assets/icons/prio-low-icon.png";

    if (prio) {
        document.getElementById(`prio-icon-${prio}`).src = `./assets/icons/prio-${prio}-icon-active.png`;
        document.getElementById(`${prio}-btn`).classList.add(prio);
    } else return;
}

function toggleDropdown(id, iconId) {
    const dropdown = document.getElementById(id);
    const dropdownIcon = document.getElementById(iconId);
    dropdown.classList.toggle("show-dropdown");

    if (!isDropdownOpen) {
        dropdownIcon.style.transform = "rotate(180deg)";
    } else {
        dropdownIcon.style.transform = "rotate(0deg)";
        classChangeAction("dropdown", "input-active", "remove");
    }
}

function openDropdown(id, iconId) {
    const dropdown = document.getElementById(id);
    const dropdownIcon = document.getElementById(iconId);
    dropdown.classList.add("show-dropdown");
    dropdownIcon.style.transform = 'rotate(180deg)';
    isDropdownOpen = true;
    classChangeAction('dropdown', 'input-active', 'add')
}

function closeDropdown() {
    const dropdown = document.getElementById("assign-to-dropdown-contacts");
    const dropdownIcon = document.getElementById("drop-down-icon1");

    dropdown.classList.remove("show-dropdown");
    dropdownIcon.style.transform = "rotate(0deg)";
    isDropdownOpen = false;
    resetInputText();
    classChangeAction("dropdown", "input-active", "remove");
}

function handleInputClick(event) {
    clearInput(event.target);
    openDropdown("assign-to-dropdown-contacts", "drop-down-icon1");
    stopEventBubbling(event);
}

function handleDropdownButtonClick(event) {
    const input = document.getElementById("assign-to-dropdown");
    stopEventBubbling(event);
    resetInputText();
    toggleDropdown("assign-to-dropdown-contacts", "drop-down-icon1");
    classChangeAction("dropdown", "input-active", "remove");

    isDropdownOpen = !isDropdownOpen;
    if (isDropdownOpen) {
        clearInput(input);
        classChangeAction("dropdown", "input-active", "add");
    }
}

function resetInputText() {
    let inputRef = document.getElementById("assign-to-dropdown");
    inputRef.value = "Select contacts to assign";
}

function getSelectedContacts() {
    contacts.forEach((contact, i) => {
        selectedContacts.push({
            name: contact.name,
            color: contact.color,
            checked: false,
            id: i,
        });
    });
    sortByAlphabet(selectedContacts);
}

function renderContacts(arr) {
    let dropDownRef = document.getElementById("assign-to-dropdown-contacts");
    dropDownRef.innerHTML = "";
    arr.forEach((contact) => {
        dropDownRef.innerHTML += contactInDropDownHTML(contact, createInititals(contact.name));
        updateDesign(contact.id);
    });
}

function updateDesign(id) {
    let contactContainerRef = document.getElementById("contact" + id);
    let checkboxRef = document.getElementById("checkbox" + id);
    if (selectedContacts[id].checked) {
        contactContainerRef.classList.add("contact-active");
        checkboxRef.setAttribute("checked", true);
    } else if (!selectedContacts[id].checked) {
        contactContainerRef.classList.remove("contact-active");
        checkboxRef.removeAttribute("checked");
    }
}

function selectContact(id) {
    let currentContact = selectedContacts[id];
    currentContact.checked = !currentContact.checked;
    updateDesign(id);
    renderSelectedContacts();
}

function renderSelectedContacts() {
    const containerRef = document.getElementById("selected-contacts-container");
    containerRef.innerHTML = "";
    let assignedToContacts = selectedContacts.filter((c) => c.checked == true);

    for (let contact of assignedToContacts) {
        containerRef.innerHTML += contactSelectionCircleHTML(contact, createInititals(contact.name));
    }
}

function filter(id) {
    const inputRef = document.getElementById(id);
    const input = inputRef.value.toLowerCase();
    if (checkLengthGreater(input, 2)) {
        const result = findInput(input);
        if (result.length === 0) {
            displayNoContactFoundMessage();
        } else {
            renderContacts(result);
        }
    } else {
        renderContacts(selectedContacts);
    }
}

function displayNoContactFoundMessage() {
    const dropdownRef = document.getElementById("assign-to-dropdown-contacts");
    dropdownRef.innerHTML = '<li class="not-found">Nicht gefunden</li>';
}

function findInput(input) {
    let result = selectedContacts.filter((contact) => contact.name.toLowerCase().includes(input));
    return result;
}

// function findInput(input) {
//     let result = contacts.filter(contact =>
//         !contact.checked && contact.name.toLowerCase().includes(input))
//     return result
// }

///////////////////
// Subtasks
////////////////////

function subtaskInputBtn() {
    let subtaskInput = document.getElementById("subtasks-input");
    let subtaskButtons = document.getElementById("add-subtask-btn");

    if (subtaskInput.value.length > 0) {
        subtaskButtons.innerHTML = subtaskBtnHTML();
    } else {
        subtaskButtons.innerHTML = `<img src="./assets/icons/add -subtasks.png" alt=""></img>`;
    }
}

function setInputFocus() {
    document.getElementById("subtasks-input").focus();
}

function clearSubtask() {
    let subtaskInput = document.getElementById("subtasks-input");
    subtaskInput.value = "";
    subtaskInputBtn();
}

function addSubtask() {
    let subtaskInput = document.getElementById("subtasks-input");
    currentSubtasks.push({
        sub: subtaskInput.value,
        checked: false,
    });
    renderSubtask();
    subtaskInput.value = "";
    subtaskInputBtn();
}

function renderSubtask() {
    let subtaskContainer = document.getElementById("subtasks-container");
    subtaskContainer.innerHTML = "";
    for (let i = 0; i < currentSubtasks.length; i++) {
        const subtask = currentSubtasks[i];
        subtaskContainer.innerHTML += subtaskTaskHTML(subtask, i);
    }
}

function editWord(index) {
    let wordListHTML = "";
    for (let i = 0; i < currentSubtasks.length; i++) {
        if (i === index) {
            wordListHTML += editIconsHTML(i);
        } else {
            wordListHTML += `<div class="word-item">
                <span onclick="editWord(${i})">${currentSubtasks[i].sub}</span>
            </div>`;
        }
    }
    document.getElementById("subtasks-container").innerHTML = wordListHTML;
}

function saveWord(index) {
    const newValue = document.getElementById(`editInput${index}`).value;
    currentSubtasks[index].sub = newValue;
    renderSubtask();
    return false;
}

function deleteSubtask(i) {
    currentSubtasks.splice(i, 1);
    renderSubtask();
}

///////////////////
// Create Task
////////////////////

async function createTask() {
    getInputs();
}

function getInputs() {
    let titleInput = document.getElementById("title");
    let descriptionInput = document.getElementById("description");
    let dateInput = document.getElementById("date");
    let assignedTo = filterCheckedAssignedTo();
    let categoryText = document.getElementById("selected-category");

    task = {
        title: titleInput.value,
        description: descriptionInput.value,
        date: dateInput.value,
        assignedTo: assignedTo,
        categoryText: categoryText.value,
    };
    postTask(task);
}

function filterCheckedAssignedTo() {
    let filtertContacts = selectedContacts.filter((contact) => contact.checked == true);
    return filtertContacts;
}

async function postTask(task) {
    await postData(
        (path = "/tasks"),
        (data = {
            title: task.title,
            description: task.description,
            date: task.date,
            assignedTo: task.assignedTo,
            category: curretCategory,
            prio: prio,
            categoryText: task.categoryText,
            subtask: currentSubtasks,
        })
    );
}
