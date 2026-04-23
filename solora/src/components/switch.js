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

    const slider = document.createElement('div');
    slider.className = 'slider';

    switchElement.appendChild(input);
    switchElement.appendChild(slider);

    slider.addEventListener('click', () => {
        input.checked = !input.checked;
        switchElement.dispatchEvent(new Event('change', { bubbles: true }));
    });

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