function onLoadHandler() {
  // Add elements that are made during the visit on the website, for example a list
}

window.addEventListener("load", onLoadHandler);

const addNewTasksButton = document.getElementById("toDoListButton");
const inputForNewTasks = document.getElementById("inputForNewTasks");
const toDoList = document.getElementById("toDoList");
const toDoListTasks = document.getElementById("toDoListTasks");

// Array for all tasks, empty by default
let toDoTasks = [];

// The plus button to add tasks to the list
addNewTasksButton.addEventListener("click", () => {
  createTask();
});

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

  const toDoElement = document.createElement("li");
  const toDoParagraph = document.createElement("p");

  // The name (text written in input) of the to do task
  // The names will be put in a paragraph that is displayed as an li element
  toDoParagraph.innerText = newToDo.name;

  const radioButton = document.createElement("input");
  radioButton.type = "radio";
  radioButton.checked = false;

  // References to elements in order to access them
  newToDo.radioBtn = radioButton;
  newToDo.nameElement = toDoParagraph;
  newToDo.parent = toDoElement;

  // Parameter newToDo to know which object is clicked
  radioButton.addEventListener("click", () => {
    checkedToDo(newToDo);
  });

  const trashcanIcon = document.createElement("img");
  trashcanIcon.src = "trashcan.svg";

  // Parameter newToDo to know which object is clicked
  trashcanIcon.addEventListener("click", () => {
    deleteToDo(newToDo);
  });

  toDoElement.appendChild(radioButton);
  toDoElement.appendChild(toDoParagraph);
  toDoElement.appendChild(trashcanIcon);
  drawToDo(newToDo);

  inputForNewTasks.value = "";

  // Local Storage. Set the item to the name of the to do
  // Stringify since it is an object and local storage only can store strings
  localStorage.setItem(newToDo.name, JSON.stringify(newToDo));
  localStorage.getItem(newToDo);

  console.log(localStorage);
}

// Draws the list in ul element
function drawToDo(toDo) {
  toDoListTasks.appendChild(toDo.parent);
}

function checkedToDo(toDo) {
  toDo.nameElement.style.textDecoration = "line-through";
  toDo.done = true;
  sortToDos();
}

function deleteToDo(toDo) {
  toDoListTasks.removeChild(toDo.parent);
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
