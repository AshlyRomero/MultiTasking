function showPanel(panelId) {
    // Hide all panels
    document.querySelector('.login').classList.remove('active');
    document.querySelector('.main-panel').classList.remove('active');
    document.querySelector('.task-form').classList.remove('active');
    document.querySelector('.register-form').classList.remove('active');
    
    // Show the selected panel
    document.querySelector(`.${panelId}`).classList.add('active');
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => section.style.display = 'none');
    
    // Show the selected section
    document.getElementById(sectionId).style.display = 'block';
}

// Function to save tasks to localStorage
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to create a task
document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const taskName = document.getElementById('task-name').value;
    const taskPerson = document.getElementById('task-person').value;
    const taskDate = document.getElementById('task-date').value;
    const taskStatus = document.getElementById('task-status').value;
    
    const task = {
        name: taskName,
        person: taskPerson,
        date: taskDate,
        status: taskStatus
    };
    
    saveTask(task);
    addTaskToList(task);
    document.getElementById('task-form').reset();

    // Redirect to the "Lista de Tareas" section after task creation
    showPanel('main-panel');
    showSection('task-list');
});

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToList(task));
}

// Function to add a task to the list in the UI
function addTaskToList(task) {
    const taskList = document.querySelector('#task-list tbody');
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td>${task.name}</td>
        <td>${task.person}</td>
        <td>${task.date}</td>
        <td>${task.status}</td>
    `;
    
    taskList.appendChild(row);
}

// Load tasks when the page loads
window.onload = function() {
    loadTasks();
};
