<!doctype html>
<html lang="nl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Solora Get started</title>
  </head>
  <body class="h-screen w-screen">
    <div class="flex h-full w-full">
      <div class="flex h-full w-full">
        <!-- Sidebar -->
        <?php include "sidebar.php" ?>

        <!-- Main content -->
        <div class="p-6">
          <h1>Solora Buttons</h1>

          <div class="p-5 flex flex-col space-y-3 bg-blue-400 rounded-lg">
            <button class="btn-primary btn-sm rounded-full">Primary medium</button>
            <button class="btn-secondary btn-md rounded-full">Secondary medium</button>
            <button class="btn-glass btn-md rounded-full">Glass button</button>
          </div>
        </div>
      </div>

      <!-- Sidebar rechts -->
      <div class="w-full max-w-xl h-full text-sm pt-2xl pl-xl text-left">
        <b>Buttons</b>
      </div>
    </div>
  </body>
</html>
