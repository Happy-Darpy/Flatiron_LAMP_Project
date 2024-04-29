function preventNavigation() {
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL);
    });
  };

  const email = localStorage.getItem("email");
  console.log("email is" + email);
  const textField = document.getElementById("email");
  textField.textContent = email;