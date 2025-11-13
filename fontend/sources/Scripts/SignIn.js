const toggle = document.querySelector(".password-box .toggle i");
const password_Input = document.getElementById("create-password");

toggle.addEventListener("click", () => {
  if (password_Input.type === "password") {
    password_Input.type = "text";
    toggle.classList.remove("fa-eye-slash");
    toggle.classList.add("fa-eye");
  } else {
    password_Input.type = "password";
    toggle.classList.remove("fa-eye");
    toggle.classList.add("fa-eye-slash");
  }
});
