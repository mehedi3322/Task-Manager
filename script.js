
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
const darkBtn = document.getElementById("darkBtn");

let tasks = [];
let editId = null;
let nextId = 1;

// READ: Display all tasks
function displayTasks() {
    taskList.replaceChildren();

    emptyMessage.hidden = tasks.length > 0;

    tasks.forEach(function (task) {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = task.text;

        // UPDATE: Edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn"; 

        editBtn.addEventListener("click", function () {
            taskInput.value = task.text;
            editId = task.id;

            submitBtn.textContent = "Update Task";
            cancelBtn.hidden = false;
            taskInput.focus();
        });

        // DELETE: Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", function () {
            tasks = tasks.filter(function (item) {
                return item.id !== task.id;
            });

            if (editId === task.id) {
                resetForm();
            }

            displayTasks();
        });

        li.append(span, editBtn, deleteBtn);
        taskList.appendChild(li);
    });
}

// CREATE and UPDATE: Form submission
taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    if (editId !== null) {
        // UPDATE existing task
        tasks = tasks.map(function (task) {
            if (task.id === editId) {
                return { ...task, text: text };
            }

            return task;
        });
    } else {
        // CREATE new task
        tasks.push({
            id: nextId++,
            text: text
        });
    }

    resetForm();
    displayTasks();
});

// Reset input and editing mode
function resetForm() {
    taskInput.value = "";
    editId = null;
    submitBtn.textContent = "Add Task";
    cancelBtn.hidden = true;
}

// Cancel editing
cancelBtn.addEventListener("click", resetForm);

// Dark mode
darkBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    darkBtn.textContent =
        document.body.classList.contains("dark")
            ? "Light Mode"
            : "Dark Mode";
});

// Initial display
displayTasks();
