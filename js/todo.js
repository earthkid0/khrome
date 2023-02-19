const todoFrom = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-form input");
const todoList = document.querySelector("#todo-list");
const TODO_KEY = "todos";

let todos = [];

function saveToDo () {
    localStorage.setItem(TODO_KEY,JSON.stringify(todos));
}

function deleteToDo (event) {
    const li = event.target.parentElement;
    li.remove();
    todos = todos.filter(todo => todo.id !== parseInt(li.id));
    saveToDo();
}

function paintToDo (newTodo) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const btn = document.createElement("button");
    li.id = newTodo.id;
    li.classList = 'list-group-item bg-transparent';
    btn.innerText = "X";
    btn.classList = 'btn btn-danger btn-sm';
    btn.addEventListener("click", deleteToDo);
    li.appendChild(span);
    li.appendChild(btn);
    span.innerText = newTodo.text;
    todoList.appendChild(li); 
}

function handleToDoSubmit (event) {
    event.preventDefault();
    const newTodo = todoInput.value;
    const newToDoObj = {
        text: newTodo,
        id: Date.now(),
    }
    todos.push(newToDoObj);
    paintToDo(newToDoObj);
    saveToDo();
    todoInput.value = "";
}

todoFrom.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODO_KEY);

if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);
    todos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}