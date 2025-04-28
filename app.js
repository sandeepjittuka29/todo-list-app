document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
    document.getElementById('addButton').addEventListener('click', addTask);
    document.getElementById('taskInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    const timestamp = new Date(); // Get current date/time
    
    li.innerHTML = `
        <div class="task-content">
            <span>${taskText}</span>
            <small>${formatTimestamp(timestamp)}</small>
        </div>
        <button class="delete-btn">Delete</button>
    `;
    
    li.querySelector('.delete-btn').addEventListener('click', function() {
        li.remove();
        saveTasks();
    });
    
    taskList.appendChild(li);
    taskInput.value = '';
    saveTasks();
}

function formatTimestamp(date) {
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    /* Alternative formats you could use:
    // Just time:
    return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    // Full date and time:
    return date.toLocaleString();
    */
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(task => {
        const text = task.querySelector('span').textContent;
        const timestamp = task.querySelector('small')?.textContent || new Date().toLocaleString();
        tasks.push({ text, timestamp });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    
    savedTasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="task-content">
                <span>${task.text}</span>
                <small>${task.timestamp}</small>
            </div>
            <button class="delete-btn">Delete</button>
        `;
        
        li.querySelector('.delete-btn').addEventListener('click', function() {
            li.remove();
            saveTasks();
        });
        
        taskList.appendChild(li);
    });
}