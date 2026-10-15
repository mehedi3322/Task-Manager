(function () {
    function createTaskTable() {
        const table = document.createElement("table");
        table.className = "task-table";

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        ["Task", "Status", "Actions"].forEach(function (heading) {
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
            const taskCell = document.createElement("td");
            taskCell.className = "task-cell";
            taskCell.textContent = task.text;

            const statusCell = document.createElement("td");
            const status = document.createElement("span");
            status.className = "status-badge";
            status.textContent = "In progress";
            statusCell.appendChild(status);

            const actionsCell = document.createElement("td");
            actionsCell.className = "table-actions";

            const editButton = window.TaskComponents.createButton("Edit", "quiet button--small");
            editButton.addEventListener("click", function () {
                onEdit(task);
            });

            const deleteButton = window.TaskComponents.createButton("Delete", "danger button--small");
            deleteButton.addEventListener("click", function () {
                onDelete(task);
            });

            actionsCell.append(editButton, deleteButton);
            row.append(taskCell, statusCell, actionsCell);
            tableBody.appendChild(row);
        });
    }

    window.TaskComponents = window.TaskComponents || {};
    window.TaskComponents.createTaskTable = createTaskTable;
    window.TaskComponents.renderTaskTable = renderTaskTable;
})();
