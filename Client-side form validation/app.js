const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const passwordCheck = document.querySelector('#password-check');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
})

function checkInputs() {
    // trim to remove all whitespace from string
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const passwordCheckValue = passwordCheck.value.trim();
    // check if username is valid
    if (usernameValue === '') {
        setErrorFor(username, 'Username cannot be blank');
    } else {
        setSuccessFor(username);
    }

    // check for valid email address
    if (emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Please enter a valid email');
    } else {
        setSuccessFor(email)
    }

    // check if password meets requirements
    if (passwordValue.length < 8) {
        setErrorFor(password, 'Password must be at least 8 characters');
    } else {
        setSuccessFor(password);
    }

    // check if passwords match
    if (passwordCheckValue === '') {
        setErrorFor(passwordCheck, 'Field cannot be empty')
    } else if (passwordCheckValue === passwordValue) {
        setSuccessFor(passwordCheck);
    } else {
        setErrorFor(passwordCheck, 'Passwords do not match');
    }
    // verifies everything has been filled out correctly
    checkForm();

}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.innerText = message
    formControl.className = 'form-control error';
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function checkForm() {
    if (username.parentElement.className === 'form-control success'
        && email.parentElement.className === 'form-control success'
        && password.parentElement.className === 'form-control success'
        && passwordCheck.parentElement.className === 'form-control success') {
        alert('Welcome to your new account!')
    }
}