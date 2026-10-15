(function () {
    function getTodayDate() {
        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return today.getFullYear() + "-" + month + "-" + day;
    }

    function createTaskDialog(onSave) {
        const modal = window.TaskComponents.createModal("Create a task");
        const form = document.createElement("form");
        form.className = "task-form";

        const field = window.TaskComponents.createTextInput({
            id: "taskInput",
            label: "Task name",
            placeholder: "What needs to get done?"
        });
        const nameLimitHint = document.createElement("p");
        nameLimitHint.className = "form-hint";
        nameLimitHint.id = "taskNameLimit";
        nameLimitHint.textContent = "Maximum " + field.input.maxLength + " characters.";
        field.input.setAttribute("aria-describedby", nameLimitHint.id);
        field.element.appendChild(nameLimitHint);

        const dateField = window.TaskComponents.createDateInput({
            id: "taskDate",
            label: "Task date"
        });
        const descriptionField = window.TaskComponents.createTextArea({
            id: "taskDescription",
            label: "Description",
            placeholder: "Add a few details about this task."
        });

        const taskId = document.createElement("p");
        taskId.className = "modal-task-id";

        const actions = document.createElement("div");
        actions.className = "form-actions";

        const cancelButton = window.TaskComponents.createButton("Cancel", "quiet");
        cancelButton.addEventListener("click", function () {
            modal.dialog.close();
        });

        const submitButton = window.TaskComponents.createButton("Create task", "primary", "submit");
        actions.append(cancelButton, submitButton);
        form.append(taskId, field.element, dateField.element, descriptionField.element, actions);
        modal.panel.appendChild(form);

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const text = field.input.value.trim();
            const description = descriptionField.input.value.trim();
            if (!text || !dateField.input.value || !description) {
                field.input.focus();
                return;
            }

            onSave({
                text: text,
                date: dateField.input.value,
                description: description
            });
            form.reset();
            modal.dialog.close();
        });

        modal.dialog.addEventListener("close", function () {
            form.reset();
            submitButton.textContent = "Create task";
            modal.title.textContent = "Create a task";
            taskId.hidden = true;
        });

        return {
            element: modal.dialog,
            open: function (task) {
                if (task) {
                    modal.title.textContent = "Edit task";
                    submitButton.textContent = "Save changes";
                    field.input.value = task.text;
                    dateField.input.value = task.date;
                    descriptionField.input.value = task.description;
                    taskId.textContent = "Task ID: TASK-" + String(task.id).padStart(4, "0");
                    taskId.hidden = false;
                } else {
                    modal.title.textContent = "Create a task";
                    submitButton.textContent = "Create task";
                    field.input.value = "";
                    dateField.input.value = getTodayDate();
                    descriptionField.input.value = "";
                    taskId.hidden = true;
                }

                modal.dialog.showModal();
                field.input.focus();
            }
        };
    }

    window.TaskPages = window.TaskPages || {};
    window.TaskPages.createTaskDialog = createTaskDialog;
})();
