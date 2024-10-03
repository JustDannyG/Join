let currentDraggedElement;
let tasksArray = [];
let prio = "medium";
let selectedContacts = [];

async function init() {
    await getContacts();
    getSelectedContacts()
    await getTasks();
    updateHtml();
}

// document.addEventListener('touchstart', e => {
//     alert('touch')

// })

async function getTasks() {
    let response = await getData(path = "/tasks");
    let taskKeys = Object.keys(response);
    for (let index = 0; index < taskKeys.length; index++) {
        const key = taskKeys[index];
        let task = response[key];
        tasksArray.push({
            'title': task.title,
            'description': task.description,
            'id': index,
            'date': task.date,
            'assignedTo': task.assignedTo,
            'category': task.category,
            'prio': task.prio,
            'categoryText': task.categoryText,
            'subtask': task.subtask
        });
    }
}


function updateHtml() {
    let todoById = document.getElementById('to-do-container');
    let progressById = document.getElementById('in-progress-container');
    let feedbackById = document.getElementById('await-feedback-container');
    let doneById = document.getElementById('done-container');

    renderTasks(filterTasks('todo'), todoById);
    renderTasks(filterTasks('progress'), progressById);
    renderTasks(filterTasks('feedback'), feedbackById);
    renderTasks(filterTasks('done'), doneById);
}


function filterTasks(task) {
    return tasksArray.filter(t => t['category'] == task);
}


function renderTasks(tasks, getById) {
    getById.innerHTML = "";
    if (tasks.length == 0) {
        getById.innerHTML += generateNoTaskHTML();
    } else {
        for (let index = 0; index < tasks.length; index++) {
            const task = tasks[index];
            let className = task.categoryText.replace(" ", "-").toLowerCase()
            getById.innerHTML += generateTaskHTML(task, index, className);
            if (task.assignedTo) {
                renderAssignedToContacts(task, index);
            }
            if (task.subtask) {
                renderSubtask(task, index);
            }
            if (task.prio) {
                renderPrio(task, index);
            }
        }
    }
}


function renderSubtask(task, index) {
    let taskAmount = document.getElementById(`${task.category}-amount${index}`)
    let progressBar = document.getElementById(`${task.category}progress-bar${index}`)
    let progress = document.getElementById(`${task.category}-progress${index}`)
    let amount = task.subtask.filter(c => c.checked == true).length;
    let total = 0
    task.subtask.forEach((sub, i) => {
        total = i + 1
    });
    taskAmount.innerHTML = `${amount}/${total} Subtasks`;
    let result = Math.round((100 / total) * amount) + '%';
    progressBar.classList.remove('d-none')
    progress.style.width = result

}


function renderAssignedToContacts(task, index) {
    const assignedToContainer = document.getElementById(`${task.category}contatcs-container${index}`);
    const numContainer = document.getElementById(`${task.category}contatcs-container${index}num`);
    task.assignedTo.forEach((c, i) => {

        if (i < 3) {
            assignedToContainer.innerHTML += `
        <div class="c${i} contact center" style="background-color:${c.color}">${createInititals(c.name)}</div>`;
        } else {
            numContainer.innerHTML = `<div class="task-contact-length center">+${i - 2}</div>`
        }
    });
}


function renderPrio(task, index) {
    const imgRef = document.getElementById(`${task.category}prio-icon${index}`)
    if (task.prio) {
        imgRef.src = `./assets/icons/prio-${task.prio}-icon.png`;
    }
}


function moveTo(category) {
    tasksArray[currentDraggedElement]["category"] = category;
    moveToUpdateDatabase();
    updateHtml();
}


function startDragging(id) {
    currentDraggedElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}


async function moveToUpdateDatabase() {
    let getTasks = await getData("/tasks");
    let taskKey = Object.keys(getTasks);
    await putData(`/tasks/${taskKey[currentDraggedElement]}`, tasksArray[currentDraggedElement]);
}


function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}


function animationOndrag(id) {
    document.getElementById(id).classList.add('animation-ondrag')
}


function openTask(id) {
    let currentTask = tasksArray[id];
    let infosRef = {
        'category': document.getElementById('task-category-overlay'),
        'title': document.getElementById('task-title-overlay'),
        'description': document.getElementById('task-discription-overlay'),
        'letDateRef': document.getElementById('task-date-overlay'),
        'prioTextRef': document.getElementById('task-prio-overlay'),
        'prioIconRef': document.getElementById('prio-icon-overlay')
    }
    renderTaskInfos(currentTask, infosRef)
    renderTasksArrays(currentTask)
}

function renderTaskInfos(currentTask, infosRef) {
    infosRef.category.innerHTML = currentTask.categoryText;
    infosRef.category.style.backgroundColor = "var(--category)";
    infosRef.title.innerHTML = currentTask.title;
    infosRef.description.innerHTML = currentTask.description;
    infosRef.letDateRef.innerHTML = currentTask.date.replace(/-/g, "/");
    if (currentTask.prio) {
        infosRef.prioTextRef.innerHTML = currentTask.prio.charAt(0).toUpperCase() + currentTask.prio.slice(1);
        infosRef.prioIconRef.src = `./assets/icons/prio-${currentTask.prio}-icon.png`;
    }
}

function renderTasksArrays(currentTask) {
    let assignedToRef = document.getElementById('assigned-to-list');
    let subtaskRef = document.getElementById("subtask-overlay");
    assignedToRef.innerHTML = "";
    subtaskRef.innerHTML = "";

    if (currentTask.assignedTo) {
        currentTask.assignedTo.forEach((a, i) => {
            assignedToRef.innerHTML += generateAssignedToOerlayLiHTML(a, i)
        });
    }
    if (currentTask.subtask) {
        currentTask.subtask.forEach(s => {
            renderCheckboxStatus(s, subtaskRef)
        })
    }
}

