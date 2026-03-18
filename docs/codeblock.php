<!doctype html>
<html lang="nl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Solora Get Started</title>
  </head>
  <body class="h-screen w-screen bg-gray-50 text-gray-900">
    <div class="flex h-full w-full">
      <div class="flex h-full w-full">
        
        <!-- Sidebar links -->
        <?php include "sidebar.php" ?>

        <div class="w-full flex flex-col h-full overflow-hidden">
          <!-- Navbar / Breadcrumb -->
          <?php
          $pathSegments = [
              ["name" => "Get Started", "link" => "install.php"]
          ];
          include "navbar.php";
          ?>

          <!-- Main content -->
          <div class="flex-1 overflow-auto">
            <div class="p-8 flex flex-col gap-8 max-w-4xl">
              <section class="space-y-6">
                <h2 class="text-xl font-semibold">Codeblock</h2>
                <p>
                  De <code>codeblock</code> component toont code met syntax highlighting,
                  interactieve knoppen en optionele functionaliteit zoals kopiëren,
                  minimaliseren en fullscreen.
                </p>

                <!-- Live toggle knoppen -->
                <div class="flex gap-2">
                  <button class="btn-primary btn-sm toggle-btn" data-target="example1" data-view="preview">Preview</button>
                  <button class="btn-primary btn-sm toggle-btn" data-target="example1" data-view="code">Code</button>
                </div>

                <!-- Preview -->
                <div id="example1-preview" class="toggle-view">
                  <div class="codeblock">
                    <div class="pre-top">
                      <div class="pre-top-btns">
                        <span class="pre-btn-red"></span>
                        <span class="pre-btn-orange"></span>
                        <span class="pre-btn-green"></span>
                      </div>
                      <button class="btn-glass btn-sm pre-copy-btn">Copy</button>
                    </div>
                    <div class="pre-content">
<pre data-language="js">
// Voorbeeld codeblock
const greet = (name) => {
  console.log(`Hello ${name}`);
};
greet("Solora");
</pre>
                    </div>
                  </div>
                </div>

                <!-- Code -->
                <div id="example1-code" class=" codeblock hidden">
                  <div class="pre-content">
<pre data-language="html">
&lt;div class="codeblock draggable"&gt;
  &lt;div class="pre-top"&gt;
    &lt;div class="pre-top-btns"&gt;
      &lt;span class="pre-btn-red close-btn"&gt;&lt;/span&gt;
      &lt;span class="pre-btn-orange minimize-btn"&gt;&lt;/span&gt;
      &lt;span class="pre-btn-green maximize-btn"&gt;&lt;/span&gt;
    &lt;/div&gt;
    &lt;button class="btn-glass btn-sm pre-copy-btn"&gt;Copy&lt;/button&gt;
  &lt;/div&gt;

  &lt;div class="pre-content"&gt;
    &lt;pre data-language="js"&gt;
const greet = (name) =&gt; {
  console.log(`Hello ${name}`);
};
greet("Solora");
    &lt;/pre&gt;
  &lt;/div&gt;
&lt;/div&gt;
</pre>          
                    <button class="btn-glass btn-md pre-copy-btn btn-in-pre">Copy</button>          
                  </div>

                </div>

                <!-- Opties uitleg -->
                <div class="space-y-2">
                  <h3 class="font-semibold">Opties</h3>
                  <ul class="list-disc ml-6">
                    <li><b>draggable</b> – maakt het blok verplaatsbaar</li>
                    <li><b>btn-in-pre</b> – plaatst de knop visueel in de code (rechtsboven)</li>
                    <li><b>data-language</b> – bepaalt syntax highlighting (bijv. js, html)</li>
                  </ul>
                </div>

                <!-- Zonder toolbar voorbeeld -->
                <div class="space-y-2">
                  <h3 class="font-semibold">Zonder toolbar</h3>
                  <p>Je kunt de <code>.pre-top</code> weglaten voor een minimalistische variant:</p>

                  <div class="codeblock">
                    <div class="pre-content">
<pre data-language="js">
print("Minimal example")
</pre>
                      <button class="btn-glass btn-sm pre-copy-btn btn-in-pre">Copy</button>
                    </div>
                  </div>
                </div>

                <!-- Knoppen uitleg -->
                <div class="space-y-2">
                  <h3 class="font-semibold">Knoppen</h3>
                  <ul class="list-disc ml-6">
                    <li><span class="text-red-500">●</span> Close – verwijdert het blok</li>
                    <li><span class="text-yellow-500">●</span> Minimize – klapt de code in</li>
                    <li><span class="text-green-500">●</span> Maximize – fullscreen weergave</li>
                    <li>Copy – kopieert de inhoud van de code</li>
                  </ul>
                </div>
              </section>
            </div>
            <section class="mx-8">
              <hr class="mb-4 text-zinc-300 rounded-full">
              <div class="flex flex-row justify-between">
                <button class="btn-primary btn-sm" onclick="window.location.href = 'buttons.php'">< Vorige</button>
                <button class="btn-primary btn-sm disabled" onclick="window.location.href = '#'">Volgende ></button>
              </div>
            </section>
          </div>
        </div>

        <!-- Sidebar rechts -->
        <div class="w-full max-w-sm h-full text-sm p-8 text-left bg-gray-50 border-l border-gray-200">
          <b>Inhoud</b>
          <ul class="mt-2 space-y-1">
            <li>Installatie</li>
            <li>Gebruik</li>
            <li>Opbouw</li>
            <li>Breadcrumb</li>
          </ul>
        </div>

      </div>
    </div>
    <script>
// --- Toggle preview / code ---
document.querySelectorAll('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.target;
    const view = btn.dataset.view;

    document.querySelectorAll(`#${target}-preview, #${target}-code`)
      .forEach(el => el.classList.add('hidden'));

    document.getElementById(`${target}-${view}`)
      .classList.remove('hidden');
  });
});
</script>
    <script type="module" src="/node_modules/@kerkhoff-ict/solora/dist/index.js"></script>
  </body>
</html>