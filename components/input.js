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

    function createDateInput(options) {
        const wrapper = document.createElement("div");
        wrapper.className = "form-field";

        const label = document.createElement("label");
        label.htmlFor = options.id;
        label.textContent = options.label;

        const input = document.createElement("input");
        input.id = options.id;
        input.name = options.id;
        input.type = "date";
        input.required = true;

        wrapper.append(label, input);
        return { element: wrapper, input: input };
    }

    function createTextArea(options) {
        const wrapper = document.createElement("div");
        wrapper.className = "form-field";

        const label = document.createElement("label");
        label.htmlFor = options.id;
        label.textContent = options.label;

        const textarea = document.createElement("textarea");
        textarea.id = options.id;
        textarea.name = options.id;
        textarea.placeholder = options.placeholder || "";
        textarea.required = options.required !== false;
        textarea.maxLength = 1000;
        textarea.rows = 4;

        wrapper.append(label, textarea);
        return { element: wrapper, input: textarea };
    }

    window.TaskComponents = window.TaskComponents || {};
    window.TaskComponents.createTextInput = createTextInput;
    window.TaskComponents.createDateInput = createDateInput;
    window.TaskComponents.createTextArea = createTextArea;
})();
