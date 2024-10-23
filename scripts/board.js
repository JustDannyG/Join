let currentDraggedElement;
let tasksArray = [];
let currentTask;
let taskCounter = 0;

////////////////////
///    Start   ////
///////////////////

/**
 * Initializes the board by fetching contacts and tasks,
 * then updates the board's HTML based on the data.
 */
async function boardInit() {
    await getContacts();
    getSelectedContacts();
    await getTasks();
    updateHtml();
}

/**
 * Resets the board by fetching updated tasks and refreshing the HTML.
 */
async function resetBoard() {
    await getTasks();
    updateHtml();
}

////////////////////////////////////////
///    Get and Show Tasks on Board   ///
////////////////////////////////////////

/**
 * Fetches tasks from the server, processes them, and updates the `tasksArray`.
 */
async function getTasks() {
    let response = await getData((path = "/tasks"));
    console.log(response);

    let taskKeys = Object.keys(response);
    tasksArray = [];
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

/**
 * Updates the HTML by rendering tasks into their respective columns
 */
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

/**
 * Filters tasks based on their category.
 * @param {string} category - The category to filter tasks by (e.g., "todo", "progress").
 * @returns {Array} - The array of tasks that match the given category.
 */
function filterTasks(category) {
    return tasksArray.filter((task) => task.category === category);
}

/**
 * Renders tasks into the provided HTML container.
 * @param {Array} tasks - Array of tasks to be rendered.
 * @param {HTMLElement} getById - The HTML container element where the tasks will be rendered.
 * @param {string} noTask - The message to display when there are no tasks.
 */
function renderTasks(tasks, getById, noTask) {
    getById.innerHTML = "";
    if (tasks.length == 0) {
        getById.innerHTML += generateNoTaskHTML(noTask);
    } else {
        for (let index = 0; index < tasks.length; index++) {
            taskCounter++;
            let task = tasks[index];
            let className = task.categoryText.replace(" ", "-").toLowerCase();
            getById.innerHTML += generateTaskHTML(task, index, className);
            renderNoRequiredDetails(task, index);
        }
    }
}

/**
 * Renders optional details for a task such as assigned contacts, subtasks, and priority.
 * @param {Object} task - The task object containing details.
 * @param {number} index - The index of the task in the list.
 */
function renderNoRequiredDetails(task, index) {
    if (task.assignedTo) {
        renderAssignedToContacts(task, index);
    }
    if (task.subtask) {
        renderSubtaskBar(task, index);
    }
    if (task.prio) {
        renderPrio(task, index);
    }
}

/**
 * Calculates and renders the progress of a task based on its subtasks.
 * @param {Object} task - The task object containing subtasks.
 * @param {number} index - The index of the task in the list.
 */
function renderSubtaskBar(task, index) {
    let amount = task.subtask.filter((c) => c.checked == true).length;
    let total = task.subtask.length;
    let result = Math.round((100 / total) * amount) + "%";
    document.getElementById(`${task.category}-amount${index}`).innerHTML = `${amount}/${total} Subtasks`;
    document.getElementById(`${task.category}progress-bar${index}`).classList.remove("d-none");
    document.getElementById(`${task.category}-progress${index}`).style.width = result;
}

/**
 * Renders up to three assigned contacts for a task, and shows the number of additional contacts if any.
 * @param {Object} task - The task object containing assigned contacts.
 * @param {number} index - The index of the task in the list.
 */
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
        imgRef.classList.remove("d-none");
    }
}

////////////////////////////////////////
///  Board Drag and Drop Functions   ///
///////////////////////////////////////

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

/////////////////////////////////////////////
///  Task Overlay - Show Task Functions   ///
////////////////////////////////////////////

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

/////////////////////////////////////////////////////
///   Task Overlay - Check Subtasks Functions    ///
///////////////////////////////////////////////////

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
    currentTask.subtask[subIndex].checked = !currentTask.subtask[subIndex].checked;
    setCheck();
    await putData(
        (path = `/tasks/${currentTask.taskKey}/subtask/${subIndex}`),
        (data = {
            checked: currentTask.subtask[subIndex].checked,
            sub: currentTask.subtask[subIndex].sub,
        })
    );
    await getTasks();
    await resetBoard();
}

////////////////////////////////////////
//    Edit Task Overlay Functions   ///
///////////////////////////////////////

function showEditTaskValues() {
    document.getElementById("overlaver").innerHTML = editBoardTaskHTML(currentTask);
    editTaskAssignTo();
    editTaskSubtask();
    updateBtnColor(currentTask.prio);
    taskPrioText();
}

function editTaskAssignTo() {
    selectedContacts = []; //Required, to clear the Array from the Edit-Task before    //// Anpassungen
    getSelectedContacts();
    if (currentTask.assignedTo) {
        findCheckedContacts(currentTask);
        renderContacts(selectedContacts);
        renderSelectedContacts();
    }
}

function taskPrioText() {
    if (currentTask.prio) {
        document.getElementById("prio").innerHTML = currentTask.prio.charAt(0).toUpperCase() + currentTask.prio.slice(1);
    } else {
        document.getElementById("prio").innerHTML = "No Prio";
    }
}

function editPrio(prioInput) {
    if (prioInput == currentTask.prio) {
        currentTask.prio = null;
    } else {
        currentTask.prio = prioInput;
    }
    updateBtnColor(currentTask.prio);
}

