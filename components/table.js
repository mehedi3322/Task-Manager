
(function () {
    function createTaskTable() {
        const table = document.createElement("table");
        table.className = "task-table";

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        ["Task ID", "Task name", "Task date", "Description", "Actions"].forEach(function (heading) {
            const th = document.createElement("th");
            th.scope = "col";
            th.textContent = heading;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        const tbody = document.createElement("tbody");
        table.append(thead, tbody);

        return { element: table, body: tbody };
    }

    function renderTaskTable(tableBody, tasks, onEdit, onDelete) {
        tableBody.replaceChildren();

        tasks.forEach(function (task) {
            const row = document.createElement("tr");
            const idCell = document.createElement("td");
            idCell.className = "task-id";
            idCell.setAttribute("data-label", "Task ID");
            idCell.textContent = "TASK-" + String(task.id).padStart(4, "0");

            const taskCell = document.createElement("td");
            taskCell.className = "task-cell";
            taskCell.setAttribute("data-label", "Task name");
            taskCell.textContent = task.text;

            const dateCell = document.createElement("td");
            dateCell.className = "task-date";
            dateCell.setAttribute("data-label", "Task date");
            dateCell.textContent = task.date;

            const descriptionCell = document.createElement("td");
            descriptionCell.className = "task-description";
            descriptionCell.setAttribute("data-label", "Description");
            descriptionCell.textContent = task.description;

            const actionsCell = document.createElement("td");
            actionsCell.className = "table-actions";
            actionsCell.setAttribute("data-label", "Actions");
            const actionButtons = document.createElement("div");
            actionButtons.className = "table-action-buttons";

            const editButton = window.TaskComponents.createButton("Update", "quiet button--small");
            editButton.addEventListener("click", function () {
                onEdit(task);
            });

            const deleteButton = window.TaskComponents.createButton("Delete", "danger button--small");
            deleteButton.addEventListener("click", function () {
                onDelete(task);
            });

            actionButtons.append(editButton, deleteButton);
            actionsCell.appendChild(actionButtons);
            row.append(idCell, taskCell, dateCell, descriptionCell, actionsCell);
            tableBody.appendChild(row);
        });
    }

    window.TaskComponents = window.TaskComponents || {};
    window.TaskComponents.createTaskTable = createTaskTable;
    window.TaskComponents.renderTaskTable = renderTaskTable;
})();
