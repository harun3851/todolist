// Step 2.1: Define a function to create a todo object
function createTodo(taskText) {
    return {
        text: taskText,
        checked: false,
        id: Date.now() // Use a timestamp-based unique ID
    };
}

// Step 2.2: Initialize an array to store todo items
const todoItems = [];

// Step 2.3: Add an event listener for the "Add" button
document.getElementById("addTask").addEventListener("click", addTodo);

function addTodo() {
    const inputTask = document.getElementById("inputTask");
    const taskText = inputTask.value.trim(); // Trim whitespace from the input

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const todo = createTodo(taskText);
    todoItems.push(todo);

    // After adding the task, update the list and clear the input field
    renderTodo();
    inputTask.value = "";
    inputTask.focus();
}

// Step 2.4: Implement the renderTodo function
function renderTodo() {
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = ""; // Clear the list

    todoItems.forEach(todo => {
        const listItem = document.createElement("li");
        listItem.textContent = todo.text;
        
        // Add a checkbox for marking tasks as completed
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", () => {
            todo.checked = checkbox.checked;
            listItem.style.textDecoration = todo.checked ? "line-through" : "none";
        });
        
        // Add a delete button
        const deleteButton = document.createElement("span");
        deleteButton.innerHTML = "&times;";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", () => {
            const index = todoItems.indexOf(todo);
            if (index !== -1) {
                todoItems.splice(index, 1);
                renderTodo();
            }
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
    });
}

// Step 2.5: Implement the "Remove Last Task" button
document.getElementById("removeLastTask").addEventListener("click", () => {
    if (todoItems.length === 0) {
        alert("No tasks to remove.");
        return;
    }

    const confirmation = window.confirm("Are you sure you want to remove the last task?");
    if (confirmation) {
        todoItems.pop();
        renderTodo();
    }
});

// Step 2.6: Implement the "Remove Completed Tasks" button
document.getElementById("removeCompletedTasks").addEventListener("click", () => {
    const completedTasks = todoItems.filter(todo => todo.checked);
    if (completedTasks.length === 0) {
        alert("No completed tasks to remove.");
        return;
    }

    const confirmation = window.confirm("Are you sure you want to remove all completed tasks?");
    if (confirmation) {
        todoItems = todoItems.filter(todo => !todo.checked);
        renderTodo();
    }
});

// Step 2.7: Initial rendering
renderTodo();
