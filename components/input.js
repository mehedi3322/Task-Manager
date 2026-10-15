(function () {
    function createTextInput(options) {
        const wrapper = document.createElement("div");
        wrapper.className = "form-field";

        const label = document.createElement("label");
        label.htmlFor = options.id;
        label.textContent = options.label;

        const input = document.createElement("input");
        input.id = options.id;
        input.name = options.id;
        input.type = "text";
        input.placeholder = options.placeholder || "";
        input.required = options.required !== false;
        input.maxLength = 160;
        input.autocomplete = "off";

        wrapper.append(label, input);
        return { element: wrapper, input: input };
    }

    window.TaskComponents = window.TaskComponents || {};
    window.TaskComponents.createTextInput = createTextInput;
})();
