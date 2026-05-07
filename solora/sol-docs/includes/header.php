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
    
    <link rel="stylesheet" href="/dist/index.css?v=<?= time() ?>">
    <link rel="stylesheet" href="/assets/css/docs.css?v=<?= time() ?>">
    <link rel="stylesheet" href="/assets/css/playground.css?v=<?= time() ?>">
</head>
<body>

    <sol-contextmenu></sol-contextmenu>

    <sol-page>
        <sol-sidebar sticky compact>
            <div class="sol-sidebar-header">
                <h1 class="sol-ignore" style="font-size: 20px; display: flex; align-items: center; gap: 8px; margin: 0;">
                    <sol-icon name="layers" size="24" color="var(--color-primary)"></sol-icon>
                    Solora
                </h1>
            </div>
            <div class="sol-sidebar-content">
                <div class="sol-sidebar-label">Snelstart</div>
                <nav class="sol-sidebar-nav">
                    <a href="/index.php" class="sol-sidebar-item">
                        <sol-icon name="zap" size="16"></sol-icon> Get Started
                    </a>
                </nav>

                <div class="sol-sidebar-label">Componenten</div>
                <nav class="sol-sidebar-nav">
                    <a href="/pages/button.php" class="sol-sidebar-item">
                        <sol-icon name="square" size="16"></sol-icon> Buttons
                    </a>
                    <a href="/pages/navbar.php" class="sol-sidebar-item">
                        <sol-icon name="more-horizontal" size="16"></sol-icon> Navbar
                    </a>
                    <a href="/pages/sidebar.php" class="sol-sidebar-item">
                        <sol-icon name="columns" size="16"></sol-icon> Sidebar
                    </a>
                    <a href="/pages/card.php" class="sol-sidebar-item">
                        <sol-icon name="layout" size="16"></sol-icon> Cards
                    </a>
                    <a href="/pages/input.php" class="sol-sidebar-item">
                        <sol-icon name="type" size="16"></sol-icon> Inputs
                    </a>
                    <a href="/pages/textarea.php" class="sol-sidebar-item">
                        <sol-icon name="file-text" size="16"></sol-icon> Textareas
                    </a>
                    <a href="/pages/checkbox.php" class="sol-sidebar-item">
                        <sol-icon name="check-square" size="16"></sol-icon> Checkboxes
                    </a>
                    <a href="/pages/dropdown.php" class="sol-sidebar-item">
                        <sol-icon name="chevron-down" size="16"></sol-icon> Dropdowns
                    </a>
                    <a href="/pages/popover.php" class="sol-sidebar-item">
                        <sol-icon name="message-square" size="16"></sol-icon> Popover
                    </a>
                    <a href="/pages/switch.php" class="sol-sidebar-item">
                        <sol-icon name="toggle-right" size="16"></sol-icon> Switches
                    </a>
                    <a href="/pages/codeblock.php" class="sol-sidebar-item">
                        <sol-icon name="code" size="16"></sol-icon> Codeblocks
                    </a>
                    <a href="/pages/table.php" class="sol-sidebar-item">
                        <sol-icon name="grid" size="16"></sol-icon> Tables
                    </a>
                    <a href="/pages/window.php" class="sol-sidebar-item">
                        <sol-icon name="maximize" size="16"></sol-icon> Window
                    </a>
                    <a href="/pages/modal.php" class="sol-sidebar-item">
                        <sol-icon name="copy" size="16"></sol-icon> Modals
                    </a>
                    <a href="/pages/icon.php" class="sol-sidebar-item">
                        <sol-icon name="image" size="16"></sol-icon> Icons
                    </a>
                    <a href="/pages/contextmenu.php" class="sol-sidebar-item">
                        <sol-icon name="mouse-pointer" size="16"></sol-icon> Context Menu
                    </a>
                </nav>

                <div class="sol-sidebar-label">Feedback</div>
                <nav class="sol-sidebar-nav">
                    <a href="/pages/alert.php" class="sol-sidebar-item">
                        <sol-icon name="alert-circle" size="16"></sol-icon> Popups (Alert)
                    </a>
                    <a href="/pages/notification.php" class="sol-sidebar-item">
                        <sol-icon name="bell" size="16"></sol-icon> Notifications
                    </a>
                </nav>

                <div class="sol-sidebar-label">Resources</div>
                <nav class="sol-sidebar-nav">
                    <a href="/pages/ai.php" class="sol-sidebar-item">
                        <sol-icon name="cpu" size="16"></sol-icon> AI Prompt
                    </a>
                </nav>
            </div>
            <div class="sol-sidebar-footer">
                <a id="open-settings" class="sol-sidebar-item">
                    <sol-icon name="settings" size="16"></sol-icon> Settings
                </a>
            </div>
        </sol-sidebar>

        <sol-main class="main-content">
            <script src="/assets/js/playground.js?v=<?= time() ?>" defer></script>
