// <⚠️ DONT DELETE THIS ⚠️>
// import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const form = document.querySelector(".jsForm"),
  input = form.querySelector("input"),
  finList = document.querySelector(".finishedList"),
  pendingList = document.querySelector(".pendingList"),
  listId = Date.now();

const PENDINGLS = "pending";
const FINISHEDLS = "finished";

let penddingArray = [];
let finishArray = [];

function handleSubmit(event) {
  event.preventDefault();
  const currentText = input.value;
  addPending(currentText);
  input.value = "";
}

function saveFinishedToDos(li, text) {
  const finishedObj = {
    id: listId,
    text: text
  };
  li.id = finishedObj.id;
  finishArray.push(finishedObj);
  saveFinish(finishArray);
}

function saveFinish() {
  localStorage.setItem(FINISHEDLS, [JSON.stringify(finishArray)]);
}

function newPendingList(li) {
  const leftPending = penddingArray.filter((todo) => {
    const text = li.querySelector("span").textContent;
    return todo.text !== text;
  });
  penddingArray = leftPending;
  savePending(penddingArray);
}

function updateFinishLS(li) {
  const leftFinished = finishArray.filter((todo) => {
    const text = li.querySelector("span").textContent;
    return todo.text !== text;
  });
  finishArray = leftFinished;
  saveFinish(finishArray);
}

function replace(event) {
  if (event.path[2] === pendingList) {
    const li = event.path[1];
    const btn = event.path[0];
    btn.innerHTML = `✔`;
    const text = li.firstChild.textContent;
    saveFinishedToDos(li, text);
    // Update local storage
    newPendingList(li);
    finList.appendChild(li);
  } else {
    const li = event.path[1];
    const btn = event.path[0];
    btn.innerHTML = `✔`;
    const text = li.firstChild.textContent;
    savePendingToDos(li, text);
    // Update local storage
    updateFinishLS(li);
    pendingList.appendChild(li);
  }
}

function addFinished(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const checkBtn = document.createElement("button");
  checkBtn.addEventListener("click", replace);
  delBtn.addEventListener("click", deleteToDos);
  span.innerHTML = text;
  saveFinishedToDos(li, text);
  finList.appendChild(li);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(checkBtn);
}

function savePending(array) {
  localStorage.setItem(PENDINGLS, [JSON.stringify(array)]);
}

function savePendingToDos(li, text) {
  const pendingObj = {
    id: listId,
    text: text
  };
  li.id = pendingObj.id;
  penddingArray.push(pendingObj);
  savePending(penddingArray);
}

function deleteToDos(event) {
  if (event.path[2] === pendingList) {
    // delete in pending
    const li = event.path[1];
    pendingList.removeChild(li);
    newPendingList(li);
  } else {
    // delete in finished
    const li = event.path[1];
    finList.removeChild(li);
    updateFinishLS(li);
  }
}

function addPending(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const checkBtn = document.createElement("button");
  checkBtn.addEventListener("click", replace);
  delBtn.addEventListener("click", deleteToDos);
  span.innerHTML = text;
  delBtn.innerHTML = `❌`;
  checkBtn.innerHTML = `✔`;
  savePendingToDos(li, text);
  pendingList.appendChild(li);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(checkBtn);
}

function load() {
  const leftPenArray = localStorage.getItem(PENDINGLS);
  const leftFinArray = localStorage.getItem(FINISHEDLS);

  if (leftPenArray !== null) {
    const parsePending = JSON.parse(leftPenArray);
    parsePending.forEach((pending) => {
      addPending(pending.text);
    });
    const parseFinished = JSON.parse(leftFinArray);
    parseFinished.forEach((finished) => {
      addFinished(finished.text);
    });
  }
}

function init() {
  load();
  form.addEventListener("submit", handleSubmit);
}

init();
