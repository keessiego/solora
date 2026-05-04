<?php
$query = isset($_GET['q']) ? htmlspecialchars($_GET['q']) : 'Solora UI Kit';
?>
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $query ?> - Solora Zoeken</title>
    <link rel="stylesheet" href="../node_modules/@kerkhoff-ict/solora/dist/index.css">
    <link rel="stylesheet" href="assets/css/browser.css">
    <style>
        .sol-theme-toggle {
            position: fixed !important;
            top: 10px !important;
            right: 20px !important;
            left: auto !important;
            z-index: 9999;
        }
        .search-page {
            display: block; /* Geen flex op body voor de zoekpagina */
        }
    </header>
</head>
<body class="search-page">

    <button class="sol-theme-toggle" aria-label="Toggle theme">🌙</button>
    <sol-contextmenu></sol-contextmenu>

    <header class="browser-header">
        <div class="header-left">
            <sol-icon name="compass" size="32" color="var(--color-primary, #0071e3)" onclick="location.href='index.php'" style="cursor:pointer;"></sol-icon>
            <div class="header-search">
                <form action="search.php" method="GET">
                    <sol-input name="q" value="<?= $query ?>" variant="glass" icon="search" size="sm" style="width: 100%;"></sol-input>
                </form>
            </div>
        </div>
        <div class="header-right">
            <sol-button color="glass" rounded><sol-icon name="settings" size="20"></sol-icon></sol-button>
            <sol-button color="primary" size="sm">Inloggen</sol-button>
        </div>
    </header>

    <div class="search-layout">
        <aside class="search-sidebar">
            <sol-card bg="white/20" style="padding: 20px;">
                <h3 style="font-size: 1rem; margin-top: 0;">Filters</h3>
                <div class="filter-group">
                    <label style="display: block; margin-bottom: 8px; font-size: 0.7rem; opacity: 0.6;">Periode</label>
                    <sol-dropdown placeholder="Altijd">
                        <div class="dropdown-item">Afgelopen uur</div>
                        <div class="dropdown-item">Afgelopen 24 uur</div>
                        <div class="dropdown-item">Afgelopen week</div>
                    </sol-dropdown>
                </div>
                <div class="filter-group" style="margin-top: 24px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 0.9rem;">Veilig zoeken</span>
                        <sol-switch checked></sol-switch>
                    </div>
                </div>
            </sol-card>
        </aside>

        <main class="search-results">
            <div class="results-stats" style="margin-bottom: 20px; font-size: 0.9rem; opacity: 0.6;">
                Ongeveer 1.240.000 resultaten voor <strong><?= $query ?></strong>
            </div>

            <div class="results-list" style="display: flex; flex-direction: column; gap: 20px;">
                <?php for($i=1; $i<=5; $i++): ?>
                <sol-card animated bg="white/30" class="result-card">
                    <div class="result-url" style="font-size: 0.8rem; opacity: 0.5; margin-bottom: 5px;">https://solora-ui.com/docs/<?= $i ?></div>
                    <h3 style="margin: 0 0 10px 0; color: var(--color-primary, #0071e3);"><?= $query ?> Voorbeeld Resultaat <?= $i ?></h3>
                    <p style="margin-bottom: 15px; line-height: 1.5; opacity: 0.8;">
                        Dit is hoe een zoekresultaat eruit ziet met de Solora UI Kit. 
                        Alles is gelaagd met glas-effecten en voelt super soepel aan.
                    </p>
                    <div style="display: flex; gap: 10px;">
                        <sol-button color="glass" size="sm">Bekijken</sol-button>
                        <sol-button color="glass" size="sm" rounded><sol-icon name="share-2" size="14"></sol-icon></sol-button>
                    </div>
                </sol-card>
                <?php endfor; ?>
            </div>
        </main>
    </div>

    <script type="module">
        import { initAll } from '../node_modules/@kerkhoff-ict/solora/dist/index.js';
        initAll();
    </script>
</body>
</html>