function renderCheckboxStatus(s, subtaskRef) {
    if (s.checked === true) {
        subtaskRef.innerHTML += `<li><input class="checkbox" checked type="checkbox" name="" id="">${s.sub}</li>`
    } else {
        subtaskRef.innerHTML += `<li><input class="checkbox" type="checkbox" name="" id="">${s.sub}</li>`
    }
}
// Edit Overlayer

function getSelectedContacts() {
    contacts.forEach(contact => {
        selectedContacts.push({
            'name': contact.name,
            'color': contact.color,
            'checked': false,
        })
    });
    sortByAlphabet(selectedContacts)
}

function editTask() {
    renderContacts(selectedContacts)
}

function addPrio(prioInput) {
    if (prioInput == prio) {
        prio = null;
    } else { prio = prioInput }
    updateBtnColor()
}


function updateBtnColor() {
    document.getElementById("urgent-btn").classList.remove("urgent")
    document.getElementById("medium-btn").classList.remove("medium")
    document.getElementById("low-btn").classList.remove("low")

    document.getElementById("prio-icon-urgent").src = "./assets/icons/prio-urgent-icon.png"
    document.getElementById("prio-icon-medium").src = "./assets/icons/prio-medium-icon.png"
    document.getElementById("prio-icon-low").src = "./assets/icons/prio-low-icon.png"


    if (prio) {
        document.getElementById(`prio-icon-${prio}`).src = `./assets/icons/prio-${prio}-icon-active.png`
        document.getElementById(`${prio}-btn`).classList.add(prio)
    } else return

}

function openDropdown(id, iconId) {
    const dropdown = document.getElementById(id);
    const dropdownIcon = document.getElementById(iconId);
    dropdown.classList.add("show-dropdown");
    dropdownIcon.style.transform = 'rotate(180deg)';
    isDropdownOpen = true;
    classChangeAction('dropdown', 'input-active', 'add')
}


function closeDropdown() {
    const dropdown = document.getElementById('assign-to-dropdown-contacts');
    const dropdownIcon = document.getElementById('drop-down-icon1');

    dropdown.classList.remove("show-dropdown");
    dropdownIcon.style.transform = 'rotate(0deg)';
    isDropdownOpen = false;
    resetInputText()
    classChangeAction('dropdown', 'input-active', 'remove')
}


function handleInputClick(event) {
    clearInput(event.target);
    openDropdown('assign-to-dropdown-contacts', 'drop-down-icon1');
    stopEventBubbling(event);

}


function handleDropdownButtonClick(event) {
    const input = document.getElementById('assign-to-dropdown');
    stopEventBubbling(event);
    resetInputText();
    toggleDropdown('assign-to-dropdown-contacts', 'drop-down-icon1');
    classChangeAction('dropdown', 'input-active', 'remove');

    isDropdownOpen = !isDropdownOpen;
    if (isDropdownOpen) {
        clearInput(input);
        classChangeAction('dropdown', 'input-active', 'add');
    }
}


function resetInputText() {
    let inputRef = document.getElementById("assign-to-dropdown")
    inputRef.value = 'Select contacts to assign'

}

function renderContacts(arr) {
    let dropDownRef = document.getElementById("assign-to-dropdown-contacts");
    dropDownRef.innerHTML = ''
    for (let i = 0; i < arr.length; i++) {
        const contact = arr[i];
        let initials = createInititals(contact.name)
        dropDownRef.innerHTML += contactInDropDownHTML(i, contact, initials);
        updateDesign(i)
    }
}


function updateDesign(i) {
    if (selectedContacts[i].checked) {
        let contactContainerRef = document.getElementById("contact" + i);
        let checkboxRef = document.getElementById("checkbox" + i);
        contactContainerRef.classList.add("contact-active");
        checkboxRef.setAttribute("checked", true)

    } else if (!selectedContacts[i].checked) {
        let contactContainerRef = document.getElementById("contact" + i);
        let checkboxRef = document.getElementById("checkbox" + i);
        contactContainerRef.classList.remove("contact-active");
        checkboxRef.removeAttribute("checked")
    }
}


function selectContact(i) {
    let currentContact = selectedContacts[i]
    currentContact.checked = !currentContact.checked;
    updateDesign(i)
    renderSelectedContacts()
}


function renderSelectedContacts() {
    const containerRef = document.getElementById("selected-contacts-container");
    containerRef.innerHTML = '';
    let assignedToContacts = selectedContacts.filter(c => c.checked == true);


    for (let contact of assignedToContacts) {
        let initials = createInititals(contact.name);
        containerRef.innerHTML += contactSelectionCircleHTML(contact, initials);
        console.log(contact);

    }
}


function filter(id) {
    const inputRef = document.getElementById(id);
    const input = inputRef.value.toLowerCase();
    if (checkLengthGreater(input, 2)) {
        const result = findInput(input);
        if (result.length === 0) {
            displayNoContactFoundMessage();
        } else {
            renderContacts(result);
        }
    } else {
        renderContacts(contacts);
    }
}


function displayNoContactFoundMessage() {
    const dropdownRef = document.getElementById("assign-to-dropdown-contacts");
    dropdownRef.innerHTML = '<li class="not-found">Nicht gefunden</li>';
}

function findInput(input) {
    let result = contacts.filter(contact =>
        contact.name.toLowerCase().includes(input))
    return result
}