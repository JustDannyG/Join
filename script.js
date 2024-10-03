let user = 'Guest';
let contacts = [];



async function getContacts() {
    const contactsData = await getData("contacts");
    const keys = Object.keys(contactsData);
    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        const contact = contactsData[key];
        contacts.push(contact);
    }
    sortByAlphabet(contacts);
}

function stopEventBubbling(event) {
    event.stopPropagation();
}

function goSummery() {
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

function clearContent(e) {
    e.innerHTML = "";
}

function clearInput(input) {
    input.value = "";

}

function isCheckBoxChecked(e) {
    return e.checked;
}

function checkLengthGreater(e, n) {
    return e.length > n
}

function checkLengthSmaller(e, n) {
    return e.length > n
}


function classChangeAction(id, className, action) {
    const element = document.getElementById(id);
    if (element) {
        if (action === 'toggle') {
            element.classList.toggle(className);
        } else if (action === 'add') {
            element.classList.add(className);
        } else if (action === 'remove') {
            element.classList.remove(className);
        }
    } else return
}

//Mobile / Desktop //

function checkScreenWidth() {

    let header = document.getElementById('join-header');
    let sidebar = document.getElementById('join-sidebar');
    let currentHeader = '';
    let currentSidebar = '';
    if (window.innerWidth <= 1024) {
        console.log("Mobile Ansicht");
        currentHeader = mobileHeader();
        currentSidebar = mobileSidebar();
        screenMode = 'mobile';
    } else {
        console.log("Desktop Ansicht");
        currentHeader = desktopHeader();
        currentSidebar = desktopSidebar();
        screenMode = 'desktop';
    }
    header.innerHTML = currentHeader;
    sidebar.innerHTML = currentSidebar;
}

// Aufrufen der Funktion beim Laden der Seite
checkScreenWidth();
// Optional: Bei jeder Größenänderung des Fensters
window.addEventListener('resize', checkScreenWidth);

function greetingTime() {

}

function greetingUser() {
    let greetUser = document.getElementById('greeting-name');
    greetUser.innerHTML = user;
}

function openAddTask(taskStatus) {
    if (screenMode == 'mobile') {
        window.location.href = "add-task.html";
        taskStatus
    }
    if (screenMode == 'desktop') {
        alert('Here Add Task Overlay')
    }
}



///////////////////
// Select Function
////////////////////




// $('select').each(function() {
//     var $this = $(this);
//     $this.addClass('s-hidden').wrap('<div class="select"></div>');
//     var $styledSelect = $('<div class="styledSelect"></div>').text($this.children('option').eq(0).text()).insertAfter($this);
//     var $list = $('<ul />', { class: 'options' }).insertAfter($styledSelect);

//     $this.children('option').each(function(index) {
//         var $li = $('<li />', {
//             text: $(this).text(),
//             rel: $(this).val()
//         });

//         if (index === 0) {
//             $li.addClass('hide-first');
//         }

//         $li.appendTo($list);
//     });

//     $styledSelect.on('click', function(e) {
//         e.stopPropagation();
//         $('div.styledSelect.active').not(this).removeClass('active').next('ul.options').hide();
//         $(this).toggleClass('active').next('ul.options').toggle();
//         if ($(this).hasClass('active')) {
//             $list.children('li.hide-first').hide();
//         }
//     });

//     $list.on('click', 'li', function(e) {
//         e.stopPropagation();
//         $styledSelect.text($(this).text()).removeClass('active');
//         $this.val($(this).attr('rel'));
//         $list.hide();
//     });
// });