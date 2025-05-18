const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

let todos = [];

// Load todos from localStorage on page load
window.onload = () => {
  const storedTodos = JSON.parse(localStorage.getItem('todos'));
  if (storedTodos) {
    todos = storedTodos;
    todos.forEach(todo => addTodoToDOM(todo));
  }
};

// Add todo item to DOM
function addTodoToDOM(todo) {
  const li = document.createElement('li');
  li.classList.add('todo-item');
  if (todo.completed) li.classList.add('completed');
  li.setAttribute('data-id', todo.id);

  li.innerHTML = `
    <span>${todo.text}</span>
    <button class="delete-btn">&times;</button>
  `;
 // Toggle completed on click
  li.querySelector('span').addEventListener('click', () => {
    toggleComplete(todo.id, li);
  });

  // Delete todo on delete button click
  li.querySelector('.delete-btn').addEventListener('click', () => {
    deleteTodo(todo.id, li);
  });

  todoList.appendChild(li);
}

// Add todo on form submit
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (text !== '') {
    const newTodo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    todos.push(newTodo);
    addTodoToDOM(newTodo);
    saveTodos();
    todoInput.value = '';
  }
});

// Toggle completed state
function toggleComplete(id, listItem) {
  todos = todos.map(todo => {
    if (todo.id === id) {
      todo.completed = !todo.completed;
      if (todo.completed) {
        listItem.classList.add('completed');
      } else {
        listItem.classList.remove('completed');
      }
    }
    return todo;
  });
  saveTodos();
}

// Delete todo
function deleteTodo(id, listItem) {
  todos = todos.filter(todo => todo.id !== id);
  todoList.removeChild(listItem);
  saveTodos();
}

// Save todos to localStorage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}
