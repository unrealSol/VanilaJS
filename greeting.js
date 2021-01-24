const nameForm = document.querySelector(".js-form"),
  nameInput = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");
const USER_LS = "currentUser",
  SHOWING_CN = "showing";


function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function nameHandleSubmit(event) {
    event.preventDefault();
    const currentValue = nameInput.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    nameForm.classList.add(SHOWING_CN);
    nameForm.addEventListener("submit", nameHandleSubmit);
}
  

function paintGreeting(text) {
    nameForm.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        // she is not
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();