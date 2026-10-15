(function () {
    function createTaskListPage() {
        const section = document.createElement("section");
        section.className = "task-page";

        const intro = document.createElement("div");
        intro.className = "page-heading";

        const heading = document.createElement("div");
        const eyebrow = document.createElement("p");
        eyebrow.className = "eyebrow";
        eyebrow.textContent = "YOUR WORKSPACE";

        const title = document.createElement("h1");
        title.textContent = "My tasks";

        const description = document.createElement("p");
        description.className = "page-description";
        description.textContent = "Keep track of what matters and make progress every day.";
        heading.append(eyebrow, title, description);

        const count = document.createElement("span");
        count.className = "task-count";
        count.setAttribute("aria-live", "polite");
        intro.append(heading, count);

        const card = document.createElement("section");
        card.className = "table-card";
        card.setAttribute("aria-label", "Task list");

        const cardHeader = document.createElement("div");
        cardHeader.className = "table-card-header";
        const cardTitle = document.createElement("h2");
        cardTitle.textContent = "All tasks";
        const table = window.TaskComponents.createTaskTable();
        cardHeader.append(cardTitle);

        const emptyState = document.createElement("div");
        emptyState.className = "empty-state";
        emptyState.hidden = true;
        const emptyIcon = document.createElement("span");
        emptyIcon.className = "empty-icon";
        emptyIcon.setAttribute("aria-hidden", "true");
        emptyIcon.textContent = "✓";
        const emptyTitle = document.createElement("h3");
        emptyTitle.textContent = "Nothing on your list yet";
        const emptyDescription = document.createElement("p");
        emptyDescription.textContent = "Create a task to get your day moving.";
        emptyState.append(emptyIcon, emptyTitle, emptyDescription);

        const tableWrap = document.createElement("div");
        tableWrap.className = "table-wrap";
        tableWrap.appendChild(table.element);
        card.append(cardHeader, tableWrap, emptyState);
        section.append(intro, card);

        return {
            element: section,
            count: count,
            tableBody: table.body,
            tableWrap: tableWrap,
            emptyState: emptyState
        };
    }

    window.TaskPages = window.TaskPages || {};
    window.TaskPages.createTaskListPage = createTaskListPage;
})();
