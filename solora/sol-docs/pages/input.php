<?php include __DIR__ . '/../includes/header.php'; ?>

<section id="inputs">
    <h2>Inputs</h2>
    <p class="description">
        Prachtig vormgegeven tekstvelden met ondersteuning voor iconen, validatie en glasmorfisme.
    </p>
    <div class="demo-card">
        <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
            <sol-input label="Naam" placeholder="Type je naam..."></sol-input>
            <sol-input label="E-mail" type="email" icon="mail" placeholder="voorbeeld@mail.com"></sol-input>
            <sol-input label="Wachtwoord" type="password" toggle-password icon="lock" icon-pos="end" placeholder="••••••••"></sol-input>
            <sol-input label="Zoeken" variant="glass" icon="search" icon-bg="glass" placeholder="Zoek iets..."></sol-input>
            </div>
            </div>
            <sol-code language="html" label="Usage">
            &lt;sol-input label="Wachtwoord" type="password" toggle-password&gt;&lt;/sol-input&gt;
            &lt;sol-input label="E-mail" type="email" icon="mail"&gt;&lt;/sol-input&gt;
            &lt;sol-input variant="glass" placeholder="Glass style"&gt;&lt;/sol-input&gt;
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
                    <td><code>label</code></td>
                    <td>string</td>
                    <td>-</td>
                    <td>De tekst die boven het inputveld wordt getoond.</td>
                </tr>
                <tr>
                    <td><code>type</code></td>
                    <td>string</td>
                    <td><code>"text"</code></td>
                    <td>Native HTML input type (bijv. <code>text</code>, <code>email</code>, <code>password</code>, <code>number</code>, <code>file</code>).</td>
                </tr>
                <tr>
                    <td><code>toggle-password</code></td>
                    <td>boolean</td>
                    <td><code>false</code></td>
                    <td>Voegt een oogje toe om het wachtwoord te tonen/verbergen (werkt alleen bij <code>type="password"</code>).</td>
                </tr>
                <tr>
                    <td><code>placeholder</code></td>
                    <td>string</td>
                    <td>-</td>
                    <td>Placeholder tekst voor lege velden.</td>
                </tr>

                </tr>
                <tr>
                    <td><code>value</code></td>
                    <td>string</td>
                    <td>-</td>
                    <td>De vooringevulde waarde van het veld. Synchroniseert live met JavaScript.</td>
                </tr>
                <tr>
                    <td><code>variant</code></td>
                    <td><code>"default" | "glass"</code></td>
                    <td><code>"default"</code></td>
                    <td>Verandert de achtergrondstijl van het inputveld.</td>
                </tr>
                <tr>
                    <td><code>icon</code></td>
                    <td>string</td>
                    <td>-</td>
                    <td>Naam van het Lucide icoon om te tonen in of naast het veld.</td>
                </tr>
                <tr>
                    <td><code>icon-pos</code></td>
                    <td><code>"start" | "end" | "start-outside" | "end-outside"</code></td>
                    <td><code>"start"</code></td>
                    <td>Positie van het icoon ten opzichte van het tekstvak.</td>
                </tr>
                <tr>
                    <td><code>icon-bg</code></td>
                    <td><code>"primary" | "secondary" | "success" | "warning" | "danger" | "glass"</code></td>
                    <td>-</td>
                    <td>Voegt een gekleurde of glazen achtergrond toe specifiek aan het icoonblok.</td>
                </tr>
                <tr>
                    <td><code>disabled</code>, <code>required</code>, <code>autofocus</code>, <code>min</code>, <code>max</code>, <code>accept</code></td>
                    <td>native types</td>
                    <td>-</td>
                    <td>Native HTML attributen worden direct doorgegeven voor validatie en focus.</td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
