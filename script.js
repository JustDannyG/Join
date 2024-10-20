let user = localStorage.getItem("user");
let userId = localStorage.getItem("userId");
let contacts = [];
let prio = "medium";

//////////////////////////////
///    Log out Function   ///
/////////////////////////////

function logOut() {
    localStorage.setItem("user", "");
    localStorage.setItem("userId", "");
    window.location.href = "index.html";
    localStorage.removeItem("rememberMeUser");
    localStorage.removeItem("rememberMe");
}

//////////////////////////////
///    Own Contact        ///
/////////////////////////////

async function getOwnContact() {
    let ownContactResponse = await getData((path = `users/${userId}`));
    return ownContactResponse;
}

async function ownContact() {
    let ownContactData = await getOwnContact();
    return {
        color: ownContactData.color,
        email: ownContactData.email,
        name: ownContactData.name,
        phone: ownContactData.phnoe,
    };
}

//////////////////////////////////////
///         Return Functions     /////
/////////////////////////////////////

function markedPage(id, activeStyle) {
    document.getElementById(id).classList.add(activeStyle);
}

function createInititals(selectName) {
    if (selectName === undefined || selectName === null) {
        return "";
    }
    let parts = selectName.split(" ");
    if (parts.length === 1) {
        let neededPartOne = parts[0].slice(0, 1);
        return neededPartOne;
    } else if (parts.length === 2) {
        let neededPartOne = parts[0].slice(0, 1);
        let neededPartTwo = parts[1].slice(0, 1);
        return neededPartOne + neededPartTwo;
    } else if (parts.length >= 3) {
        let neededPartOne = parts[0].slice(0, 1);
        let neededPartThree = parts[2].slice(0, 1);
        return neededPartOne + neededPartThree;
    }
}

function randomColor() {
    let random = Math.floor(Math.random() * 16777215).toString(16);
    let hexCode = "#" + random;
    return hexCode;
}

function sortByAlphabet(arr) {
    arr.sort((a, b) => a.name.localeCompare(b.name));
    return arr;
}

/////////////////////////////////////////////////
///   LocalStorage - Save / Load Functions   ////
/////////////////////////////////////////////////

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
    let myData;
    let myArr = JSON.parse(localStorage.getItem(key));
    if (myArr !== null) {
        myData = myArr;
    }
    return myData;
}

//////////////////////////////////////
///                             /////
/////////////////////////////////////

function clearInput(input) {
    input.value = "";
}

function stopEventBubbling(event) {
    event.stopPropagation();
}



////////////////////////////
///   Get Contacts     /////
////////////////////////////

async function getContacts() {
    contacts = [];
    const contactsData = await getData("contacts");
    const keys = Object.keys(contactsData);
    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        const contact = contactsData[key];
        contacts.push(contact);
    }
    // contacts.push(ownContact());
    sortByAlphabet(contacts);
    console.log(contacts);
}

//////////////////////////////////////
///                             /////
/////////////////////////////////////

function classChangeAction(id, className, action) {
    const element = document.getElementById(id);
    if (element) {
        if (action === "toggle") {
            element.classList.toggle(className);
        } else if (action === "add") {
            element.classList.add(className);
        } else if (action === "remove") {
            element.classList.remove(className);
        }
    } else return;
}

///////////////////////////////////////////////////////////////////
///   Check Screen Size for Mobile or Desktop Design Functions  ///
///////////////////////////////////////////////////////////////////

function checkScreenWidth() {
    let header = document.getElementById("join-header");
    let sidebar = document.getElementById("join-sidebar");
    let currentHeader = "";
    let currentSidebar = "";

    try {
        if (window.innerWidth <= 1024) {
            console.log("Mobile Ansicht");
            currentHeader = mobileHeader(createInititals(user));
            currentSidebar = mobileSidebar();
            screenMode = "mobile";
        } else {
            console.log("Desktop Ansicht");
            currentHeader = desktopHeader(createInititals(user));
            currentSidebar = desktopSidebar();
            screenMode = "desktop";
        }
        header.innerHTML = currentHeader;
        sidebar.innerHTML = currentSidebar;
    } catch {
        console.log('No Header No Sidebar on this Page');

    }
}

// Aufrufen der Funktion beim Laden der Seite
checkScreenWidth();
checkIsSomeoneLogedId();
// Optional: Bei jeder Größenänderung des Fensters
window.addEventListener("resize", checkScreenWidth);
window.addEventListener("resize", checkIsSomeoneLogedId);


function hideHelpIcon() {
    document.getElementById('help-icon').style.display = "none";
}

///////////////////////////////////////////////////////////////////
///                                                            ///
///////////////////////////////////////////////////////////////////

function checkIsSomeoneLogedId() {
    if (!user) {
        document.getElementById("summary-link").classList.add("d-none");
        document.getElementById("board-link").classList.add("d-none");
        document.getElementById("add-task-link").classList.add("d-none");
        document.getElementById("contact-link").classList.add("d-none");
    }
}

function openAddTask(taskCategory) {
    setTaskCategory(taskCategory);
    if (screenMode == "mobile") {
        window.location.href = "add-task.html";
    }
    if (screenMode == "desktop") {
        updateBtnColor(prio);
        classChangeAction("add-task-overlay", "overlaver-active", "toggle");
    }
}

///////////////////////////////////////////////////////////////////
///     Select Special Design Function  ** Stack Overflow **    ///
///////////////////////////////////////////////////////////////////

function styleSelecet() {
    document.querySelectorAll("select").forEach(function (select) {
        select.classList.add("s-hidden");
        var styledSelect = document.createElement("div");
        styledSelect.classList.add("styledSelect");
        styledSelect.textContent = select.options[select.selectedIndex].text;
        select.parentNode.insertBefore(styledSelect, select.nextSibling);
        var list = document.createElement("ul");
        list.classList.add("options");
        select.parentNode.insertBefore(list, styledSelect.nextSibling);
        Array.from(select.options).forEach(function (option, index) {
            var li = document.createElement("li");

            li.textContent = option.text;
            li.setAttribute("rel", option.value);
            if (index === 0) {
                li.classList.add("hide-first");
            }
            list.appendChild(li);
        });

        styledSelect.addEventListener("click", function (e) {
            e.stopPropagation();
            document.querySelectorAll("div.styledSelect.active").forEach(function (activeSelect) {
                if (activeSelect !== styledSelect) {
                    activeSelect.classList.remove("active");
                    activeSelect.nextElementSibling.style.display = "none";
                }
            });

            styledSelect.classList.toggle("active");
            list.style.display = styledSelect.classList.contains("active") ? "block" : "none";
            if (styledSelect.classList.contains("active")) {
                list.querySelector("li.hide-first").style.display = "none";
            }
        });
        list.addEventListener("click", function (e) {
            if (e.target.tagName === "LI") {
                styledSelect.textContent = e.target.textContent;
                styledSelect.classList.remove("active");
                select.value = e.target.getAttribute("rel");
                list.style.display = "none";
            }
        });

        document.addEventListener("click", function () {
            styledSelect.classList.remove("active");
            list.style.display = "none";
        });
    });
}
