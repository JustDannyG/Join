let currentDraggedElement;

let tasksArray = [
    // {
    //     'title': 'Einkaufen',
    //     'category': 'todo',
    //     'id': 0
    // },
    // {
    //     'title': 'Auto waschen',
    //     'category': 'feedback',
    //     'id': 2
    // },
    // {
    //     'title': 'Wäsche waschen',
    //     'category': 'done',
    //     'id': 3
    // },
    // {
    //     'title': 'Training',
    //     'category': 'todo',
    //     'id': 4
    // }
];


async function init() {
    await getContacts()
    await getTasks();
    updateHtml();
    console.log(contacts);
    
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
            'category' : task.category
        });
    }
    console.log(tasksArray);
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
    if (tasks.length == 0) {
        getById.innerHTML += generateNoTaskHTML();
    } else {
        for (let index = 0; index < tasks.length; index++) {
            const task = tasks[index];
            getById.innerHTML += generateTaskHTML(task);
        }
    }
}




function generateTaskHTML(task) {
    return `<div class="task">
                <div class="task-category">User Story</div>
                <h4 class="task-title">${task.title}</h4>
                <div class="task-description">${task.description}</div>
                <div class="d-flex task-amount-container">
                    <div class="progress-bar">
                        <div class="progress"></div>
                    </div>
                    <div class="task-amount">1/2 Subtask</div>
                </div>
                <div class="d-flex task-footer">
                    <div class="d-flex contatcs-container">
                        <div class="c1 contact center">am</div>
                        <div class="c2 contact center">em</div>
                        <div class="c3 contact center">mb</div>
                    </div>
                    <button><img class="prio-icon" src="./assets/icons/prio-medium-icon.png" alt=""></button>
                </div> `;
}


function generateNoTaskHTML() {
    return `<div class="no-task"> No task To do</div> `;
}
