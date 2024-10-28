function formValidation(name, email, phone, mode) {
    let isValid = true;
    let nameError = document.getElementById(`name_error_${mode}`);
    let emailError = document.getElementById(`email_error_${mode}`);
    let phoneError = document.getElementById(`phone_error_${mode}`);
    nameError.innerHTML = "";
    emailError.innerHTML = "";
    phoneError.innerHTML = "";
    let nameCheck = checkName(name, nameError)
    let emailCheck = checkEmail(email, emailError)
    let phoneCheck = checkPhone(phone, phoneError)
    if (true == nameCheck && emailCheck && phoneCheck) {
        return isValid;
    }
    addErrorClasses(nameError, emailError, phoneError)
    return false;
}

function addErrorClasses(nameError, emailError, phoneError) {
    nameError.classList.add("error-message");
    emailError.classList.add("error-message");
    phoneError.classList.add("error-message");
}

function check() {
    checkName(name, nameError)
    checkEmail(email, emailError)
    checkPhone(phone, phoneError)
}


function checkName(name, nameError) {
    let isValid = true;
    if (!name || name.trim() === "") {
        nameError.innerHTML = "Name is required";
        isValid = false;
    } else if (name[0] !== name[0].toUpperCase()) {
        nameError.innerHTML = "Name should start with a capital letter";
        isValid = false;
    }
    return isValid
}

function checkEmail(email, emailError) {
    let isValid = true;
    if (!email || email.trim() === "") {
        emailError.innerHTML = "Email is required";
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.innerHTML = "Please enter a valid email";
        isValid = false;
    }
    return isValid
}

function checkPhone(phone, phoneError) {
    let isValid = true;
    if (!phone || phone.trim() === "") {
        phoneError.innerHTML = "Phone number is required";
        isValid = false;
    } else if (!/^\d+$/.test(phone)) {
        phoneError.innerHTML = "Phone number should contain only numbers";
        isValid = false;
    }
    return isValid
}


function addTaskValidation() {
    let isValid = true;
    let addTaskTitle = document.getElementById('title-error');
    let addTaskDate = document.getElementById('date-error');
    let addTaskCategory = document.getElementById('category-error');

    addTaskTitle.innerHTML = "";
    addTaskDate.innerHTML = "";
    addTaskCategory.innerHTML = "";

    let titleCheck = checkTitle(addTaskTitle);
    let dateCheck = checkDate(addTaskDate);
    let categoryCheck = checkCategory(addTaskCategory);
    if (true == titleCheck && dateCheck && categoryCheck) {
        return isValid;
    }
    addErrorClasses(addTaskTitle, addTaskDate, addTaskCategory)
    return false;
}

function checkTitle(addTaskTitle) {
    let title = document.getElementById("title").value;
    let isValid = true;
    if (!title) {
        addTaskTitle.innerHTML = "Title is required";
        isValid = false;
    }
    return isValid;
}

function checkDate(addTaskDate) {
    let date = document.getElementById("date").value;
    let isValid = true;
    if (!date) {
        addTaskDate.innerHTML = "Date is required";
        isValid = false;
    } else if (currentDate() > date) {
        addTaskDate.innerHTML = `Value must be ${currentDate()} or later.`;
        isValid = false;
    }
    return isValid;
}

function checkCategory(addTaskCategory) {
    let category = document.getElementById("selected-category").value;
    let isValid = true;
    if (!category) {
        addTaskCategory.innerHTML = "Category is required";
        isValid = false;
    }
    return isValid;
}

function currentDate() {
    const date = new Date();
    let currentDay = String(date.getDate()).padStart(2, '0');
    let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
    let currentYear = date.getFullYear();
    let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

    return currentDate;
}

document.querySelector('#date').min = currentDate();