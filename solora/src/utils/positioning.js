/**
 * Berekent de positie van een floating element (dropdown/popover) ten opzichte van een trigger.
 * @param {HTMLElement} trigger - Het element dat de floating content triggert.
 * @param {HTMLElement} content - Het element dat getoond moet worden.
 * @param {string} pos - De gewenste positie (e.g. 'bottom-left', 'top-right').
 * @param {number} offset - Afstand tussen trigger en content.
 */
export function calculatePosition(trigger, content, pos = 'bottom-left', offset = 8) {
    const triggerRect = trigger.getBoundingClientRect();
    const contentWidth = content.offsetWidth;
    const contentHeight = content.offsetHeight;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = 0;
    let left = 0;

    // Splits de positie in y en x (bijv. 'bottom-left' -> y='bottom', x='left')
    let [y, x] = pos.split('-');
    if (!x) {
        // Alleen 'top', 'bottom', 'left', 'right' opgegeven
        if (y === 'top' || y === 'bottom') x = 'center';
        else { x = y; y = 'center'; }
    }

    // Y-as berekening
    switch (y) {
        case 'top':
            top = triggerRect.top - contentHeight - offset;
            break;
        case 'bottom':
            top = triggerRect.bottom + offset;
            break;
        case 'center':
            top = triggerRect.top + (triggerRect.height / 2) - (contentHeight / 2);
            break;
    }

    // X-as berekening
    switch (x) {
        case 'left':
            left = triggerRect.left;
            if (y === 'center') left = triggerRect.left - contentWidth - offset;
            break;
        case 'right':
            left = triggerRect.right - contentWidth;
            if (y === 'center') left = triggerRect.right + offset;
            break;
        case 'center':
            left = triggerRect.left + (triggerRect.width / 2) - (contentWidth / 2);
            break;
    }

    // Boundary checks (binnen scherm houden)
    if (left < 5) left = 5;
    if (left + contentWidth > viewportWidth - 5) left = viewportWidth - contentWidth - 5;
    
    if (top < 5) {
        // Als het boven het scherm valt en we wilden 'top', probeer dan 'bottom'
        if (y === 'top') top = triggerRect.bottom + offset;
        else top = 5;
    }
    if (top + contentHeight > viewportHeight - 5) {
        // Als het onder het scherm valt en we wilden 'bottom', probeer dan 'top'
        if (y === 'bottom') top = triggerRect.top - contentHeight - offset;
        else top = viewportHeight - contentHeight - 5;
    }

    return { top, left };
}
