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
            <h1 class="text-3xl font-bold">Solora Get Started</h1>
            
            <section class="space-y-4">
              <h2 class="text-xl font-semibold">Installatie</h2>
              <p>Installeer Solora via npm:</p>
              <pre class="bg-gray-100 p-4 rounded text-sm font-mono">npm i @kerkhoff-ict/solora</pre>
            </section>

            <section class="space-y-4">
              <h2 class="text-xl font-semibold">Gebruik</h2>
              <p>Importeer de componenten in je project en gebruik de klassen zoals hieronder:</p>
              <pre class="bg-gray-100 p-4 rounded text-sm font-mono">&lt;button class="btn-glass btn-lg"&gt;Verzenden&lt;/button&gt;</pre>
              <p class="mt-2">Dit zal een stijlvolle Apple-achtige glass knop renderen met TailwindCSS.</p>

              <!-- Live voorbeeld -->
              <div class="mt-4">
                <button class="btn-glass btn-lg">Verzenden</button>
              </div>
            </section>

            <section class="space-y-4">
              <h2 class="text-xl font-semibold">Opbouw</h2>
              <p>Solora gebruikt utility-first styling via TailwindCSS. Klassen zoals <code>btn-glass</code> en <code>btn-lg</code> bepalen het uiterlijk en de grootte van knoppen. Elke component wordt straks uitgebreid met documentatie op aparte pagina's.</p>
            </section>
          </div>
          <section class="mx-8">
            <hr class="mb-4 text-zinc-300 rounded-full">
            <div class="flex flex-row justify-between">
              <button class="btn-primary btn-sm disabled" onclick="window.location.href = '#'">< Vorige</button>
              <button class="btn-primary btn-sm" onclick="window.location.href = 'buttons.php'">Volgende ></button>
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
  </body>
</html>