function preventNavigation() {
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL);
    });
  };

  const email = localStorage.getItem("email");
  //const confirm = localStorage.getItem("confirm");
  const textField = document.getElementById("email");
  //textField.textContent = email + ": " /*+ confirm;*/
  textField.textContent = email;