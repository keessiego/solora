<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SolBrowser - Start</title>
    <!-- We proberen node_modules te laden, maar voegen fallback padding toe -->
    <link rel="stylesheet" href="../node_modules/@kerkhoff-ict/solora/dist/index.css">
    <link rel="stylesheet" href="assets/css/browser.css">
    <style>
        /* Fallback & Layout Fix */
        body {
            margin: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background-color: #f5f5f7;
        }
        .sol-theme-toggle {
            position: fixed !important;
            top: 20px !important;
            right: 20px !important;
            left: auto !important;
            z-index: 9999;
        }
        .start-container {
            width: 100%;
            max-width: 700px;
            padding: 40px 20px;
            text-align: center;
        }
    </style>
</head>
<body class="browser-start">
    <sol-contextmenu></sol-contextmenu>
    <button class="sol-theme-toggle" aria-label="Toggle theme">🌙</button>

    <div class="start-container">
        <div class="logo-area">
            <sol-icon name="compass" size="80" color="var(--color-primary, #0071e3)"></sol-icon>
            <h1 style="margin-top: 20px;">Solora Search</h1>
        </div>

        <div class="search-box">
            <form action="search.php" method="GET">
                <sol-input 
                    name="q" 
                    placeholder="Zoek met Solora..." 
                    variant="glass" 
                    icon="search" 
                    style="--input-bg: rgba(255,255,255,0.6); --input-border: 1px solid rgba(0,0,0,0.1); --input-radius: 24px; padding: 12px 20px; width: 100%;"
                ></sol-input>
            </form>
        </div>

        <div class="favorites-section">
            <span class="section-title" style="display: block; margin-bottom: 20px; opacity: 0.5; font-size: 0.8rem; font-weight: 600; text-transform: uppercase;">Favorieten</span>
            <div class="favorites-grid">
                <sol-card animated bg="white/40" class="favorite-item" onclick="location.href='https://apple.com'">
                    <sol-icon name="apple" size="32"></sol-icon>
                    <span>Apple</span>
                    <sol-context-options label="Opties">
                        <sol-item label="Open in nieuw tabblad" action="js(window.open('https://apple.com'))"></sol-item>
                    </sol-context-options>
                </sol-card>
                <sol-card animated bg="white/40" class="favorite-item" onclick="location.href='https://github.com'">
                    <sol-icon name="github" size="32"></sol-icon>
                    <span>GitHub</span>
                </sol-card>
                <sol-card animated bg="white/40" class="favorite-item" onclick="location.href='../sol-docs/index.php'">
                    <sol-icon name="book-open" size="32"></sol-icon>
                    <span>Docs</span>
                </sol-card>
                <sol-card animated bg="white/40" class="favorite-item">
                    <sol-icon name="plus" size="32"></sol-icon>
                    <span>Voeg toe</span>
                </sol-card>
            </div>
        </div>
    </div>

    <script type="module">
        import { initAll } from '../node_modules/@kerkhoff-ict/solora/dist/index.js';
        initAll();
    </script>
</body>
</html>
