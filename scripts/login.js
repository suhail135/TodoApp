const USER = 'admin';
const PASS_WORD = '12345'

var username = document.getElementById('inputUser');
var password = document.getElementById('inputPassword')
var errorMessage = document.getElementById('showMessage')
var checkBox = document.getElementById('checkBox')

window.onload = function () {
    loadFromLoacal()
}

// navigateToDashBoard = () => {
//     window.open("../Home/dashboard.html", "_self")
// }

restError = () => {
    errorMessage.setAttribute('hidden', 'true')
}

loadFromLoacal = () => {
    if (localStorage.getItem("user") && localStorage.getItem("password")) {
        username.value = localStorage.getItem("user");
        password.value = localStorage.getItem("password");
        checkBox.checked = true
    }

}

Validate = (callback1) => {
    if (username.value.trim().length <= 0) {
        username.classList.add('is-invalid')
        username.focus()
        return false
    } else if (password.value.trim().length <= 0) {
        password.classList.add('is-invalid')
        password.focus()
        return false
    } else {
        return callback1(username.value, password.value);
    }

}

Login = (username, password) => {

    console.log('Log in called');
    if (username === USER && password === PASS_WORD) {
        console.log('Success!!');
        var checkBoxValue = $('#checkBox').is(':checked') ? $('#checkBox').val() : false;
        if (checkBoxValue === 'remember-me') {
            localStorage.setItem("user", username);
            localStorage.setItem("password", password);
        }
        return true
    } else {
        errorMessage.removeAttribute('hidden')
        return false
    }

}

