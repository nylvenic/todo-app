const addTodoBtn = document.querySelector('#add-todo-btn');
const todoInput = document.querySelector('#todo-input');
const pendingTodos = document.querySelector('#pending-todos');
const completedTodosContainer = document.querySelector('#completed-todos');
let todos;
let completedTodos;
initializeTodos();
initializeCompletedTodos();

addTodoBtn.addEventListener('click', (e) => addTodo(e));

pendingTodos.addEventListener('click', (e) => {
    deleteTodo(e);
    completeTodo(e);
});

completedTodosContainer.addEventListener('click', (e) => {
    deleteCompletedTodo(e);
    uncompleteTodo(e);
})

function completeTodo(e) {
    const isCompleteBtn = e.target.classList.contains('complete-btn');
    if(isCompleteBtn) {
        const todoContent = e.target.parentElement.parentElement.firstElementChild.textContent;
        todos = todos.filter(todo => todo !== todoContent);
        completedTodos.push(todoContent);
        localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
        localStorage.setItem('todos', JSON.stringify(todos));
        displayTodos();
        displayCompletedTodos();
    }
}

function uncompleteTodo(e) {
    const isCompleteBtn = e.target.classList.contains('uncomplete-btn');
    if(isCompleteBtn) {
        const todoContent = e.target.parentElement.parentElement.firstElementChild.textContent;
        completedTodos = completedTodos.filter(todo => todo !== todoContent);
        todos.push(todoContent);
        localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
        localStorage.setItem('todos', JSON.stringify(todos));
        displayTodos();
        displayCompletedTodos();
    }
}

function deleteCompletedTodo(e) {
    const isTrashBtn = e.target.classList.contains('trash-btn');
    if(isTrashBtn) {
        const todoContent = e.target.parentElement.parentElement.firstElementChild.textContent;
        completedTodos = completedTodos.filter(todo => todo !== todoContent);
        localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
    }
    initializeCompletedTodos();
}

function deleteTodo(e) {
    const isTrashBtn = e.target.classList.contains('trash-btn');
    if(isTrashBtn) {
        const todoContent = e.target.parentElement.parentElement.firstElementChild.textContent;
        todos = todos.filter(todo => todo !== todoContent);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    initializeTodos();
}

function addTodo(e) {
    todos.push(todoInput.value);
    localStorage.setItem('todos', JSON.stringify(todos));
    e.preventDefault();
    todoInput.value = '';
    initializeTodos();
}

function initializeTodos() {
    let todoStorage = localStorage.getItem('todos');
    if(todoStorage == null || todoStorage == "") {
        todos = [];
        localStorage.setItem('todos', JSON.stringify(todos));
    } else {
        todos = JSON.parse(todoStorage);
    }
    displayTodos();
}

function initializeCompletedTodos() {
    let todoStorage = localStorage.getItem('completedTodos');
    if(todoStorage == null || todoStorage == "") {
        completedTodos = [];
        localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
    } else {
        completedTodos = JSON.parse(todoStorage);
    }
    displayCompletedTodos();
}

function displayTodos() {
    pendingTodos.innerHTML = '';
    let todoStorage = JSON.parse(localStorage.getItem('todos'));
    todoStorage.forEach(todo => {
        pendingTodos.innerHTML += `
        <div class="todo-item basic-box box-shadow">
            <p>${todo}</p>
            <div class="div todo-item-btns">
                <i class="fa-solid fa-lg fa-trash trash-btn"></i>
                <div class="divider"></div>
                <i class="fa-regular fa-lg fa-square-check complete-btn"></i>
            </div>
        </div>`;
    });
};

function displayCompletedTodos() {
    completedTodosContainer.innerHTML = '';
    let todoStorage = JSON.parse(localStorage.getItem('completedTodos'));
    todoStorage.forEach(todo => {
        completedTodosContainer.innerHTML += `
        <div class="todo-item basic-box box-shadow">
            <p>${todo}</p>
            <div class="div todo-item-btns">
                <i class="fa-solid fa-lg fa-trash trash-btn"></i>
                <div class="divider"></div>
                <i class="fa-solid fa-lg fa-square-check uncomplete-btn"></i>
            </div>
        </div>`;
    });
}

displayTodos();