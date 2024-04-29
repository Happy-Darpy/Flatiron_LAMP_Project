const email = localStorage.getItem("email");
const textField = document.getElementById("email");


function loadbody() {
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL);
    });
    textField.innerHTML = email;
  };