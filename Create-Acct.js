let firstName = document.getElementsByName('FirstName')[0];
let lastName = document.getElementsByName('LastName')[0];
let userName = document.getElementsByName('UserName')[0];
let password = document.getElementsByName('password')[0];
let pconfirm = document.getElementsByName('pconfirm')[0];
let email = document.getElementsByName('email')[0];
let form = document.getElementsByName('CreateAcct')[0];
let formErrorType = { Valid: 0, Missing : 4, Invalid : 1};
// Assocaitive-Array will have 0 if there is no problem...
let formError = {regex_check : formErrorType.Missing, 
                    password_req : formErrorType.Missing, 
                    passwd_match : formErrorType.Missing};

function check_name_input(event){
    let input_field = event.target.value;
    let input_name = event.target.name;
    const reg_names = /^[A-Za-z\s]+$/;
    const reg_nameAlphaNumeric = /^[A-Za-z][A-Za-z0-9]{7,}$/;
    const reg_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
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
            break;
    }

    if (valid_input.test(input_field)) {
        event.target.style.color = 'black';
        formError['regex_check'] = formErrorType.Valid;
    }
    else {
        event.target.style.color = 'red';
        formError['regex_check'] = formError.Invalid;
    };

    if (input_field === "") {
        event.target.syle.color = 'black';
        formError['regex_check'] = formErrorType.Missing;
    };
};

function check_password_strength(event){
    const input_field = event.target.value;
    const regex_pass_weak = /^.*[0-9].*$/;
    const regex_pass_medium = /^.*[!@#$%^&*()-_=+[\]{};:\'",.<>\/?].*/
    const regex_pass_strong = /^.(15,31)$/
    let elmPasswordStrength = document.getElementById("password_strength");
    let textPasswordStrength = "";

    lenPasswd = input_field.length;
    if ((lenPasswd < 8 && lenPasswd > 0) || lenPasswd > 31) {
        textPasswordStrength = "minimum 8 maximum 31 characters";
        formError['password_req'] = formErrorType.Invalid;
    }
    else {
        // value of password_strength reflects how many of the
        // regex test returned true
        let password_strength = regex_pass_weak.test(input_field) ? 1 : 0;
        password_strength += regex_pass_medium.test(input_field) ? 1 : 0;
        password_strength += regex_pass_strong.test(input_field) ? 1 : 0;

        // password_strength = 0 -> Too weak
        // password_strength = 1 -> weak
        // password_strength = 2 -> medium
        // password_strength = 3 -> strong
        switch (password_strength) {
            case 0: 
                textPasswordStrength = "Too Weak!!";
                break;
            case 1:
                textPasswordStrength = "Weak!";
                break;
            case 2:
                textPasswordStrength = "Medium Strength";
                break;
            case 3:
                textPasswordStrength = "Strong Password";
                break;
            default:
                alert("what??");
        }
    }

    if (input_field==0) { 
        textPasswordStrength = "";
        formError['password_req'] = formErrorType.Missing;
    };
    elmPasswordStrength.innerHTML = textPasswordStrength;
    formError['password_req'] = formErrorType.Valid;
    
};

function check_if_password_match(event){
    let confirm_passwd = event.target.value;
    let entered_passwd = password.value;
    let elmPassMatchMessage = document.getElementById("matched_passwd");
    let passwd_match = "";

    if (confirm_passwd != entered_passwd) {
        passwd_match = "Passwords don't match!";
        formError['passwd_match'] = formErrorType.Invalid;
    }
    else {
        passwd_match = "Passwords match.";
        formError['passwd_match'] = formErrorType.Valid;
    }

    if (confirm_passwd == "") { 
        elmPassMatchMessage.innerHTML = "";
        formError['passwd_match'] = formErrorType.Missing;
    }
    else {
        elmPassMatchMessage.innerHTML = passwd_match;
    }

}

function clear_button_clicked(event) {
    location.reload();
};

form.addEventListener("submit", function (event){
    let submitError = document.getElementById("submitError");
    let errorMsg = "";

    //error check
    console.log("entered submit call back");

    event.preventDefault();
    let errCheck = formError['regex_check'] + 
                    formError['password_req'] +
                    formError['passwd_match'];
    
    if (errCheck != 0) {
        submitError.style.color = 'red';
    }
    else {
        submitError.style.color = 'black';
    }

    switch (true) {
        case (errCheck > 4):
            errorMsg = "One or More Entry is Missing!";
            submitError.innerHTML = errorMsg;
            return;
        case (errCheck > 0):
            errorMsg = "One or More Entry is Invalid!";
            submitError.innerHTML = errorMsg;
            return;
    }
    let email_address = email.getAttribute.value;
    localStorage.setItem("email",email_address);
    form.submit();
});

document.addEventListener('DOMContentLoaded', function () {
    firstName.addEventListener('input',check_name_input);
    lastName.addEventListener('input',check_name_input);
    userName.addEventListener('input',check_name_input);
    password.addEventListener('input',check_password_strength);
    pconfirm.addEventListener('input',check_if_password_match);
    email.addEventListener('input',check_name_input)
});