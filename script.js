function toggleOverlay(id, className) {
    document.getElementById(id).classList.toggle(className)
}

function closeAllMenus() {
    const menu = document.getElementById("menu");
    const editContact = document.getElementById("edit-contact");
    const editButton = document.getElementById("edit-button");

    if (menu) {
        menu.classList.remove("menu-active");
    }

    if (editContact) {
        editContact.classList.remove("menu-active");
    }

    if (editButton) {
        editButton.classList.remove("bg-color-btn");
    }
}

function stopEventBubbling(event) {
    event.stopPropagation();
}

function clearInput(input) {
    input.value = ""
}