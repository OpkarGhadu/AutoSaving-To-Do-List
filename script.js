/* Autosave : call saveList() after
    new item added, clear completed, or empty list, toggle
*/

// Global Variables - Buttons, To Do List, and Entry Box
var toDoEntryBox = document.getElementById("todo-entry-box");
var toDoList = document.getElementById("todo-list");
var addButton = document.getElementById("add-button");
var clearButton = document.getElementById("clear-completed-button");
var emptyButton = document.getElementById("empty-button");

// Event Listeners for buttons being Clicked
addButton.addEventListener("click", addToDoItem);
clearButton.addEventListener("click", clearCompletedToDoItems);
emptyButton.addEventListener("click", emptyList);

// Button Click Functions //
// Add New Item to List
function addToDoItem(){
  var itemText = toDoEntryBox.value;
  if(itemText != ""){
    newToDoItem(itemText, false);
    saveList();
    // Clear Input Field after item added
    toDoEntryBox.placeholder = "";
    toDoEntryBox.value = "";
  }
  else{
    toDoEntryBox.placeholder = "Please Enter an Item...";
  }
}

// Clear Completed Items
function clearCompletedToDoItems() {
    var completedItems = toDoList.getElementsByClassName("completed");
    while (completedItems.length > 0) {
        completedItems.item(0).remove();
    }
    saveList();
}

// Clear All Items
function emptyList() {
    var toDoItems = toDoList.children;
    while (toDoItems.length > 0) {
        toDoItems.item(0).remove();
    }
    saveList();
}

// Save List
function saveList() {
    var toDos = [];
    for (var i = 0; i < toDoList.children.length; i++) {
        var toDo = toDoList.children.item(i);
        var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains("completed")
        };
        toDos.push(toDoInfo);
    }
    localStorage.setItem("toDos", JSON.stringify(toDos));
}

// Load List from save 
function loadList() {
    if (localStorage.getItem("toDos") != null) {
        var toDos = JSON.parse(localStorage.getItem("toDos"));
        for (var i = 0; i < toDos.length; i++) {
            var toDo = toDos[i];
            newToDoItem(toDo.task, toDo.completed);
        }
    }
}
loadList(); // Load List

// Add new Item
function newToDoItem(itemText, completed) {
    var toDoItem = document.createElement("li");
    var toDoText = document.createTextNode(itemText);
    toDoItem.appendChild(toDoText);
    if (completed) {
        toDoItem.classList.add("completed");
    }
    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick", toggleToDoItemState);
}

// Toggle Completed
function toggleToDoItemState() {
    if (this.classList.contains("completed")) {
        this.classList.remove("completed");
    } else {
        this.classList.add("completed");
    }
    saveList();
}