<?php include __DIR__ . '/../includes/header.php'; ?>

<section id="popover">
    <h2>Popover</h2>
    <p class="description">
        Een veelzijdige component voor het tonen van custom content bij interactie. 
        In tegenstelling tot een dropdown kan een popover elk type HTML bevatten.
    </p>
    
    <div class="demo-card">
        <div style="display: flex; gap: 40px; flex-wrap: wrap; align-items: center;">
            <sol-popover pos="bottom-left">
                <sol-button slot="trigger" variant="popover">Instellingen</sol-button>
                <div style="padding: 10px; width: 200px;">
                    <h4 style="margin: 0 0 12px 0;">Account</h4>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <sol-check checked>Meldingen aan</sol-check>
                        <sol-check>Privacy modus</sol-check>
                        <sol-button size="sm" style="margin-top: 10px;">Opslaan</sol-button>
                    </div>
                </div>
            </sol-popover>

            <sol-popover pos="bottom-left">
                <sol-button slot="trigger" variant="popover">Acties</sol-button>
                <div style="padding: 4px; width: 160px; display: flex; flex-direction: column;">
                    <sol-button variant="popover-item">Kopieer link</sol-button>
                    <sol-button variant="popover-item">Bewerk item</sol-button>
                    <div style="height: 1px; background: rgba(0,0,0,0.05); margin: 4px 6px;"></div>
                    <sol-button variant="popover-item" style="color: var(--color-danger, #ff3b30) !important;">Verwijderen</sol-button>
                </div>
            </sol-popover>

            <sol-popover pos="top-center">
                <sol-button slot="trigger" variant="popover">Help & Info</sol-button>
                <div style="padding: 10px; width: 180px;">
                    <p style="margin: 0; font-size: 0.9rem;">Hulp nodig? Neem contact op met support.</p>
                </div>
            </sol-popover>
        </div>
    </div>

    <sol-code language="html" label="Gebruik met de nieuwe variant">
&lt;sol-popover&gt;
    &lt;sol-button slot="trigger" variant="popover"&gt;Klik mij&lt;/sol-button&gt;
    &lt;div style="padding: 15px;"&gt;
        Content gaat hier...
    &lt;/div&gt;
&lt;/sol-popover&gt;
    </sol-code>

    <h3>Positionering</h3>
    <p class="description">
        Zowel <code>&lt;sol-popover&gt;</code> als <code>&lt;sol-dropdown&gt;</code> ondersteunen het <code>pos</code> attribuut.
    </p>
    <div class="table-responsive">
        <table class="api-table">
            <thead>
                <tr>
                    <th>Positie</th>
                    <th>Beschrijving</th>
                </tr>
            </thead>
            <tbody>
                <tr><td><code>top-left</code>, <code>top-center</code>, <code>top-right</code></td><td>Boven het element, uitgelijnd op links, midden of rechts.</td></tr>
                <tr><td><code>bottom-left</code>, <code>bottom-center</code>, <code>bottom-right</code></td><td>Onder het element (standaard).</td></tr>
                <tr><td><code>left-center</code>, <code>right-center</code></td><td>Links of rechts van het element, verticaal gecentreerd.</td></tr>
            </tbody>
        </table>
    </div>

    <p style="margin-top: 20px; font-style: italic; opacity: 0.8;">
        Opmerking: Als een popover buiten het scherm dreigt te vallen, wordt de positie automatisch gecorrigeerd om binnen het viewport te blijven.
    </p>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
