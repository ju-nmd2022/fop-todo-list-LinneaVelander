function onLoadHandler() {
  // Add elements that are made during the visit on the website, for example a list
}

window.addEventListener("load", onLoadHandler);

const addNewTasksButton = document.getElementById("toDoListButton");
const inputForNewTasks = document.getElementById("inputForNewTasks");
const toDoList = document.getElementById("toDoList");
const toDoListTasks = document.getElementById("toDoListTasks");

const TO_DO_KEY = "toDoKey";

// Array for all tasks, empty by default
let toDoTasks = [];

// fetchLocalStorage();

// The plus button to add tasks to the list.
// If input field length is larger than 0 you may add your task
if (inputForNewTasks.length > 0) {
  addNewTasksButton.addEventListener("click", () => {
    createTask();
  });
}

// Function to add create tasks in the array
function createTask() {
  // Object with information of the to do's
  // Name = the text written in the input field
  // Done = if it is checked or not, false by default
  const newToDo = {
    name: inputForNewTasks.value,
    done: false,
  };

  // To add object to array
  toDoTasks.push(newToDo);

  sortToDos();

  inputForNewTasks.value = "";
  saveLocalStorage();

  // Local Storage. Set the item to the name of the to do
  // Stringify since it is an object and local storage only can store strings
}

function saveLocalStorage() {
  let json = JSON.stringify(toDoTasks);
  localStorage.setItem(TO_DO_KEY, json);
}

function fetchLocalStorage() {
  let json = localStorage.getItem(TO_DO_KEY);

  if (json != null) {
    let temp = JSON.parse(json);
    toDoTasks = temp;
    refreshList();
  }
}

// Draws the list in ul element
function drawToDo(toDo) {
  const toDoElement = document.createElement("li");
  const toDoParagraph = document.createElement("p");

  // The name (text written in input) of the to do task
  // The names will be put in a paragraph that is displayed as an li element
  toDoParagraph.innerText = toDo.name;

  const radioButton = document.createElement("input");
  radioButton.type = "radio";
  radioButton.checked = toDo.done;

  // References to elements in order to access them
  toDo.radioBtn = radioButton;
  toDo.nameElement = toDoParagraph;
  toDo.parent = toDoElement;

  if (toDo.done) {
    toDo.nameElement.style.textDecoration = "line-through";
  }

  // Parameter toDo to know which object is clicked
  radioButton.addEventListener("click", () => {
    checkedToDo(toDo);
  });

  const trashcanIcon = document.createElement("img");
  trashcanIcon.src = "trashcan.svg";

  // Parameter toDo to know which object is clicked
  trashcanIcon.addEventListener("click", () => {
    deleteToDo(toDo);
  });

  toDoElement.appendChild(radioButton);
  toDoElement.appendChild(toDoParagraph);
  toDoElement.appendChild(trashcanIcon);
  toDoListTasks.appendChild(toDo.parent);
}

function checkedToDo(toDo) {
  toDo.done = !toDo.done;
  saveLocalStorage();
  sortToDos();
}

// To find the index in order to remove the to do task.
function deleteToDo(toDo) {
  let index = toDoTasks.findIndex((toDoTask) => toDoTask.name === toDo.name);
  if (index > -1) {
    toDoTasks.splice(index, 1);
  }
  toDoListTasks.removeChild(toDo.parent);
  saveLocalStorage();
}

function sortToDos() {
  toDoTasks.sort((a, b) => a.done === true && b.done === false);
  refreshList();
}

function refreshList() {
  toDoListTasks.innerHTML = "";
  toDoTasks.forEach((toDo) => {
    drawToDo(toDo);
  });
}
