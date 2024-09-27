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
    input.value = "";
}

function backwards() {
    window.location.href = "summary.html";
}



function createInititals(selectName) {
    let firstsChar = selectName;
    parts = firstsChar.split(' ');
    if (parts.length == 1) {
        neededPartOne = parts[0].slice(0, 1);
        return neededPartOne;
    } else if (parts.length == 2) {
        neededPartOne = parts[0].slice(0, 1);
        neededPartTwo = parts[1].slice(0, 1);
        return neededPartOne + neededPartTwo;
    } else if (parts.length == 3) {
        neededPartOne = parts[0].slice(0, 1);
        neededPartThree = parts[2].slice(0, 1);
        return neededPartOne + neededPartThree;
    }
}


function randomColor() {
    let random = Math.floor(Math.random() * 16777215).toString(16);
    let hexCode = '#' + random;
    return hexCode;

}

function sortByAlphabet(arr) {
    arr.sort((a, b) => a.name.localeCompare(b.name));
    return arr;
}



function checkScreenWidth() {
    let header = document.getElementById('join-header');
    let sidebar = document.getElementById('join-sidebar')
    let currentHeader = ''
    let currentSidebar = ''
    if (window.innerWidth <= 1024) {
        console.log("Mobile Ansicht");
        currentHeader = mobileHeader();
        currentSidebar = mobileSidebar()
    } else {
        console.log("Desktop Ansicht");
        currentHeader = desktopHeader();
        currentSidebar = desktopSidebar();
    }
    header.innerHTML = currentHeader;
    sidebar.innerHTML = currentSidebar;
}

// Aufrufen der Funktion beim Laden der Seite
checkScreenWidth();
// Optional: Bei jeder Größenänderung des Fensters
window.addEventListener('resize', checkScreenWidth);


function mobileHeader() {
    return `<header class="d-flex header-mobile">
      <img class="logo-mobile" src="./assets/icons/logo-dark.svg" alt="Join Logo" />
      <div onclick="toggleMenu('menu', event)" id="current-user-header" class="current-user-header center">T</div>
      <div id="menu" class="column menu">
        <a href="./help.html">Help</a>
        <a href="./legal-notice.html">Legal Notice</a>
        <a href="./privacy-policy.html">Privacy Policy</a>
        <a href="#">Log out</a>
      </div>
    </header>`;
}


function desktopHeader() {
    return `
        <header class="header-desktop">
        <p class="header-title">Kanban Project Management Tool</p>
        <div class="header-actions">
            <a href="#"> <img class="help-icon" src="./assets/icons/help-icon.png" alt="Help"></a>
            <div id="header-initials" class="header-initials-btn">
                SM
            </div>
        </div>
    </header>`;
}


function mobileSidebar(){
    return `<aside class="d-flex sidebar-mobile">
      <a class="center column nav-link-mobile" href="./summary.html"><img src="./assets/icons/summary-icon.png"
          alt="Summary" />Summary</a>
      <a class="center column nav-link-mobile" href="./board.html"><img src="./assets/icons/board-icon.png"
          alt="Board" />Board</a>
      <a class="center column nav-link-mobile" href="./add-task.html"><img src="./assets/icons/add-task-icon.png"
          alt="Add Task" />Add Task</a>
      <a class="center column nav-link-mobile" href="./contact.html"><img src="./assets/icons/contacts-icon.png"
          alt="Contacts" />Contacts</a>
    </aside>`;
}


function desktopSidebar() {
    return `<aside class="sidebar-desktop">
        <img class="sidebar-logo-desktop" src="./assets/icons/join-logo-light.png" alt="">
        <nav class="sidebar-nav">
            <a class="nav-link-desktop" href="#"><img src="./assets/icons/summary-icon.png" alt=""> Summary</a>
            <a class="nav-link-desktop" href="#"><img src="./assets/icons/add-task-icon.png" alt=""> Add Task</a>
            <a class="nav-link-desktop" href="#"><img src="./assets/icons/board-icon.png" alt=""> Board</a>
            <a class="nav-link-desktop" href="#"><img src="./assets/icons/contacts-icon.png" alt=""> Contacts</a>
        </nav>
        <div class="sidebar-info">
            <a href="privacy-policy.html">Privacy Policy</a>
            <a href="legal-notice.html">Legal notice</a>
        </div>
    </aside>`;
}

