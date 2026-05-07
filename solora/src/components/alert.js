export function initAlert(config = {}) {
    let alertQueue = [];
    let isProcessing = false;
    const defaultTitle = config.title || window.location.hostname || "Alert";

    const processQueue = async () => {
        if (isProcessing || alertQueue.length === 0) return;
        isProcessing = true;
        
        const { options, resolve } = alertQueue.shift();
        const result = await renderAlert(options);
        
        resolve(result);
        isProcessing = false;
        processQueue();
    };

    const enqueue = (options) => {
        return new Promise((resolve) => {
            alertQueue.push({ options, resolve });
            processQueue();
        });
    };

    const renderAlert = (options) => {
        const { title, message, buttons, showInput, defaultValue, placeholder, variant } = options;
        
        return new Promise((resolve) => {
            const overlay = document.createElement('div');
            overlay.className = 'sol-alert-overlay';
            
            const container = document.createElement('div');
            container.className = 'sol-alert-container';
            if (variant) {
                container.classList.add(`variant-${variant}`);
            }
            
            const content = document.createElement('div');
            content.className = 'sol-alert-content';
            
            if (title) {
                const titleEl = document.createElement('div');
                titleEl.className = 'sol-alert-title';
                titleEl.innerText = title;
                content.appendChild(titleEl);
            }
            
            const messageEl = document.createElement('div');
            messageEl.className = 'sol-alert-message';
            messageEl.innerText = message;
            content.appendChild(messageEl);

            let inputEl;
            if (showInput) {
                inputEl = document.createElement('input');
                inputEl.type = 'text';
                inputEl.className = 'sol-alert-input';
                inputEl.value = defaultValue || '';
                inputEl.placeholder = placeholder || '';
                content.appendChild(inputEl);
                setTimeout(() => inputEl.focus(), 250);
            }
            
            const buttonsContainer = document.createElement('div');
            buttonsContainer.className = 'sol-alert-buttons';
            
            const close = (value) => {
                overlay.classList.remove('visible');
                setTimeout(() => {
                    if (document.body.contains(overlay)) {
                        document.body.removeChild(overlay);
                    }
                    resolve(value);
                }, 200);
            };

            buttons.forEach((btn) => {
                const button = document.createElement('button');
                button.className = 'sol-alert-button';
                if (btn.bold) button.classList.add('bold');
                button.innerText = btn.text;
                button.onclick = () => {
                    const value = showInput ? (btn.value ? inputEl.value : null) : btn.value;
                    close(value);
                };
                buttonsContainer.appendChild(button);
            });
            
            container.appendChild(content);
            container.appendChild(buttonsContainer);
            overlay.appendChild(container);
            document.body.appendChild(overlay);
            
            overlay.offsetHeight; // force reflow
            overlay.classList.add('visible');
        });
    };

    window.alert = function(message) {
        return enqueue({
            title: defaultTitle,
            message: message,
            buttons: [{ text: 'OK', value: true, bold: true }]
        });
    };

    window.confirm = function(message) {
        return enqueue({
            title: defaultTitle,
            message: message,
            buttons: [
                { text: 'Cancel', value: false },
                { text: 'OK', value: true, bold: true }
            ]
        });
    };

    window.prompt = function(message, defaultValue) {
        return enqueue({
            title: defaultTitle,
            message: message,
            buttons: [
                { text: 'Cancel', value: null },
                { text: 'OK', value: true, bold: true }
            ],
            showInput: true,
            defaultValue: defaultValue
        });
    };

    // Programmatic access
    window.solora = window.solora || {};
    
    window.solora.alert = (title, message, variant) => {
        if (typeof title === 'object') return enqueue(title);
        return enqueue({ title, message, variant, buttons: [{ text: 'OK', value: true, bold: true }] });
    };
    
    window.solora.confirm = (title, message, variant) => {
        if (typeof title === 'object') return enqueue(title);
        return enqueue({ title, message, variant, buttons: [
            { text: 'Cancel', value: false }, 
            { text: 'OK', value: true, bold: true }
        ]});
    };
    
    window.solora.prompt = (title, message, defaultValue, variant) => {
        if (typeof title === 'object') return enqueue(title);
        return enqueue({ 
            title, message, defaultValue, variant, 
            buttons: [{ text: 'Cancel', value: null }, { text: 'OK', value: true, bold: true }], 
            showInput: true 
        });
    };
}

