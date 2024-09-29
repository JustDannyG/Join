// let prio;
let subtaskArray = [];
let categoryInput;

let curretCategory = 'todo';

// let taskId;

async function createTask() {
    getInputs();
}

function getInputs() {
    let titleInput = document.getElementById("title");
    let descriptionInput = document.getElementById("description");
    let dateInput = document.getElementById("date");
    let assignedTo = selectedContacts;

    // console.log(titleInput.value);
    // console.log(descriptionInput.value);
    // console.log(dateInput.value);
    // console.log(assignedTo);

    task = {
        'title': titleInput.value,
        'description': descriptionInput.value,
        'date': dateInput.value,
        'assignedTo': assignedTo

    }
    postTask(task);
}

async function postTask(task) {
    await postData(path = "/tasks", data = {
        'title': task.title,
        'description': task.description,
        'date': task.date,
        'assignedTo': task.assignedTo,
        'category': curretCategory
    })
}