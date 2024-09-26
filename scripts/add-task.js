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
    }
}

function selectCategory(category) {
    const selectedCategory = document.getElementById("drop-down-text");
    selectedCategory.innerHTML = category;
}

function closeDropdown() {
    const dropdownCategory = document.getElementById('category-dropdown');
    const dropdownContacts = document.getElementById('assign-to-dropdown-contacts');
    const dropdownIcon = document.getElementById("drop-down-icon");

    dropdownCategory.classList.remove("show-dropdown") || dropdownContacts.classList.remove("show-dropdown");
    dropdownIcon.style.transform = 'rotate(0deg)';
}



const contacts = ['John Doe', 'Jane Smith', 'Emily Johnson'];
const selectedContacts = [];

function init() {
    renderContacts();
}

function renderContacts() {
    const dropDownRef = document.getElementById("assign-to-dropdown-contacts");
    dropDownRef.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        let initials = createInititals(contact)

        dropDownRef.innerHTML += `
            <li onclick="selectContact('${contact}',${i}); stopEventBubbling(event)">
                <div class="d-flex contact-row">
                    <div class="center gap">
                        <div class="contact center">${initials}</div>
                        <span>${contact}</span>
                    </div>
                    <div class="container">
                        <input type="checkbox" id="checkbox${i}" onclick="selectContact('${contact}'); stopEventBubbling(event)">
                        <span class="checkmark"></span>
                    </div>
                </div>
            </li>`;
    }
}

function selectContact(name, i) {
    const index = selectedContacts.indexOf(name);
    const containerRef = document.getElementById("selected-contacts-container");
    let checkboxRef = document.getElementById("checkbox" + i)


    checkboxRef.checked = !checkboxRef.checked


    if (index === -1) {
        selectedContacts.push(name);
    } else {
        selectedContacts.splice(index, 1);
    }

    containerRef.innerHTML = '';
    for (let contact of selectedContacts) {
        let initials = createInititals(contact)
        containerRef.innerHTML += `
            <div class="contact center">${initials}</div>`;
    }
}



function filter(id) {
    let inputRef = document.getElementById(id)
    inputRef.value = ""

}