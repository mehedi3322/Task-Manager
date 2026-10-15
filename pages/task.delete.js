(function () {
    function createDeleteDialog(onConfirm) {
        const modal = window.TaskComponents.createModal("Delete task?");
        const message = document.createElement("p");
        message.className = "delete-message";
        message.textContent = "Are you sure you want to delete this task?";

        const taskDetails = document.createElement("p");
        taskDetails.className = "delete-task-details";

        const actions = document.createElement("div");
        actions.className = "form-actions";

        const cancelButton = window.TaskComponents.createButton("Cancel", "quiet");
        cancelButton.addEventListener("click", function () {
            modal.dialog.close();
        });

        const deleteButton = window.TaskComponents.createButton("Delete task", "danger");
        deleteButton.addEventListener("click", function () {
            if (taskToDelete) {
                onConfirm(taskToDelete);
                taskToDelete = null;
                modal.dialog.close();
            }
        });

        actions.append(cancelButton, deleteButton);
        modal.panel.append(message, taskDetails, actions);

        let taskToDelete = null;
        modal.dialog.addEventListener("close", function () {
            taskToDelete = null;
        });

        return {
            element: modal.dialog,
            open: function (task) {
                taskToDelete = task;
                modal.title.textContent = "Delete task?";
                const taskName = Array.from(task.text);
                const taskNamePreview = taskName.length > 40
                    ? taskName.slice(0, 37).join("") + "..."
                    : task.text;
                taskDetails.title = task.text;
                taskDetails.textContent =
                    taskNamePreview
                    + " · TASK-"
                    + String(task.id).padStart(4, "0");
                modal.dialog.showModal();
            }
        };
    }

    window.TaskPages = window.TaskPages || {};
    window.TaskPages.createDeleteDialog = createDeleteDialog;
})();
