export function initSwitch(target) {
    // Als er geen target is → pak alle switches
    if (!target) {
        document.querySelectorAll('sol-switch').forEach(el => initSwitch(el));
        return;
    }

    const switchElement = target;

    // Voorkom dubbele initialisatie
    if (switchElement.dataset.initialized) return;
    switchElement.dataset.initialized = "true";

    switchElement.classList.add('sol-switch');

    const input = document.createElement('input');
    input.type = 'checkbox';
    if (switchElement.hasAttribute('name')) {
        input.name = switchElement.getAttribute('name');
    }

    const slider = document.createElement('div');
    slider.className = 'slider';

    const errorEl = document.createElement('div');
    errorEl.className = 'sol-error-message sol-switch-error';
    errorEl.style.display = 'none';

    switchElement.appendChild(input);
    switchElement.appendChild(slider);
    switchElement.appendChild(errorEl);

    slider.addEventListener('click', () => {
        input.checked = !input.checked;
        switchElement.hideError();
        switchElement.dispatchEvent(new Event('change', { bubbles: true }));
    });

    switchElement.showError = (message = 'Ongeldige invoer') => {
        switchElement.classList.add('is-invalid');
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    };

    switchElement.hideError = () => {
        switchElement.classList.remove('is-invalid');
        errorEl.style.display = 'none';
    };

    // ---- COLORS ----
    function updateColors() {
        const primary = switchElement.getAttribute('color-primary');
        const secondary = switchElement.getAttribute('color-secondary');
        const bg = switchElement.getAttribute('color-bg');
        const text = switchElement.getAttribute('color-text');

        if (primary) switchElement.style.setProperty('--color-primary', primary);
        if (secondary) switchElement.style.setProperty('--color-secondary', secondary);
        if (bg) switchElement.style.setProperty('--color-bg', bg);
        if (text) switchElement.style.setProperty('--color-text', text);
    }

    updateColors();

    // ---- OBSERVER ----
    const observer = new MutationObserver(updateColors);

    observer.observe(switchElement, {
        attributes: true,
        attributeFilter: ['color-primary', 'color-secondary', 'color-bg', 'color-text']
    });
}