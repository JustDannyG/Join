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