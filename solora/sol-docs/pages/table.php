<?php include __DIR__ . '/../includes/header.php'; ?>

<section id="tables">
    <h2>Tables</h2>
    <p class="description">
        Clean, responsive, and elegant tables inspired by Apple's design language. 
        They support dark mode, optional striped rows, and horizontal scrolling for mobile devices.
    </p>
    
    <div class="demo-card">
        <sol-table>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Steve Jobs</td>
                        <td>Founder</td>
                        <td>Active</td>
                        <td>steve@apple.com</td>
                    </tr>
                    <tr>
                        <td>Tim Cook</td>
                        <td>CEO</td>
                        <td>Active</td>
                        <td>tim@apple.com</td>
                    </tr>
                    <tr>
                        <td>Jony Ive</td>
                        <td>Chief Design Officer</td>
                        <td>Inactive</td>
                        <td>jony@apple.com</td>
                    </tr>
                </tbody>
            </table>
        </sol-table>
    </div>
    
    <sol-code language="html" label="Basic Usage">
&lt;sol-table&gt;
    &lt;table&gt;
        &lt;thead&gt;
            &lt;tr&gt;
                &lt;th&gt;Name&lt;/th&gt;
                &lt;th&gt;Role&lt;/th&gt;
                &lt;th&gt;Status&lt;/th&gt;
                &lt;th&gt;Email&lt;/th&gt;
            &lt;/tr&gt;
        &lt;/thead&gt;
        &lt;tbody&gt;
            &lt;tr&gt;
                &lt;td&gt;Steve Jobs&lt;/td&gt;
                &lt;td&gt;Founder&lt;/td&gt;
                &lt;td&gt;Active&lt;/td&gt;
                &lt;td&gt;steve@apple.com&lt;/td&gt;
            &lt;/tr&gt;
            &lt;!-- more rows... --&gt;
        &lt;/tbody&gt;
    &lt;/table&gt;
&lt;/sol-table&gt;
    </sol-code>

    <h3 style="margin-top: 60px; margin-bottom: 20px;">Striped Table</h3>
    <p class="description">
        Add the <code>striped</code> attribute to alternate the background color of the rows.
    </p>

    <div class="demo-card">
        <sol-table striped>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>MacBook Pro 16"</td>
                        <td>Laptop</td>
                        <td>$2,499</td>
                    </tr>
                    <tr>
                        <td>iPhone 15 Pro</td>
                        <td>Phone</td>
                        <td>$999</td>
                    </tr>
                    <tr>
                        <td>iPad Pro</td>
                        <td>Tablet</td>
                        <td>$799</td>
                    </tr>
                </tbody>
            </table>
        </sol-table>
    </div>

    <sol-code language="html" label="Striped Usage">
&lt;sol-table striped&gt;
    &lt;table&gt;
        &lt;!-- content --&gt;
    &lt;/table&gt;
&lt;/sol-table&gt;
    </sol-code>

    <h3 style="margin-top: 60px; margin-bottom: 20px;">Row-Level Context Menu</h3>
    <p class="description">
        Webbrowsers zijn strikt: in een <code>&lt;tr&gt;</code> mag normaal gesproken alleen <code>&lt;td&gt;</code> of <code>&lt;th&gt;</code> staan. Als je toch een rijspecifiek contextmenu wilt toevoegen zonder de HTML-structuur te breken, kun je de <code>&lt;sol-context-options&gt;</code> in een <code>&lt;template&gt;</code> tag wrappen. Solora pakt dit automatisch op!
    </p>

    <div class="demo-card">
        <sol-table striped>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Actie</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <template>
                            <sol-context-options label="Rij Opties">
                                <sol-item label="Bewerken" action="js(alert('Bewerken geklikt!'))"></sol-item>
                                <sol-item label="Verwijderen" action="js(console.log('Verwijderen'))"></sol-item>
                            </sol-context-options>
                        </template>
                        <td>Steve Jobs</td>
                        <td>Founder</td>
                        <td><span class="badge" style="background: var(--text-muted);">Rechtsklik mij</span></td>
                    </tr>
                </tbody>
            </table>
        </sol-table>
    </div>

    <sol-code language="html" label="Template Usage">
&lt;sol-table striped&gt;
    &lt;table&gt;
        &lt;tbody&gt;
            &lt;tr&gt;
                &lt;!-- Plaats de context-options in een template tag direct in de TR --&gt;
                &lt;template&gt;
                    &lt;sol-context-options label="Rij Opties"&gt;
                        &lt;sol-item label="Bewerken" action="js(...)"&gt;&lt;/sol-item&gt;
                        &lt;sol-item label="Verwijderen" action="js(...)"&gt;&lt;/sol-item&gt;
                    &lt;/sol-context-options&gt;
                &lt;/template&gt;
                
                &lt;td&gt;Steve Jobs&lt;/td&gt;
                &lt;td&gt;Founder&lt;/td&gt;
            &lt;/tr&gt;
        &lt;/tbody&gt;
    &lt;/table&gt;
&lt;/sol-table&gt;
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
                    <td><code>striped</code></td>
                    <td>boolean</td>
                    <td><code>false</code></td>
                    <td>Geeft de even rijen een licht afwijkende achtergrondkleur voor betere leesbaarheid.</td>
                </tr>
                <tr>
                    <td><code>variant</code></td>
                    <td><code>"default" | "glass"</code></td>
                    <td><code>"default"</code></td>
                    <td>Bepaalt de visuele stijl van de tabel. De glass variant heeft meer blur en een glansrand.</td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
td&gt;Founder&lt;/td&gt;
            &lt;/tr&gt;
        &lt;/tbody&gt;
    &lt;/table&gt;
&lt;/sol-table&gt;
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
                    <td><code>striped</code></td>
                    <td>boolean</td>
                    <td><code>false</code></td>
                    <td>Geeft de even rijen een licht afwijkende achtergrondkleur voor betere leesbaarheid.</td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
