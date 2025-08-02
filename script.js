let tasks=JSON.parse(localStorage.getItem('tasks')) || []
const taskInput=document.getElementById("taskInput");
const taskList=document.getElementById("taskList");
const taskBtn=document.getElementById("taskbtn");
let currentFilter="all";
taskBtn.addEventListener("click",addTask);
const filterButtons = document.querySelectorAll(".filter button");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentFilter=button.getAttribute("data-filter");
        renderTasks();
    })
    
});
function addTask(){
let taskValue=taskInput.value.trim();
if (taskValue==="") return;
tasks.push({text:taskValue,completed: false});
saveTasks();
renderTasks();
taskInput.value="";

}
function toggleTask(index){
    tasks[index].completed=!tasks[index].completed;
    saveTasks();
    renderTasks();
}
function deleteTask(index){
    tasks.splice(index,1);
    saveTasks();
    renderTasks();
}
function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if (currentFilter === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  } else if (currentFilter === "incomplete") {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  filteredTasks.forEach((task, index) => {
    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onchange = () => toggleTask(index);

    let textSpan = document.createElement("span");
    textSpan.className = "task-text";
    textSpan.textContent = task.text;

    let deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "❌";
    deleteBtn.style.cursor = "pointer";
        deleteBtn.onclick = (event) => {
        event.stopPropagation();
        deleteTask(index);
    };




    if (task.completed) {
        textSpan.style.textDecoration = "line-through";
    }

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}
renderTasks();
