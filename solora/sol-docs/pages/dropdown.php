<?php include __DIR__ . '/../includes/header.php'; ?>

<section id="dropdowns">
    <h2>Dropdowns</h2>
    <p class="description">
        Elegante selectiemenu's met volledige toetsenbordondersteuning en vervaagde achtergronden.
    </p>
    <div class="demo-card">
        <sol-dropdown placeholder="Kies een optie" name="fruit">
            <div class="dropdown-label">Fruit</div>
            <div class="dropdown-item" data-value="apple">Appel</div>
            <div class="dropdown-item" data-value="banana">Banaan</div>
            <div class="dropdown-divider"></div>
            <div class="dropdown-label">Groenten</div>
            <div class="dropdown-item" data-value="carrot">Wortel</div>
            <div class="dropdown-item" aria-disabled="true">Niet beschikbaar</div>
        </sol-dropdown>
    </div>
    <sol-code language="html" label="Usage">
&lt;sol-dropdown placeholder="Kies iets" name="fruit"&gt;
    &lt;div class="dropdown-label"&gt;Categorie&lt;/div&gt;
    &lt;div class="dropdown-item" data-value="1"&gt;Optie 1&lt;/div&gt;
    &lt;div class="dropdown-divider"&gt;&lt;/div&gt;
    &lt;div class="dropdown-item" data-value="2"&gt;Optie 2&lt;/div&gt;
&lt;/sol-dropdown&gt;
    </sol-code>

    <h3 style="margin-top: 60px; margin-bottom: 20px;">API Referentie</h3>
    <div class="table-responsive">
        <table class="api-table">
            <thead>
                <tr>
                    <th>Attribuut (sol-dropdown)</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Beschrijving</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>name</code></td>
                    <td>string</td>
                    <td><code>"dropdown"</code></td>
                    <td>Naam voor de verborgen input (handig voor formulierinzendingen).</td>
                </tr>
                <tr>
                    <td><code>placeholder</code></td>
                    <td>string</td>
                    <td>-</td>
                    <td>Tekst die wordt weergegeven als er niets geselecteerd is.</td>
                </tr>
            </tbody>
        </table>
    </div>

    <h3 style="margin-top: 40px; margin-bottom: 20px;">Child Elementen (Binnenin)</h3>
    <div class="table-responsive">
        <table class="api-table">
            <thead>
                <tr>
                    <th>Element / Class</th>
                    <th>Beschrijving</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>&lt;div class="dropdown-item"&gt;</code></td>
                    <td>Een selecteerbare optie.</td>
                </tr>
                <tr>
                    <td><code>data-value="..."</code> op item</td>
                    <td>De onderliggende waarde die in de hidden input wordt gezet. Indien afwezig, wordt de textContent gebruikt.</td>
                </tr>
                <tr>
                    <td><code>aria-disabled="true"</code> op item</td>
                    <td>Maakt een item niet-selecteerbaar en grijs.</td>
                </tr>
                <tr>
                    <td><code>&lt;div class="dropdown-label"&gt;</code></td>
                    <td>Een niet-klikbaar label (header) voor een groep opties.</td>
                </tr>
                <tr>
                    <td><code>&lt;div class="dropdown-divider"&gt;</code></td>
                    <td>Een subtiele horizontale lijn om items te scheiden.</td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
