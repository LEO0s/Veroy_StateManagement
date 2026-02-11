const appState = {
    studentType: "",
    religion: "",
    civilStatus: "",
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    contactNumber: "",
    birthDate: "",
    sex: "",
    email: "",
    nationality: ""
};

const form = document.getElementById('applicationForm');
const inputs = document.querySelectorAll('.form-control');

inputs.forEach(input => {
    input.addEventListener('input', (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        appState[fieldName] = fieldValue;
        if (fieldValue.trim() !== "") {
            clearError(e.target);
        }
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
        saveToLocalStorage();
        alert("Success: Form state has been saved to Local Storage.");
        console.log("Current State:", appState);
    }
});

function validateForm() {
    let isValid = true;
    const requiredFields = [
        'studentType', 'religion', 'civilStatus', 
        'firstName', 'lastName', 'contactNumber', 
        'birthDate', 'sex', 'email', 'nationality'
    ];
    requiredFields.forEach(field => {
        const inputElement = document.querySelector(`[name="${field}"]`);
        const value = appState[field];
        if (!value || value.trim() === "") {
            showError(inputElement, "This field is required.");
            isValid = false;
        } else {
            clearError(inputElement);
        }
    });
    return isValid;
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorDisplay = formGroup.querySelector('.error-msg');
    input.classList.add('error');
    if (errorDisplay) {
        errorDisplay.textContent = message;
    }
}

function clearError(input) {
    const formGroup = input.parentElement;
    const errorDisplay = formGroup.querySelector('.error-msg');
    input.classList.remove('error');
    if (errorDisplay) {
        errorDisplay.textContent = "";
    }
}

function saveToLocalStorage() {
    localStorage.setItem('enrollmentData', JSON.stringify(appState));
}

window.addEventListener('load', () => {
    const savedData = localStorage.getItem('enrollmentData');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        Object.assign(appState, parsedData);
        for (const key in parsedData) {
            const input = document.querySelector(`[name="${key}"]`);
            if (input) {
                input.value = parsedData[key];
            }
        }
    }
});