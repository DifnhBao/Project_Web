const passwordInput = document.getElementById("password");
const reqLetter = document.getElementById("req-letter");
const reqDigit = document.getElementById("req-digit");
const reqLength = document.getElementById("req-length");

passwordInput.addEventListener("input", function () {
  const value = passwordInput.value;
  document.querySelector(".rules").classList.add("visible");

  // Điều kiện 1: có ít nhất 1 chữ cái
  if (/[a-zA-Z]/.test(value)) {
    reqLetter.classList.add("valid");
    reqLetter.classList.remove("invalid");
  } else {
    reqLetter.classList.add("invalid");
    reqLetter.classList.remove("valid");
  }

  // Điều kiện 2: có ít nhất 1 số hoặc ký tự đặc biệt
  if (/[0-9#?!&]/.test(value)) {
    reqDigit.classList.add("valid");
    reqDigit.classList.remove("invalid");
  } else {
    reqDigit.classList.add("invalid");
    reqDigit.classList.remove("valid");
  }

  // Điều kiện 3: độ dài >= 10
  if (value.length >= 10) {
    reqLength.classList.add("valid");
    reqLength.classList.remove("invalid");
  } else {
    reqLength.classList.add("invalid");
    reqLength.classList.remove("valid");
  }
});

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
