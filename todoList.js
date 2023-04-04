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

let toDoTasks = [];

addNewTasksButton.addEventListener("click", () => {
  addNewTasks();
});

function addNewTasks() {
  const newToDo = {
    name: inputForNewTasks.value,
    done: false,
  };

  toDoTasks.push(newToDo);

  const toDoElement = document.createElement("li");
  const toDoParagraph = document.createElement("p");
  toDoParagraph.innerText = newToDo.name;

  const radioButton = document.createElement("input");
  radioButton.type = "radio";
  radioButton.checked = false;
  toDoElement.appendChild(radioButton);
  toDoElement.appendChild(toDoParagraph);
  toDoListTasks.appendChild(toDoElement);

  inputForNewTasks.value = "";
}
