let isDropdownOpen = false;

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
    dropdown.classList.toggle("show-dropdown");

    if (dropdown.classList.contains("show-dropdown")) {
        dropdownIcon.style.transform = 'rotate(180deg)';


    } else {
        dropdownIcon.style.transform = 'rotate(0deg)';
        removeClass('dropdown', 'input-active');
    }
}

function openDropdown(id, iconId) {
    const dropdown = document.getElementById(id);
    const dropdownIcon = document.getElementById(iconId);
    dropdown.classList.add("show-dropdown");
    dropdownIcon.style.transform = 'rotate(180deg)';
    isDropdownOpen = true;
    addClass('dropdown', 'input-active');
}

function closeDropdown(id, iconId) {
    const dropdown = document.getElementById(id);
    const dropdownIcon = document.getElementById(iconId);

    dropdown.classList.remove("show-dropdown");
    dropdownIcon.style.transform = 'rotate(0deg)';
    isDropdownOpen = false;
    resetInputText()
    removeClass('dropdown', 'input-active');
}


function handleDropdownButtonClick(event) {
    const input = document.getElementById('assign-to-dropdown');
    stopEventBubbling(event);
    resetInputText();
    toggleDropdown('assign-to-dropdown-contacts', 'drop-down-icon1');
    removeClass('dropdown', 'input-active');

    isDropdownOpen = !isDropdownOpen;
    if (isDropdownOpen) {
        clearInput(input);
        renderContacts(contacts);
        addClass('dropdown', 'input-active');
    }
}


function resetInputText() {
    let inputRef = document.getElementById("assign-to-dropdown")
    inputRef.value = 'Select contacts to assign'

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
    handleContactSelection(index, indexContacts, name, checkboxRef.checked, contactContainerRef);
    renderSelectetContacts();
}

function handleContactSelection(index, indexContacts, name, checked, contactContainerRef) {
    if (index === -1) {
        removeFromContactsList(contacts, indexContacts);
        updateContactsList(selectedContacts, name, checked);
        updateContactsList(contacts, name, checked);
        contactContainerRef.classList.add("contact-active");
    } else {
        selectedContacts.splice(index, 1);
        removeFromContactsList(contacts, indexContacts);
        updateContactsList(contacts, name, checked);
        contactContainerRef.classList.remove("contact-active");
    }
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
        } else {
            renderContacts(result);
        }
    } else {
        renderContacts(contacts);
    }
}

function displayNoContactFoundMessage() {
    const dropdownRef = document.getElementById("assign-to-dropdown-contacts");
    dropdownRef.innerHTML = '<li class="not-found">Nicht gefunden</li>';
}


// function findInput(input) {
//     let result = contacts.filter(contact =>
//         !contact.checked && contact.name.toLowerCase().includes(input))
//     return result
// }

function findInput(input) {
    let result = contacts.filter(contact =>
        contact.name.toLowerCase().includes(input))
    return result
}