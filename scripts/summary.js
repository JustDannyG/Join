function summaryInit() {
    greetingTime()
    greetingUser()
    getSummaryTasks()
}

////////////////////////////////////////////
///           Greeting Functions      /////
//////////////////////////////////////////

function greetingTime() {
    let A = new Date();
    let hour = A.getHours();
    console.log(hour);
    let greeting = document.getElementById('greeting-time');
    if (hour < 12) {
        greeting.innerHTML = `Good morning,`
    } else if (hour < 17) {
        greeting.innerHTML = `Good afternoon,`
    } else if (hour < 24) {
        greeting.innerHTML = `Good evening,`
    }
}


function greetingUser() {
    let greetUser = document.getElementById('greeting-name');
    greetUser.innerHTML = user;
}


////////////////////////////////////////////
///        Filter Summary Tasks      /////
//////////////////////////////////////////


async function getSummaryTasks() {
    await getTasks();
    document.getElementById('task-count-todo').innerHTML = summaryTaskFilter('todo');
    document.getElementById('task-count-progress').innerHTML = summaryTaskFilter('progress');
    document.getElementById('task-count-feedback').innerHTML = summaryTaskFilter('feedback');
    document.getElementById('task-count-done').innerHTML = summaryTaskFilter('done');
    document.getElementById('task-count-urgent').innerHTML = summaryPrioFilter('urgent');
    document.getElementById('task-count-board').innerHTML = tasksArray.length;
}


function summaryTaskFilter(section) {
    // let urgents = document.getElementById(`task-count-${category}`);
    let task = tasksArray.filter(t => {
        if (t.category == section) {
            return t
        }
    })
    return task.length;
}


function summaryPrioFilter(section) {
    // let urgents = document.getElementById(`task-count-${category}`);
    let task = tasksArray.filter(t => {
        if (t.prio == section) {
            return t
        }
    })
    return task.length;
}