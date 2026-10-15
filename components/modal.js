(function () {
    function createModal(titleText) {
        const dialog = document.createElement("dialog");
        dialog.className = "modal";
        dialog.setAttribute("aria-labelledby", "taskDialogTitle");

        const panel = document.createElement("div");
        panel.className = "modal-panel";

        const header = document.createElement("div");
        header.className = "modal-header";

        const title = document.createElement("h2");
        title.id = "taskDialogTitle";
        title.textContent = titleText;

        const closeButton = window.TaskComponents.createButton("×", "icon");
        closeButton.setAttribute("aria-label", "Close dialog");
        closeButton.addEventListener("click", function () {
            dialog.close();
        });

        header.append(title, closeButton);
        panel.appendChild(header);
        dialog.appendChild(panel);

        dialog.addEventListener("click", function (event) {
            if (event.target === dialog) {
                dialog.close();
            }
        });

        return { dialog: dialog, panel: panel, title: title };
    }

    window.TaskComponents = window.TaskComponents || {};
    window.TaskComponents.createModal = createModal;
})();
