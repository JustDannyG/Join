function toggleMenu(id, event) {
  document.getElementById(id).classList.toggle("menu-active");
  event.stopPropagation();
}

function closeAllMenus(event) {
  document.getElementById("menu").classList.remove("menu-active");
  document.getElementById("edit-contact").classList.remove("menu-active");
  document.getElementById("edit-button").classList.remove("bg-color-btn");

  event.stopPropagation();
}
