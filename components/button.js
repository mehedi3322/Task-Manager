(function () {
    function createButton(label, variant, type) {
        const button = document.createElement("button");
        button.type = type || "button";
        button.className = "button" + (variant ? " button--" + variant : "");
        button.textContent = label;
        return button;
    }

    window.TaskComponents = window.TaskComponents || {};
    window.TaskComponents.createButton = createButton;
})();
