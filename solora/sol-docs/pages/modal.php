<?php include __DIR__ . '/../includes/header.php'; ?>

<section id="modals">
    <h2>Modals</h2>
    <p class="description">
        Flexibele en elegante modals met ingebouwde achtergrond blur, die zich gedragen zoals iOS / macOS dialogs. De footer knoppen worden automatisch naast of onder elkaar gezet.
    </p>

    <div class="demo-card">
        <div style="display: flex; gap: 10px;">
            <sol-button toggle-modal="demo-modal-1">Open Standaard Modal</sol-button>
            <sol-button toggle-modal="demo-modal-2" color="glass">Open Glass Modal</sol-button>
        </div>

        <sol-modal id="demo-modal-1" size="sm">
            <h3 style="margin-top:0;">Bevestiging</h3>
            <p style="margin-bottom:0; color:var(--color-text-dark); opacity:0.8;">Weet je zeker dat je deze actie wilt uitvoeren? Dit kan niet ongedaan worden gemaakt.</p>
            <sol-modal-button close-modal>Annuleren</sol-modal-button>
            <sol-modal-button close-modal bold variant="danger">Verwijderen</sol-modal-button>
        </sol-modal>

        <sol-modal id="demo-modal-2" variant="glass" size="md">
            <h3 style="margin-top:0;">Glass Modal</h3>
            <p style="margin-bottom:0;">Deze modal gebruikt het prachtige glassmorfisme effect. De achtergrond wordt geblurred en de border is transparant.</p>
            <sol-modal-button close-modal bold>Begrepen</sol-modal-button>
        </sol-modal>
    </div>

    <sol-code language="html" label="Usage">
&lt;!-- Knop om de modal te openen --&gt;
&lt;sol-button toggle-modal="mijn-modal"&gt;Open Modal&lt;/sol-button&gt;

&lt;!-- De Modal --&gt;
&lt;sol-modal id="mijn-modal" size="sm" variant="default"&gt;
    &lt;h3&gt;Titel van de modal&lt;/h3&gt;
    &lt;p&gt;Inhoud van de modal hier...&lt;/p&gt;
    
    &lt;!-- Footer knoppen (worden automatisch onderaan geplaatst) --&gt;
    &lt;sol-modal-button close-modal&gt;Annuleren&lt;/sol-modal-button&gt;
    &lt;sol-modal-button close-modal bold variant="primary"&gt;Opslaan&lt;/sol-modal-button&gt;
&lt;/sol-modal&gt;
    </sol-code>

    <h3 style="margin-top: 60px; margin-bottom: 20px;">API Referentie</h3>
    
    <h4><code>&lt;sol-modal&gt;</code></h4>
    <div class="table-responsive">
        <table class="api-table">
            <thead>
                <tr>
                    <th>Attribuut</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Beschrijving</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>open</code></td>
                    <td>boolean</td>
                    <td>-</td>
                    <td>Als dit attribuut aanwezig is, is de modal zichtbaar. Je kunt dit ook via JavaScript toggelen (<code>modal.setAttribute('open', '')</code>)</td>
                </tr>
                <tr>
                    <td><code>size</code></td>
                    <td><code>"sm" | "md" | "lg" | "xl"</code></td>
                    <td><code>"sm"</code></td>
                    <td>Bepaalt de maximale breedte van de modal.</td>
                </tr>
                <tr>
                    <td><code>variant</code></td>
                    <td><code>"default" | "glass"</code></td>
                    <td><code>"default"</code></td>
                    <td>De visuele stijl van de modal.</td>
                </tr>
            </tbody>
        </table>
    </div>

    <h4 style="margin-top: 30px;"><code>&lt;sol-modal-button&gt;</code></h4>
    <div class="table-responsive">
        <table class="api-table">
            <thead>
                <tr>
                    <th>Attribuut</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Beschrijving</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>close-modal</code></td>
                    <td>boolean</td>
                    <td>-</td>
                    <td>Sluit automatisch de bovenliggende modal als erop geklikt wordt.</td>
                </tr>
                <tr>
                    <td><code>bold</code></td>
                    <td>boolean</td>
                    <td>-</td>
                    <td>Maakt de tekst van de knop dikgedrukt (handig voor de primaire actie).</td>
                </tr>
                <tr>
                    <td><code>variant</code></td>
                    <td><code>"default" | "primary" | "danger" | "success" | "warning"</code></td>
                    <td><code>"default"</code></td>
                    <td>Kleur van de tekst in de knop. (iOS stijl).</td>
                </tr>
                <tr>
                    <td><code>type</code> / <code>form</code></td>
                    <td>string</td>
                    <td>-</td>
                    <td>Wordt direct doorgegeven aan de native <code>&lt;button&gt;</code>, handig voor submit knoppen (<code>type="submit" form="mijn-form"</code>).</td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>