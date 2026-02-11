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
        const name = e.target.getAttribute('name');
        appState[name] = e.target.value;
        localStorage.setItem('enrollmentData', JSON.stringify(appState));
        
        if (e.target.value.trim() !== "") {
            e.target.classList.remove('error');
            const errorMsg = e.target.nextElementSibling;
            if (errorMsg) errorMsg.textContent = "";
        }
    });
});

function loadSavedData() {
    const data = localStorage.getItem('enrollmentData');
    if (data) {
        const parsed = JSON.parse(data);
        Object.assign(appState, parsed);
        Object.keys(parsed).forEach(key => {
            const el = document.querySelector(`[name="${key}"]`);
            if (el) el.value = parsed[key];
        });
    }
}

loadSavedData();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
        alert("Application Submitted Successfully!");
    }
});

function validateForm() {
    let isValid = true;
    const required = ['studentType', 'religion', 'civilStatus', 'firstName', 'lastName', 'contactNumber', 'birthDate', 'sex', 'email', 'nationality'];
    
    required.forEach(field => {
        const el = document.querySelector(`[name="${field}"]`);
        if (!appState[field] || appState[field].trim() === "") {
            el.classList.add('error');
            if (el.nextElementSibling) el.nextElementSibling.textContent = "Required";
            isValid = false;
        }
    });
    return isValid;
}