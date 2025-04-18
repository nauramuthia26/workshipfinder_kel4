document.addEventListener("DOMContentLoaded", () => {
    const authLink = document.getElementById("auth-link");
  
    if (authLink) {
      if (localStorage.getItem("isLoggedIn") === "true") {
        authLink.textContent = "Logout";
        authLink.href = "#";
        authLink.addEventListener("click", (e) => {
          e.preventDefault();
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("userId");
          window.location.href = "login.html";
        });
      } else {
        authLink.textContent = "Login";
        authLink.href = "login.html";
      }
    }
  });
  