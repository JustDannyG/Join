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

function selectCategory(category) {
    const selectedCategory = document.getElementById("drop-down-text");
    selectedCategory.innerHTML = category;
}

function closeDropdown() {

}


const contacts = [{ name: 'John Doe' }, { name: 'Jane Smith' }, { name: 'Emily Johnson' }];
const selectedContacts = [];
// const unselectedContacts = [];


function init() {
    renderContacts(contacts);
}

function renderContacts(arr) {
    const dropDownRef = document.getElementById("assign-to-dropdown-contacts");
    dropDownRef.innerHTML = '';



    for (let i = 0; i < arr.length; i++) {
        const contact = arr[i];
        let initials = createInititals(contact.name)


        dropDownRef.innerHTML += `
            <li id="contact${i}" onclick="selectContact('${contact.name}',${i}); stopEventBubbling(event)">
                <div class="d-flex contact-row">
                    <div class="center gap">
                        <div class="contact center">${initials}</div>
                        <span>${contact.name}</span>
                    </div>
                    <div class="container">
                        <input type="checkbox" id="checkbox${i}" onclick="selectContact('${contact.name}'); stopEventBubbling(event)">
                        <span class="checkmark"></span>
                    </div>
                </div>
            </li>`;

        if (contact.checked) {
            let contactContainerRef = document.getElementById("contact" + i);
            let checkboxRef = document.getElementById("checkbox" + i);
            checkboxRef.checked = true;
            contactContainerRef.classList.add("contact-active");
            console.log(checkboxRef);

        } else if (!contact.checked) {
            let contactContainerRef = document.getElementById("contact" + i);
            let checkboxRef = document.getElementById("checkbox" + i);
            checkboxRef.checked = false;
            contactContainerRef.classList.remove("contact-active");
            console.log(checkboxRef);

        }
    }
}





function selectContact(name, i) {
    const index = selectedContacts.findIndex(contact => contact.name === name);
    const indexContacts = contacts.findIndex(contact => contact.name === name);
    let checkboxRef = document.getElementById("checkbox" + i);
    let contactContainerRef = document.getElementById("contact" + i);

    checkboxRef.checked = !checkboxRef.checked;

    if (index === -1) {
        if (indexContacts !== -1) {
            contacts.splice(indexContacts, 1);
        }
        selectedContacts.push({ "name": name, "checked": checkboxRef.checked });
        contacts.push({ "name": name, "checked": checkboxRef.checked });
        contactContainerRef.classList.add("contact-active");

    } else if (index >= 0) {
        selectedContacts.splice(index, 1);
        if (indexContacts !== -1) {
            contacts.splice(indexContacts, 1);
        }
        contacts.push({ "name": name, "checked": checkboxRef.checked });
        contactContainerRef.classList.remove("contact-active");
    }
    console.log(checkboxRef);
    renderSelectetContacts();
}

function renderSelectetContacts() {
    const containerRef = document.getElementById("selected-contacts-container");
    containerRef.innerHTML = '';
    for (let contact of selectedContacts) {

        let initials = createInititals(contact.name);
        containerRef.innerHTML += `
            <div class="contact center">${initials}</div>`;
    }

}

function handleInputClick(event) {
    clearInput(event.target);
    toggleDropdown('assign-to-dropdown-contacts', 'drop-down-icon1');
    stopEventBubbling(event);
}



function filter(id) {

    let inputRef = document.getElementById(id);
    let input = inputRef.value.toLowerCase();

    if (input.length > 2) {
        const result = contacts.filter(contact => {
            if (contact.checked !== true || contact.checked === undefined) {
                return contact.name.toLowerCase().includes(input);
            }
            return false;
        });
        renderContacts(result)
    } else {
        renderContacts(contacts)
    }


}