function findCheckedContacts(currentTask) {
    selectedContacts.forEach((selectedContact) => {
        currentTask.assignedTo.forEach((assignedContact) => {
            if (assignedContact.name === selectedContact.name) {
                selectedContact.checked = true;
            }
        });
    });
}

///////////////////////////////////////////////
///   Edit Task Overlay - Edit Subtasks    ///
//////////////////////////////////////////////

function editTaskSubtask() {
    if (currentTask.subtask) {
        renderSubtaskEdit(currentTask.subtask);
        currentSubtasks = [];
        currentSubtasks.push(...currentTask.subtask);
    }
}

function renderSubtaskEdit(subtasks) {
    let subTaskRef = document.getElementById("subtasks-container");
    subtasks.forEach((subtask, i) => {
        subTaskRef.innerHTML += subtaskTaskHTML(subtask, i);
    });
}

function saveWord(index) {
    const newValue = document.getElementById(`editInput${index}`).value;
    currentSubtasks[index].sub = newValue;
    renderSubtaskEdit(currentSubtasks);
}

function deleteSubtask(i) {
    currentSubtasks.splice(i, 1);
    renderSubtaskEdit(currentSubtasks);
    classChangeAction("overlaver", "overlaver-active", "remove");
}

///////////////////////////////////////////////////////
///   Edit Task Overlay - PUT  Firebase / Board    ///
/////////////////////////////////////////////////////

async function editTask() {
    await putData(
        (path = `/tasks/${currentTask.taskKey}`),
        (data = {
            id: currentTask.id,
            category: currentTask.category,
            categoryText: currentTask.categoryText,
            title: document.getElementById("edit-title-input").value,
            description: document.getElementById("edit-textarea").value,
            date: document.getElementById("edit-date-input").value,
            prio: currentTask.prio,
            assignedTo: filterCheckedAssignedTo(),
            subtask: currentSubtasks,
            taskKey: currentTask.taskKey,
        })
    );
    await resetBoard();
    openTask(currentTask.id);
}

//////////////////////////////////////////////////////
///  Edit Task Overlay - Delete  Firebase Board   ///
/////////////////////////////////////////////////////

async function deleteTask() {
    classChangeAction("overlaver", "overlaver-active", "remove");
    await deleteData((path = `/tasks/${currentTask.taskKey}`), (data = {}));
    resetBoard();
}

//////////////////////////////////////////////////
///     Mobile  Drag and Drop  Button Version  ///
/////////////////////////////////////////////////

function openTaskMoveOptions(taskId) {
    document.getElementById(`task-move-list${taskId}`).classList.toggle("show-drop-list");
}

async function moveTaskTo(taskId, category) {
    await putData(
        (path = `/tasks/${tasksArray[taskId].taskKey}/`),
        (data = {
            id: taskId,
            category: category,
            categoryText: tasksArray[taskId].categoryText,
            title: tasksArray[taskId].title,
            description: tasksArray[taskId].description,
            date: tasksArray[taskId].date,
            prio: tasksArray[taskId].prio,
            assignedTo: tasksArray[taskId].assignedTo,
            subtask: tasksArray[taskId].subtask,
            taskKey: tasksArray[taskId].taskKey,
        })
    );
    await resetBoard();
}

//////////////////////////////////////////
///     Board Search Task Function     ///
/////////////////////////////////////////

/**
 * Filters and renders tasks across different categories based on the search input.
 *
 * @param {string} screen - The current screen (used for search input identification).
 */
function filterBoardTasks(screen) {
    taskCounter = 0;
    let search = document.getElementById(`search-task-${screen}`).value;
    search = search.toLowerCase();
    let todoById = document.getElementById("to-do-container");
    let progressById = document.getElementById("in-progress-container");
    let feedbackById = document.getElementById("await-feedback-container");
    let doneById = document.getElementById("done-container");
    renderTasks(filterSearchTasks("todo", search), todoById, "To do");
    renderTasks(filterSearchTasks("progress", search), progressById, "Progress");
    renderTasks(filterSearchTasks("feedback", search), feedbackById, "Feedback");
    renderTasks(filterSearchTasks("done", search), doneById, "Done");
    foundTasks(screen);
}

function foundTasks(screen) {
    let numberOfTasksRef = document.getElementById(`nummber-of-${screen}`);
    if (taskCounter == 0) {
        numberOfTasksRef.innerHTML = `No task found`;
    } else if (taskCounter == 1) {
        numberOfTasksRef.innerHTML = `${taskCounter} found task`;
    } else {
        numberOfTasksRef.innerHTML = `${taskCounter} found tasks`;
    }
}

function filterSearchTasks(task, search) {
    let filterArray = tasksArray.filter((t) => t["category"] == task);
    let filterTasks = [];
    for (let i = 0; i < filterArray.length; i++) {
        let tasks = filterArray[i];
        if (tasks.title.toLowerCase().includes(search) || tasks.description.toLowerCase().includes(search)) {
            filterTasks.push(tasks);
        }
    }
    return filterTasks;
}

//////////////////////////////////////////
///    Scroll to Section Function     ///
/////////////////////////////////////////

window.addEventListener("load", function () {
    let section = window.location.hash.substring(1);
    console.log(section);

    section = section.slice(1);
    if (section) {
        setTimeout(function () {
            scrollToSection(section);
        }, 100);
    }
});

function scrollToSection(section) {
    let sectionColumn = document.getElementById(section);
    if (sectionColumn) {
        sectionColumn.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "nearest",
        });
    }
}
