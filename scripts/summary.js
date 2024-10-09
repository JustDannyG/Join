function summaryInit() {
    greeting()
    greetingUser()
    getSummaryTasks()
}

////////////////////////////////////////////
///           Greeting Functions      /////
//////////////////////////////////////////



function greeting(){
    let greeting = document.getElementById('greeting-time').innerHTML = greetingTime();
    let greetUser = document.getElementById('greeting-name').innerHTML = greetingUser();

    let greetingMobile = document.getElementById('greeting-time-mobile').innerHTML = greetingTime();
    let greetUserMobile = document.getElementById('greeting-name-mobile').innerHTML = greetingUser();
}

function greetingTime() {
    let A = new Date();
    let hour = A.getHours();
    console.log(hour);
    if (hour < 12) {
        return `Good morning,`
        
    } else if (hour < 17) {
        return`Good afternoon,`
    } else if (hour < 24) {
        return  `Good evening,`
    }
}


function greetingUser() {
    return user;
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