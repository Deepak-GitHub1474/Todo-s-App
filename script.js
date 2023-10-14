let typingInput = document.getElementById("typing-input");
let addTodoBtn = document.getElementById("add-todo-btn");
let todosContainer = document.getElementById("todos-container");
let editContainer = document.getElementById("edit-container");

addTodoBtn.onclick = () => {
    if (typingInput.value.length > 0) {
        let todoList = document.createElement("div");
        todoList.innerHTML =
            `   <p class="todo">${typingInput.value}</p>
          <p class="todo-status">Status: Pending</p>
          <button class="deleteBtn">Remove</button>
          <button class="mark-btn">Mark Completed</button>
          <button class="edit-task-btn">Edit Task</button>
     `;

        todosContainer.appendChild(todoList);
        todoList.className = "todo-list";
    } else {
        alert("Please write a todo in the input box");
    }

    typingInput.value = "";
};

let editOpen = false; // Track if edit container is open

todosContainer.addEventListener("click", (event) => {
    let target = event.target;
    if (target.classList.contains("mark-btn")) {
        let todoStatus = target.parentNode.querySelector(".todo-status");
        todoStatus.innerHTML = "Status: Completed";
        target.style.backgroundColor = "#ffff00";
    } else if (target.classList.contains("deleteBtn")) {
        let todoList = target.parentNode;
        todosContainer.removeChild(todoList);
    } else if (target.classList.contains("edit-task-btn") && !editOpen) {
        let todo = target.parentNode.querySelector(".todo");
        let form = document.createElement("div");
        form.innerHTML =
            `   <input type="text" class="edit-box">
          <button class="update-btn">Update</button>
          <button class="close-btn">Close</button>
      `;
        editContainer.appendChild(form);
        form.className = "edit-todo-container";
        editOpen = true; // Set edit container as open

        addTodoBtn.disabled = true; // Disable addTodoBtn

        let editBox = form.querySelector(".edit-box");
        let updateBtn = form.querySelector(".update-btn");
        let closeBtn = form.querySelector(".close-btn");

        editBox.value = todo.textContent;

        updateBtn.addEventListener("click", () => {
            todo.textContent = editBox.value;
            editContainer.removeChild(form);
            addTodoBtn.disabled = false;  // Enable addTodoBtn
            editOpen = false; // Set edit container as closed
            target.parentNode.querySelector(".mark-btn").disabled = false; // Disable the "Remove" button
            target.parentNode.querySelector(".deleteBtn").disabled = false;   // Enable the "Remove" button
        });

        closeBtn.addEventListener("click", () => {
            editContainer.removeChild(form);
            addTodoBtn.disabled = false;
            editOpen = false; // Set edit container as closed
            target.parentNode.querySelector(".mark-btn").disabled = false; // Disable the "Remove" button
            target.parentNode.querySelector(".deleteBtn").disabled = false;
        });

        target.parentNode.querySelector(".mark-btn").disabled = true; // Disable the "Remove" button
        target.parentNode.querySelector(".deleteBtn").disabled = true; // Disable the "Remove" button
    }
});
