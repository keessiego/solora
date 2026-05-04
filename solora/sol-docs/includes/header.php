<?php
$current_page = basename($_SERVER['PHP_SELF'], '.php');
if ($current_page === 'index') $current_page = 'get-started';
?>
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solora UI - <?= ucfirst($current_page) ?></title>
    
    <link rel="stylesheet" href="/dist/index.css">
    <link rel="stylesheet" href="/assets/css/docs.css">
</head>
<body>

    <button class="sol-theme-toggle" aria-label="Toggle theme">🌙</button>
    <sol-contextmenu></sol-contextmenu>

    <aside class="sidebar">
        <h1>
            <sol-icon name="layers" size="28" color="var(--primary)"></sol-icon>
            Solora
        </h1>
        <nav>
            <ul>
                <li><a href="/index.php" class="<?= $current_page == 'get-started' ? 'active' : '' ?>">Get Started</a></li>
                <li><a href="/pages/button.php" class="<?= $current_page == 'button' ? 'active' : '' ?>">Buttons</a></li>
                <li><a href="/pages/navbar.php" class="<?= $current_page == 'navbar' ? 'active' : '' ?>">Navbar</a></li>
                <li><a href="/pages/card.php" class="<?= $current_page == 'card' ? 'active' : '' ?>">Cards</a></li>
                <li><a href="/pages/input.php" class="<?= $current_page == 'input' ? 'active' : '' ?>">Inputs</a></li>
                <li><a href="/pages/checkbox.php" class="<?= $current_page == 'checkbox' ? 'active' : '' ?>">Checkboxes</a></li>
                <li><a href="/pages/dropdown.php" class="<?= $current_page == 'dropdown' ? 'active' : '' ?>">Dropdowns</a></li>
                <li><a href="/pages/popover.php" class="<?= $current_page == 'popover' ? 'active' : '' ?>">Popover</a></li>
                <li><a href="/pages/switch.php" class="<?= $current_page == 'switch' ? 'active' : '' ?>">Switches</a></li>
                <li><a href="/pages/codeblock.php" class="<?= $current_page == 'codeblock' ? 'active' : '' ?>">Codeblocks</a></li>
                <li><a href="/pages/icon.php" class="<?= $current_page == 'icon' ? 'active' : '' ?>">Icons</a></li>
                <li><a href="/pages/contextmenu.php" class="<?= $current_page == 'contextmenu' ? 'active' : '' ?>">Context Menu</a></li>
                <li><a href="/pages/alert.php" class="<?= $current_page == 'alert' ? 'active' : '' ?>">Popups (Alert)</a></li>
            </ul>
        </nav>
    </aside>

    <main class="main-content">
