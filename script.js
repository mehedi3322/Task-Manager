(function () {
    const tasks = [];
    let nextId = 1;

    const app = document.getElementById("app");
    const navbarHost = document.getElementById("navbar");
    const footerHost = document.getElementById("footer");
    const listPage = window.TaskPages.createTaskListPage();

    function renderTasks() {
        window.TaskComponents.renderTaskTable(
            listPage.tableBody,
            tasks,
            function (task) {
                editingId = task.id;
                taskDialog.open(task);
            },
            function (task) {
                deleteDialog.open(task);
            }
        );

        const hasTasks = tasks.length > 0;
        listPage.tableWrap.hidden = !hasTasks;
        listPage.emptyState.hidden = hasTasks;
        listPage.count.textContent =
            tasks.length + (tasks.length === 1 ? " task" : " tasks");
    }

    let editingId = null;
    const taskDialog = window.TaskPages.createTaskDialog(function (details) {
        if (editingId !== null) {
            const task = tasks.find(function (item) {
                return item.id === editingId;
            });

            if (task) {
                task.text = details.text;
                task.date = details.date;
                task.description = details.description;
            }
        } else {
            tasks.push({
                id: nextId++,
                text: details.text,
                date: details.date,
                description: details.description
            });
        }

        editingId = null;
        renderTasks();
    });

    taskDialog.element.addEventListener("close", function () {
        editingId = null;
    });

    const deleteDialog = window.TaskPages.createDeleteDialog(function (task) {
        const taskIndex = tasks.findIndex(function (item) {
            return item.id === task.id;
        });

        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);
            renderTasks();
        }
    });

    function toggleTheme() {
        const isDark = document.body.classList.toggle("dark");
        navbar.themeButton.textContent = isDark ? "Light mode" : "Dark mode";
        navbar.themeButton.setAttribute("aria-pressed", String(isDark));
    }

    const navbar = window.TaskComponents.createNavbar(function () {
        editingId = null;
        taskDialog.open(null);
    }, toggleTheme);

    navbarHost.appendChild(navbar.element);
    footerHost.appendChild(window.TaskComponents.createFooter());
    app.appendChild(listPage.element);
    document.body.appendChild(taskDialog.element);
    document.body.appendChild(deleteDialog.element);

    renderTasks();
})();
