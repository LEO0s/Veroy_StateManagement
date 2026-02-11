const appState = {
    studentType: "", religion: "", civilStatus: "",
    firstName: "", middleName: "", lastName: "",
    suffix: "", contactNumber: "", birthDate: "",
    sex: "", email: "", nationality: ""
};

const form = document.getElementById('applicationForm');
const inputs = document.querySelectorAll('.form-control');

inputs.forEach(input => {
    input.addEventListener('input', (e) => {
        appState[e.target.name] = e.target.value;
        if (e.target.value.trim() !== "") clearError(e.target);
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
        localStorage.setItem('enrollmentData', JSON.stringify(appState));
        alert("Application Saved to Local Storage!");
        console.log("Saved State:", appState);
    }
});

function validateForm() {
    let isValid = true;
    const required = ['studentType', 'religion', 'civilStatus', 'firstName', 'lastName', 'contactNumber', 'birthDate', 'sex', 'email', 'nationality'];
    
    required.forEach(field => {
        const el = document.querySelector(`[name="${field}"]`);
        if (!appState[field] || appState[field].trim() === "") {
            showError(el, "Required");
            isValid = false;
        }
    });
    return isValid;
}

function showError(input, msg) {
    input.classList.add('error');
    input.nextElementSibling.textContent = msg;
}

function clearError(input) {
    input.classList.remove('error');
    input.nextElementSibling.textContent = "";
}

window.addEventListener('load', () => {
    const data = localStorage.getItem('enrollmentData');
    if (data) {
        const parsed = JSON.parse(data);
        Object.assign(appState, parsed);
        Object.keys(parsed).forEach(key => {
            const el = document.querySelector(`[name="${key}"]`);
            if (el) el.value = parsed[key];
        });
    }
});