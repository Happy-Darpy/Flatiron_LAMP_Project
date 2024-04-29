function preventNavigation() {
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL);
    });
  };

  const email = localStorage.getItem("email");
  const textField = document.getElementById("email");
  textField.textContent = email;
  console.log(email);