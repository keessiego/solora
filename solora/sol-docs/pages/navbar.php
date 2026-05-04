<?php include __DIR__ . '/../includes/header.php'; ?>

<section id="navbar">
    <h2>Navbar</h2>
    <p class="description">
        Een elegante, transparante navigatiebalk met blur-effect in Apple-stijl. 
        Volledig responsive met een geïntegreerd mobiel menu.
    </p>
    
    <div class="demo-card" style="padding: 0; overflow: hidden; height: 300px; position: relative; background: #f5f5f7;">
        <div style="position: absolute; width: 100%; top: 0; left: 0;">
            <sol-navbar brand="Solora" brand-href="#">
                <a href="#home">Home</a>
                <a href="#features">Features</a>
                <a href="#docs">Docs</a>
                <a href="#support">Support</a>
            </sol-navbar>
            <div style="padding: 40px; text-align: center;">
                <h3>Scroll om de blur te zien</h3>
                <p>De navbar blijft bovenaan staan met een prachtig translucency effect.</p>
                <div style="height: 500px;"></div>
            </div>
        </div>
    </div>

    <sol-code language="html" label="Web Component Gebruik">
&lt;sol-navbar brand="Mijn App" brand-href="/" sticky&gt;
    &lt;a href="/home"&gt;Home&lt;/a&gt;
    &lt;a href="/producten"&gt;Producten&lt;/a&gt;
    &lt;a href="/contact"&gt;Contact&lt;/a&gt;
&lt;/sol-navbar&gt;
    </sol-code>

    <h3>Standalone HTML (Laravel/Blade)</h3>
    <p class="description">
        Wil je geen Web Components gebruiken? Geen probleem. De CSS werkt ook perfect met standaard HTML klassen. Voeg <code>style="position: sticky; top: 0; z-index: 1000;"</code> toe aan de <code>nav</code> tag voor het sticky effect.
    </p>

    <sol-code language="html" label="Standalone HTML">
&lt;nav class="sol-navbar" style="position: sticky; top: 0; z-index: 1000;"&gt;
    &lt;div class="sol-navbar-container"&gt;
        &lt;a href="#" class="sol-navbar-brand"&gt;Solora&lt;/a&gt;
        &lt;ul class="sol-navbar-menu"&gt;
            &lt;li&gt;&lt;a href="#"&gt;Home&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href="#"&gt;Over ons&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href="#"&gt;Diensten&lt;/a&gt;&lt;/li&gt;
        &lt;/ul&gt;
        &lt;button class="sol-navbar-toggle" aria-label="Toggle menu"&gt;
            &lt;span&gt;&lt;/span&gt;
            &lt;span&gt;&lt;/span&gt;
            &lt;span&gt;&lt;/span&gt;
        &lt;/button&gt;
    &lt;/div&gt;
&lt;/nav&gt;
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
                    <td><code>brand</code></td>
                    <td><code>string</code></td>
                    <td><code>"Solora"</code></td>
                    <td>De tekst die als logo/merknaam wordt getoond.</td>
                </tr>
                <tr>
                    <td><code>brand-href</code></td>
                    <td><code>string</code></td>
                    <td><code>"#"</code></td>
                    <td>De link waar de brand-naam naar verwijst.</td>
                </tr>
                <tr>
                    <td><code>sticky</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Indien aanwezig, blijft de navbar aan de bovenkant van het scherm plakken tijdens het scrollen.</td>
                </tr>
            </tbody>
        </table>
    </div>

    <h3 style="margin-top: 40px;">CSS Variabelen</h3>
    <p>Pas de look aan via deze variabelen:</p>
    <sol-code language="css">
:root {
  --navbar-height: 44px;
  --navbar-bg: rgba(255, 255, 255, 0.8);
  --navbar-blur: 20px;
  --navbar-text: #1d1d1f;
}
    </sol-code>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
