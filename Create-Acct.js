let firstName = document.getElementsByName('FirstName')[0];
let lastName = document.getElementsByName('LastName')[0];
let userName = document.getElementsByName('UserName')[0];
let password = document.getElementsByName('password')[0];
let pconfirm = document.getElementsByName('pconfirm')[0];
let email = document.getElementsByName('email')[0];
let email_confirm = "";
let formErrorType = { Valid: 0, Invalid : 1, Missing : 2};
let formError = {};
// Assocaitive-Array will have 0 if there is no problem...

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
        formError[input_name] = formErrorType.Valid;
    }
    else {
        event.target.style.color = 'red';
        formError[input_name] = formErrorType.Invalid;
    };

    if (input_field == "") {
        event.target.style.color = 'black';
        formError[input_name] = formErrorType.Missing;
    };
};

function check_password_strength(event) {
    const input_field = event.target.value;
    const input_name = event.target.name;
    const regex_pass_weak = /^.*[0-9].*$/;
    const regex_pass_medium = /^.*[!@#$%^&*()-_=+[\]{};:\'",.<>\/?].*/
    const regex_pass_strong = /^.(15,31)$/
    let elmPasswordStrength = document.getElementById("password_strength");
    let textPasswordStrength = "";

    lenPasswd = input_field.length;

    if ((lenPasswd < 8 && lenPasswd > 0) || lenPasswd > 31) {
        textPasswordStrength = "minimum 8 maximum 31 characters";
        formError[input_name] = formErrorType.Invalid;
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
        formError[input_name] = formErrorType.Valid;
    }

    if (lenPasswd==0) { 
        textPasswordStrength = "";
        formError[input_name] = formErrorType.Missing;
    };
    elmPasswordStrength.innerHTML = textPasswordStrength;  
};

function check_if_password_match(event){
    let confirm_passwd = event.target.value;
    const input_name = event.target.name;
    let entered_passwd = password.value;
    let elmPassMatchMessage = document.getElementById("matched_passwd");
    let passwd_match = "";

    if (confirm_passwd != entered_passwd) {
        passwd_match = "Passwords don't match!";
        formError[input_name] = formErrorType.Invalid;
    }
    else {
        passwd_match = "Passwords match.";
        formError[input_name] = formErrorType.Valid;
    }

    if (confirm_passwd == "") { 
        elmPassMatchMessage.innerHTML = "";
        formError[input_name] = formErrorType.Missing;
    }
    else {
        elmPassMatchMessage.innerHTML = passwd_match;
    }
}

function clear_button_clicked(event) {
    location.reload();
};

function onclick_submit()
{
    let myForm = document.getElementsByName("CreateAcct")[0];
    let submitError = document.getElementById("submitError");

    //error check
    console.log("entered submit call back");

    for (key in formError) {
      let is_false = false;
      let errorMsg = "";

      submitError.style.font = 'red';

      if (formError[key] == formErrorType.Missing) {
         errorMsg = "One or More Entry is Missing!";
         is_false = true;
      }
      if (formErro[key] == formErrorType.Invalid) {
          errorMsg = "One or More Entry is Invalid!";t
          is_false = true;
      }
      if (is_false) {
        submitError.innerHTML = errorMsg;
        return false;
      }

      submitError.style.font = 'black';
    }

    let email_address = email.value;
    localStorage.setItem("email",email_address);
    return false;
}

document.addEventListener('DOMContentLoaded', function () {
    firstName.addEventListener('input',check_name_input);
    lastName.addEventListener('input',check_name_input);
    userName.addEventListener('input',check_name_input);
    password.addEventListener('input',check_password_strength);
    pconfirm.addEventListener('input',check_if_password_match);
    email.addEventListener('input',check_name_input)
});