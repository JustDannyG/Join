function toggleMenu(id) {
    document.getElementById(id).classList.toggle("menu-active");
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