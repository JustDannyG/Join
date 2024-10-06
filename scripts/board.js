let currentDraggedElement;
let tasksArray = [];
let currentTask;
// let infosRef;

////////////////////////
//   Start
///////////////////////

async function boardInit() {
    await getContacts();
    await getTasks();
    updateHtml();
}

////////////////////////
// Show Board Tasks
///////////////////////

async function getTasks() {
    let response = await getData((path = "/tasks"));
    let taskKeys = Object.keys(response);
    console.log(taskKeys);

    for (let index = 0; index < taskKeys.length; index++) {
        const key = taskKeys[index];
        let task = response[key];
        tasksArray.push({
            title: task.title,
            description: task.description,
            id: index,
            date: task.date,
            assignedTo: task.assignedTo,
            category: task.category,
            prio: task.prio,
            categoryText: task.categoryText,
            subtask: task.subtask,
            taskKey: taskKeys[index],
        });
    }
}

function updateHtml() {
    let todoById = document.getElementById("to-do-container");
    let progressById = document.getElementById("in-progress-container");
    let feedbackById = document.getElementById("await-feedback-container");
    let doneById = document.getElementById("done-container");

    renderTasks(filterTasks("todo"), todoById, "To do");
    renderTasks(filterTasks("progress"), progressById, "Progress");
    renderTasks(filterTasks("feedback"), feedbackById, "Feedback");
    renderTasks(filterTasks("done"), doneById, "Done");
}

function filterTasks(task) {
    return tasksArray.filter((t) => t["category"] == task);
}

