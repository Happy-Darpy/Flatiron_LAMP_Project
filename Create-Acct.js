let firstName = document.getElementsByName('FirstName')[0];
let lastName = document.getElementsByName('LastName')[0];
let userName = document.getElementsByName('UserName')[0];
let password = document.getElementsByName('password')[0];
let pconfirm = document.getElementsByName('pconfirm')[0];
let email = document.getElementsByName('email')[0];

function check_name_input(event){
    let input_field = event.target.value;
    let input_name = event.target.name;
    const reg_names = /^[A-Za-z\s]+$/;
    const reg_nameAlphaNumeric = /^[A-Za-z][A-Za-z0-9]{7,}$/;
    const reg_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/
    let valid_input = null;

    switch (input_name) {
        case 'FirstName':
        case 'LastName': 
            valid_input = reg_names;
            break;
        case 'UserName':
            valid_input = reg_nameAlphaNumeric;
            break;
        case 'email':
            valid_input = reg_email;
    }

    if (valid_input.test(input_field)) {
        event.target.style.color = 'black';
    }
    else {
        event.target.style.color = 'red';
    }
};

function check_password_strength(event){
    
};

function check_if_password_match(event){

}

document.addEventListener('DOMContentLoaded', function () {
    firstName.addEventListener('input',check_name_input);
    lastName.addEventListener('input',check_name_input);
    userName.addEventListener('input',check_name_input);
    password.addEventListener('password',check_password_strength);
    pconfirm.addEventListener('password',check_if_password_match);
    email.addEventListener('email',check_name_input)
});