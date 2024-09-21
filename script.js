function toggleMenu(id, event) {
  document.getElementById(id).classList.toggle("menu-active");
  event.stopPropagation();
}

function closeAllMenus(event) {
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

  event.stopPropagation();
}
