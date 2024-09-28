function toggleOverlay(id, className) {
    document.getElementById(id).classList.toggle(className)
}

function closeAllMenus() {
    const menu = document.getElementById("menu");
    const editContact = document.getElementById("edit-contact");
    const editButton = document.getElementById("edit-button");
    const addButton = document.getElementById("add-contact");

    if (menu) {
        menu.classList.remove("menu-active");
    }

    if (editContact) {
        editContact.classList.remove("menu-active");
    }

    if (editButton) {
        editButton.classList.remove("bg-color-btn");
    }

    if (addButton) {
        addButton.classList.remove("toogle-bg-color")
    }
}

function stopEventBubbling(event) {
    event.stopPropagation();
}

function clearInput(input) {
    input.value = ""
}

function goSummery() {
    window.location.href = "summary.html";
}