function renderTasks(tasks, getById, noTask) {
    getById.innerHTML = "";
    if (tasks.length == 0) {
        getById.innerHTML += generateNoTaskHTML(noTask);
    } else {
        for (let index = 0; index < tasks.length; index++) {
            const task = tasks[index];
            let className = task.categoryText.replace(" ", "-").toLowerCase();
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
    let taskAmount = document.getElementById(`${task.category}-amount${index}`);
    let progressBar = document.getElementById(`${task.category}progress-bar${index}`);
    let progress = document.getElementById(`${task.category}-progress${index}`);
    let amount = task.subtask.filter((c) => c.checked == true).length;
    let total = 0;
    task.subtask.forEach((sub, i) => {
        total = i + 1;
    });
    taskAmount.innerHTML = `${amount}/${total} Subtasks`;
    let result = Math.round((100 / total) * amount) + "%";
    progressBar.classList.remove("d-none");
    progress.style.width = result;
}

function renderAssignedToContacts(task, index) {
    const assignedToContainer = document.getElementById(`${task.category}contatcs-container${index}`);
    const numContainer = document.getElementById(`${task.category}contatcs-container${index}num`);
    task.assignedTo.forEach((c, i) => {
        if (i < 3) {
            assignedToContainer.innerHTML += `
        <div class="c${i} contact center" style="background-color:${c.color}">${createInititals(c.name)}</div>`;
        } else {
            numContainer.innerHTML = `<div class="task-contact-length center">+${i - 2}</div>`;
        }
    });
}

function renderPrio(task, index) {
    const imgRef = document.getElementById(`${task.category}prio-icon${index}`);
    if (task.prio) {
        imgRef.src = `./assets/icons/prio-${task.prio}-icon.png`;
    } // Else Statment bei keiner Prio mit d-none
}

///////////////////////////
// Drag and Drop Fuktionen
//////////////////////////

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
    document.getElementById(id).classList.add("drag-area-highlight");
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove("drag-area-highlight");
}

function animationOndrag(id) {
    document.getElementById(id).classList.add("animation-ondrag");
}

////////////////////////
// Show Task Funktionen
///////////////////////

function openTask(id) {
    currentTask = tasksArray[id];
    document.getElementById("overlaver").innerHTML = taskBoardOverlay(currentTask);
    console.log(currentTask);
    taskPrioText();
    renderTasksArrays();
}

function renderTasksArrays() {
    let assignedToRef = document.getElementById("assigned-to-list");

    assignedToRef.innerHTML = "";
    if (currentTask.assignedTo) {
        currentTask.assignedTo.forEach((contact) => {
            assignedToRef.innerHTML += generateAssignedToOerlayLiHTML(contact);
        });
    }
    setCheck();
}

function setCheck() {
    let subtaskRef = document.getElementById("subtask-overlay");
    subtaskRef.innerHTML = "";
    if (currentTask.subtask) {
        // Verwende Array um daten zu edit ......
        currentTask.subtask.forEach((s, i) => {
            subtaskRef.innerHTML += `
    <div class="task-overlay-subtask" onclick="checkAndPushToFirebase(${i})"><img src="./assets/icons/${s.checked}.png" alt=""> ${s.sub}</div>
    `;
        });
    }
}

async function checkAndPushToFirebase(subIndex) {
    console.log(currentTask.subtask[subIndex].checked);
    let value = currentTask.subtask[subIndex].checked;
    console.log(value);
    value = !value;
    console.log(value);
    console.log(currentTask.taskKey);
    await putData(
        (path = `/tasks/${currentTask.taskKey}/subtask/${subIndex}`),
        (data = {
            checked: value,
            sub: currentTask.subtask[subIndex].sub,
        })
    );
    await getTasks();
}

// function checkboxStatus(s) {
//     let subtaskRef = document.getElementById("subtask-overlay");
//     subtaskRef.innerHTML = "";
//     if (s.checked === true) {
//         subtaskRef.innerHTML += html`
//         <div><img src="./assets/icons/${s.checked}.png" alt=""></div>
//         `
//     } else {
//         subtaskRef.innerHTML += `<div><img src="./assets/icons/true.png" alt=""></div>`
//     }
// }

////////////////////////////
// Edit Task Funktionen
////////////////////////////

function showEditTaskValues() {
    document.getElementById("overlaver").innerHTML = editBoardTaskHTML(currentTask);
    editTaskAssignTo();
    editTaskSubtask();
    editTaskPrioBtnColor();
    taskPrioText();
    // selectedContacts = [] //Required, to clear the Array from the Edit-Task before    //// Anpassungen
    // getSelectedContacts()
    // renderContacts(selectedContacts)
}
function updateCategoryText(value) {
    currentTask.categoryText = value;
    document.getElementById("category-text").innerHTML = value;
    console.log(currentTask.categoryText);
}

function editTaskAssignTo() {
    if (currentTask.assignedTo) {
        findCheckedContacts(currentTask);
        renderContacts(selectedContacts);
    }
}

function editTaskSubtask() {
    if (currentTask.subtask) {
        renderSubtaskEdit(currentTask.subtask);
        currentSubtasks = [];
        currentSubtasks.push(...currentTask.subtask);
    }
}

function taskPrioText() {
    if (currentTask.prio) {
        document.getElementById("prio").innerHTML = currentTask.prio.charAt(0).toUpperCase() + currentTask.prio.slice(1);
    } else {
        document.getElementById("prio").innerHTML = "No Prio";
    }
}

function editTaskPrioBtnColor() {
    document.getElementById("urgent-btn").classList.remove("urgent");
    document.getElementById("medium-btn").classList.remove("medium");
    document.getElementById("low-btn").classList.remove("low");
    document.getElementById("prio-icon-urgent").src = "./assets/icons/prio-urgent-icon.png";
    document.getElementById("prio-icon-medium").src = "./assets/icons/prio-medium-icon.png";
    document.getElementById("prio-icon-low").src = "./assets/icons/prio-low-icon.png";

    if (currentTask.prio) {
        document.getElementById(`prio-icon-${currentTask.prio}`).src = `./assets/icons/prio-${currentTask.prio}-icon-active.png`;
        document.getElementById(`${currentTask.prio}-btn`).classList.add(currentTask.prio);
    } else return;
}

function editPrio(prioInput) {
    if (prioInput == currentTask.prio) {
        currentTask.prio = null;
    } else {
        currentTask.prio = prioInput;
    }
    editTaskPrioBtnColor();
}

function findCheckedContacts(currentTask) {
    for (let i = 0; i < selectedContacts.length; i++) {
        let selectedName = selectedContacts[i].name;

        for (let j = 0; j < currentTask.assignedTo.length; j++) {
            let assignedName = currentTask.assignedTo[j].name;
            if (assignedName == selectedName) {
                selectedContacts[i].checked = true;
            }
        }
    }
}

function renderSubtaskEdit(subtasks) {
    let subTaskRef = document.getElementById("subtasks-container");
    subtasks.forEach((subtask, i) => {
        subTaskRef.innerHTML += subtaskTaskHTML(subtask, i);
    });
}

///////////////////////////////
///   Subtasks Bearbeitung  ///
///////////////////////////////

//Ändern.........
function saveWord(index) {
    const newValue = document.getElementById(`editInput${index}`).value;
    currentSubtasks[index].sub = newValue;
    // renderSubtask();
    renderSubtaskEdit(currentSubtasks);
}

//Ändern............
function deleteSubtask(i) {
    currentSubtasks.splice(i, 1);
    renderSubtaskEdit(currentSubtasks);
    // renderSubtaskEdit(currentTask.subtask)
    // renderSubtask();
}

///////////////////////////////////////////
///      Edit to Save to Firebase      ///
//////////////////////////////////////////
