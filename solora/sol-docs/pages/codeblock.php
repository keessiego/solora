<?php include __DIR__ . '/../includes/header.php'; ?>

<section id="codeblocks">
    <h2>Codeblocks</h2>
    <p class="description">
        Toon je code in stijl met syntax highlighting, macOS window controls en een kopieerfunctie.
    </p>
    <div class="demo-card">
        <sol-code language="javascript" label="helloWorld.js">
function helloWorld() {
    console.log("Hello, Solora!");
}
        </sol-code>
    </div>
    <sol-code language="html" label="Usage">
&lt;sol-code language="javascript" label="index.js"&gt;
    console.log("Code goes here");
&lt;/sol-code&gt;
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
                    <td><code>language</code> of <code>lang</code></td>
                    <td>string</td>
                    <td><code>"javascript"</code></td>
                    <td>De programmeertaal voor Prism.js syntax highlighting (bijv. <code>html</code>, <code>css</code>, <code>php</code>, <code>bash</code>).</td>
                </tr>
                <tr>
                    <td><code>label</code></td>
                    <td>string</td>
                    <td>-</td>
                    <td>De bestandsnaam of titel die gecentreerd in de macOS menubalk wordt getoond.</td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
