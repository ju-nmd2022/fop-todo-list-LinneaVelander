function onLoadHandler() {
  // Add elements that are made during the visit on the website, for example a list
}

window.addEventListener("load", onLoadHandler);

// Finished button (a circle) with a line through the text
// Create a new list item when clicking the + button
// Be able to delete tasks

const addNewTasksButton = document.getElementById("toDoListButton");
const inputForNewTasks = document.getElementById("inputForNewTasks");
const toDoList = document.getElementById("toDoList");
const toDoListTasks = document.getElementById("toDoListTasks");

let newToDoTasks = [];

addNewTasksButton.addEventListener("click", addNewTasks);

function addNewTasks() {
  if (inputForNewTasks.value.length > 0) {
    const listOfNewTasks = document.createElement("li");
    listOfNewTasks.appendChild(toDoListTasks);
  }
}
