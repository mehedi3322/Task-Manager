(function () {
    function createNavbar(onCreate, onThemeToggle) {
        const navbar = document.createElement("header");
        navbar.className = "navbar";

        const brand = document.createElement("a");
        brand.className = "brand";
        brand.href = "#";
        brand.setAttribute("aria-label", "Task Manager home");

        const brandMark = document.createElement("span");
        brandMark.className = "brand-mark";
        brandMark.setAttribute("aria-hidden", "true");
        brandMark.textContent = "✓";

        const brandName = document.createElement("span");
        brandName.textContent = "Taskflow";
        brand.append(brandMark, brandName);

        const actions = document.createElement("div");
        actions.className = "navbar-actions";

        const themeButton = window.TaskComponents.createButton("Dark mode", "quiet");
        themeButton.setAttribute("aria-pressed", "false");
        themeButton.addEventListener("click", onThemeToggle);

        const createButton = window.TaskComponents.createButton("+ New task", "primary");
        createButton.addEventListener("click", onCreate);
        actions.append(themeButton, createButton);

        navbar.append(brand, actions);
        return { element: navbar, themeButton: themeButton };
    }

    window.TaskComponents = window.TaskComponents || {};
    window.TaskComponents.createNavbar = createNavbar;
})();
