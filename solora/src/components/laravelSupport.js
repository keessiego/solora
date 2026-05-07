export function initLaravelSupport() {
    // Helper to apply errors to all Solora components
    const applyErrors = (errors) => {
        // Clear all existing errors first
        const allSolInputs = document.querySelectorAll('sol-input, sol-textarea, sol-check, sol-dropdown, sol-switch');
        allSolInputs.forEach(el => {
            if (typeof el.hideError === 'function') el.hideError();
        });

        if (!errors || typeof errors !== 'object') return;

        // Apply new errors
        Object.keys(errors).forEach(field => {
            // Laravel array fields (e.g., items.0.name) come back as items.0.name
            // but the input name is usually items[0][name]
            const nameBracket = field.replace(/\.(\w+)/g, '[$1]');
            
            const messages = Array.isArray(errors[field]) ? errors[field] : [errors[field]];
            const message = messages[0];

            // Find elements with name matching 'field' or 'field[]' or bracket notation
            const elements = document.querySelectorAll(`
                [name="${field}"], [name="${field}[]"],
                [name="${nameBracket}"], [name="${nameBracket}[]"],
                [data-name="${field}"]
            `);

            elements.forEach(el => {
                // Find closest Solora component if the name is on a native input inside
                const solComponent = el.closest('sol-input, sol-textarea, sol-check, sol-dropdown, sol-switch') || el;
                if (solComponent && typeof solComponent.showError === 'function') {
                    solComponent.showError(message);
                }
            });
        });
    };

    // 1. Intercept Fetch API
    const originalFetch = window.fetch;
    if (originalFetch) {
        window.fetch = async function(...args) {
            try {
                const response = await originalFetch.apply(this, args);
                // Clone response to read JSON without consuming it for the actual caller
                if (response.status === 422) {
                    const clone = response.clone();
                    clone.json().then(data => {
                        if (data && data.errors) {
                            applyErrors(data.errors);
                        }
                    }).catch(() => {});
                }
                return response;
            } catch (error) {
                throw error;
            }
        };
    }

    // 2. Intercept XMLHttpRequest (Axios, jQuery, old-school AJAX)
    if (typeof window !== 'undefined' && window.XMLHttpRequest) {
        const originalXHRSend = window.XMLHttpRequest.prototype.send;
        if (originalXHRSend) {
            window.XMLHttpRequest.prototype.send = function(...args) {
                this.addEventListener('load', function() {
                    if (this.status === 422) {
                        try {
                            const data = JSON.parse(this.responseText);
                            if (data && data.errors) {
                                applyErrors(data.errors);
                            }
                        } catch (e) {
                            // Not JSON, ignore
                        }
                    }
                });
                return originalXHRSend.apply(this, args);
            };
        }
    }

    // 3. Clear errors when forms are submitted
    document.addEventListener('submit', (e) => {
        const form = e.target;
        const allSolInputs = form.querySelectorAll('sol-input, sol-textarea, sol-check, sol-dropdown, sol-switch');
        allSolInputs.forEach(el => {
            if (typeof el.hideError === 'function') el.hideError();
        });
    });

    // 4. InertiaJS Support
    document.addEventListener('inertia:invalid', (event) => {
        if (event.detail && event.detail.errors) {
            applyErrors(event.detail.errors);
        }
    });

    document.addEventListener('inertia:start', () => {
        applyErrors({}); // Clear errors on new navigation
    });

    // 5. Livewire 3 Support
    document.addEventListener('livewire:initialized', () => {
        window.Livewire.hook('commit', ({ component, commit, respond, succeed, fail }) => {
            succeed(({ snapshot, effect }) => {
                if (snapshot.memo && snapshot.memo.errors) {
                    applyErrors(snapshot.memo.errors);
                } else {
                    applyErrors({}); // Clear if no errors
                }
            });
            fail(() => {
                // Keep errors on fail
            });
        });
    });

    // 6. Livewire 2 Support (legacy fallback)
    document.addEventListener('livewire:load', () => {
        window.Livewire.hook('message.processed', (message, component) => {
            if (message.response && message.response.serverMemo && message.response.serverMemo.errors) {
                applyErrors(message.response.serverMemo.errors);
            } else {
                applyErrors({});
            }
        });
    });

    // 7. Standard Blade / Full Page Reload Support via Meta tag
    // User can add <meta name="laravel-errors" content="{{ $errors->toJson() }}"> to their layout
    const checkMetaErrors = () => {
        const metaErrors = document.querySelector('meta[name="laravel-errors"]');
        if (metaErrors && metaErrors.content) {
            try {
                const parsedErrors = JSON.parse(metaErrors.content);
                // Wacht een micro-tick zodat componenten (zoals sol-input) eerst kunnen initialiseren
                setTimeout(() => applyErrors(parsedErrors), 50);
            } catch (e) {
                console.error("Solora: Kon laravel-errors meta tag niet parsen.", e);
            }
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkMetaErrors);
    } else {
        checkMetaErrors();
    }
}
