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


function toggleDropdown(id) {
    const dropdown = document.getElementById(id);
    const dropdownIcon = document.getElementById("drop-down-icon");
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



function selectContact(name) {
    let selectecdContacts = [];
    const containerRef = document.getElementById("selectet-contacts-container");
    const checkboxRef = document.getElementById("checkbox");

    checkboxRef.checked = !checkboxRef.checked;

    if (checkboxRef.checked) {
        selectecdContacts.push(name);
    } else {
        const index = selectecdContacts.indexOf(name);
        if (index > -1) {
            selectecdContacts.splice(index, 1);
        }
    }
    containerRef.innerHTML = '';

    for (let i = 0; i < selectecdContacts.length; i++) {
        const contact = selectecdContacts[i];
        containerRef.innerHTML += `
        <div class="contact center">${contact}</div>
        `;
    }
}