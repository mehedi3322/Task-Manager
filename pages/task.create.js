(function () {
    function createTaskDialog(onSave) {
        const modal = window.TaskComponents.createModal("Create a task");
        const form = document.createElement("form");
        form.className = "task-form";

        const field = window.TaskComponents.createTextInput({
            id: "taskInput",
            label: "Task name",
            placeholder: "What needs to get done?"
        });

        const actions = document.createElement("div");
        actions.className = "form-actions";

        const cancelButton = window.TaskComponents.createButton("Cancel", "quiet");
        cancelButton.addEventListener("click", function () {
            modal.dialog.close();
        });

        const submitButton = window.TaskComponents.createButton("Create task", "primary", "submit");
        actions.append(cancelButton, submitButton);
        form.append(field.element, actions);
        modal.panel.appendChild(form);

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const text = field.input.value.trim();
            if (!text) {
                field.input.focus();
                return;
            }

            onSave(text);
            form.reset();
            modal.dialog.close();
        });

        modal.dialog.addEventListener("close", function () {
            form.reset();
            submitButton.textContent = "Create task";
            modal.title.textContent = "Create a task";
        });

        return {
            element: modal.dialog,
            open: function (task) {
                if (task) {
                    modal.title.textContent = "Edit task";
                    submitButton.textContent = "Save changes";
                    field.input.value = task.text;
                } else {
                    modal.title.textContent = "Create a task";
                    submitButton.textContent = "Create task";
                    field.input.value = "";
                }

                modal.dialog.showModal();
                field.input.focus();
            }
        };
    }

    window.TaskPages = window.TaskPages || {};
    window.TaskPages.createTaskDialog = createTaskDialog;
})();
