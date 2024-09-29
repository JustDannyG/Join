let currentDraggedElement;
let tasksArray = [];

async function init() {
    await getContacts();
    await getTasks();
    updateHtml();
}

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
            'prio': task.prio
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

            getById.innerHTML += generateTaskHTML(task, index);
            renderAssignedToContacts(task, index);
            renderPrio(task)
        }
    }
}


function renderAssignedToContacts(task, index) {
    const assignedToContainer = document.getElementById(`${task.category}contatcs-container${index}`);
    task.assignedTo.forEach((c, i) => {
        assignedToContainer.innerHTML += `
    <div class="c${i} contact center" style="background-color:${c.color}">${createInititals(c.name)}</div>`;
    });
}

function renderPrio(task) {
    const imgRef = document.getElementById(`${task.category}prio-icon`)
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

