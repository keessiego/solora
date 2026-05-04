<?php include __DIR__ . '/../includes/header.php'; ?>

<section id="buttons">
    <h2>Buttons</h2>
    <p class="description">
        Interactieve elementen met subtiele haptische feedback-visuele stijlen. 
        Ondersteunt verschillende maten, kleuren en glas-effecten.
    </p>
    <div class="demo-card">
        <div class="demo-grid">
            <sol-button variant="primary">Primary</sol-button>
            <sol-button variant="secondary">Secondary</sol-button>
            <sol-button variant="success">Success</sol-button>
            <sol-button variant="danger">Danger</sol-button>
            <sol-button variant="warning">Warning</sol-button>
            <sol-button variant="glass">Glass Effect</sol-button>
        </div>
        <div class="demo-grid" style="margin-top: 20px; align-items: center;">
            <sol-button variant="popover">Popover Link</sol-button>
            <sol-button size="sm">Small</sol-button>
            <sol-button size="md">Medium</sol-button>
            <sol-button size="lg">Large</sol-button>
        </div>
    </div>
    <sol-code language="html" label="Usage">
&lt;sol-button variant="primary" size="lg"&gt;Klik op mij&lt;/sol-button&gt;
&lt;sol-button variant="popover"&gt;Dropdown tekst&lt;/sol-button&gt;
    </sol-code>

    <h3 style="margin-top: 60px; margin-bottom: 20px;">API Referentie</h3>
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
                    <td><code>variant</code></td>
                    <td><code>"primary" | "secondary" | "success" | "warning" | "danger" | "glass" | "popover"</code></td>
                    <td><code>"primary"</code></td>
                    <td>Bepaalt de visuele stijl van de knop. (<code>color</code> werkt ook nog voor backward compatibility).</td>
                </tr>
                <tr>
                    <td><code>size</code></td>
                    <td><code>"sm" | "md" | "lg" | "xl"</code></td>
                    <td><code>"md"</code></td>
                    <td>Grootte van de knop (padding en font-size).</td>
                </tr>
                <tr>
                    <td><code>rounded</code></td>
                    <td>boolean</td>
                    <td><code>false</code></td>
                    <td>Maakt de knop perfect rond (1:1 aspect ratio), ideaal voor iconen.</td>
                </tr>
                <tr>
                    <td><code>disabled</code></td>
                    <td>boolean</td>
                    <td><code>false</code></td>
                    <td>Schakelt interactie uit en verlaagt de opaciteit.</td>
                </tr>
                <tr>
                    <td><code>type</code></td>
                    <td><code>"button" | "submit" | "reset"</code></td>
                    <td><code>"button"</code></td>
                    <td>Het native type van de onderliggende <code>&lt;button&gt;</code>.</td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
