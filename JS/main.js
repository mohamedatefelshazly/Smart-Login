// Select HTML Elemnts and declare variables
var frameId = document.getElementById("frameId");
var signNameId = document.getElementById("signNameId");
var inputEmailId = document.getElementById("inputEmailId");
var inputPasswordId = document.getElementById("inputPasswordId");
var loginBtn = document.getElementById("loginBtn");
var Signupbtn = document.getElementById("Signupbtn");
var displayId = document.getElementById("displayId");
var p = document.querySelector("p");
var span = document.querySelector("span");
var signupId = document.getElementById("signupId");
var signupIdparent = document.getElementById("signupIdparent");
var loginIdparent = document.getElementById("loginIdparent");
var loginId = document.getElementById("loginId");
var smartLoginId = document.getElementById("smartLoginId");
var logoutbtn = document.getElementById("logoutbtn");
var users = [];
var index;
// call Localstorage saved Data
if (localStorage.getItem("users") != null) {
  users = JSON.parse(localStorage.getItem("users"));
}
// Login Page==============>
loginBtn.addEventListener("click", function () {
  if (validUser()) {
    frameId.classList.add("d-none");
    smartLoginId.classList.remove("d-none");
    displayId.innerHTML = `<h1>Welcome ${users[index].userName}</h1>`;
    clearInputs();
  } else {
    p.classList.remove("d-none");
    p.innerHTML = "Invalid User or password";
  }
});
signupId.addEventListener("click", function () {
  signNameId.classList.remove("d-none");
  Signupbtn.classList.remove("d-none");
  loginIdparent.classList.remove("d-none");
  signupIdparent.classList.add("d-none");
  loginBtn.classList.add("d-none");
  span.classList.add("d-none");
  signNameId.classList.remove("is-valid");
  clearInputs();
});
// Sign Up Page==============>
Signupbtn.addEventListener("click", function () {
  span.classList.add("d-none");
  if (
    repeated() != false &&
    blankInputs() != false &&
    signNameId.classList.contains("is-valid") &&
    inputEmailId.classList.contains("is-valid") &&
    inputPasswordId.classList.contains("is-valid")
  ) {
    addUser();
    clearInputs();
    span.classList.remove("d-none");
  } else {
    p.classList.remove("d-none");
    if (repeated() == false) {
      p.innerHTML =
        "Email is used  ,you already have an account, Go to Sign in";
    }
    if (
      signNameId.classList.contains("is-invalid") ||
      inputEmailId.classList.contains("is-invalid") ||
      inputPasswordId.classList.contains("is-invalid")
    ) {
      p.innerHTML =
        "Invalid Inputs,Name and Password must contain min 3 letters,Email must have @ and .";
    }
    if (blankInputs() == false) {
      p.innerHTML = "All inputs nedded";
    }
  }
});
loginId.addEventListener("click", function () {
  signNameId.classList.add("d-none");
  Signupbtn.classList.add("d-none");
  loginIdparent.classList.add("d-none");
  signupIdparent.classList.remove("d-none");
  loginBtn.classList.remove("d-none");
  inputEmailId.classList.remove("is-valid");
  inputPasswordId.classList.remove("is-valid");
  span.classList.add("d-none");
  clearInputs();
});
// Smart login Page==============>
logoutbtn.addEventListener("click", function () {
  frameId.classList.remove("d-none");
  smartLoginId.classList.add("d-none");
  p.classList.add("d-none");
  span.classList.add("d-none");
  inputEmailId.classList.remove("is-valid");
  inputPasswordId.classList.remove("is-valid");
});

// Declare Functions =====================>
function addUser() {
  var user = {
    userName: signNameId.value,
    userEmail: inputEmailId.value,
    userPassword: inputPasswordId.value,
  };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}

function validUser() {
  for (var i = 0; i < users.length; i++) {
    if (
      users[i].userEmail == inputEmailId.value &&
      users[i].userPassword == inputPasswordId.value
    ) {
      index = i;
      return true;
    }
  }
}
var regexes = {
  signNameId: /\w{3,}/,
  inputEmailId: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
  inputPasswordId: /\w{3,}/,
};

// frameId.addEventListener("input", function (e) {
//   console.log(e.target, regexes['signNameId']);
// });
signNameId.addEventListener("input", function () {
  if (regexes.signNameId.test(signNameId.value)) {
    signNameId.classList.add("is-valid");
    signNameId.classList.remove("is-invalid");
  } else {
    signNameId.classList.add("is-invalid");
    signNameId.classList.remove("is-valid");
  }
});
inputEmailId.addEventListener("input", function () {
  if (regexes.inputEmailId.test(inputEmailId.value)) {
    inputEmailId.classList.add("is-valid");
    inputEmailId.classList.remove("is-invalid");
  } else {
    inputEmailId.classList.add("is-invalid");
    inputEmailId.classList.remove("is-valid");
  }
});
inputPasswordId.addEventListener("input", function () {
  if (regexes.inputPasswordId.test(inputPasswordId.value)) {
    inputPasswordId.classList.add("is-valid");
    inputPasswordId.classList.remove("is-invalid");
  } else {
    inputPasswordId.classList.add("is-invalid");
    inputPasswordId.classList.remove("is-valid");
  }
});

function clearInputs() {
  signNameId.value = null;
  inputEmailId.value = null;
  inputPasswordId.value = null;
  p.classList.add("d-none");
}

function repeated() {
  for (var i = 0; i < users.length; i++) {
    if (
      users[i].userEmail == inputEmailId.value
      // && users[i].userName == signNameId.value
    ) {
      p.innerHTML =
        "Email is used  ,you already have an account, Go to Sign in";
      return false;
    }
  }
}
function blankInputs() {
  for (var i = 0; i < users.length; i++) {
    if (
      inputEmailId.value == "" ||
      signNameId.value == "" ||
      inputPasswordId.value == ""
    ) {
      return false;
    }
  }
}
