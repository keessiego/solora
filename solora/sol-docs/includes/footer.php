        <footer>
            &copy; 2026 Solora UI Kit. Met passie gemaakt voor ontwikkelaars.
        </footer>
    </sol-main>
    </sol-page>

    <sol-modal id="settings-modal">
        <h3 style="margin-bottom: 5px;">Instellingen</h3>
        <p style="margin-bottom: 20px; opacity: 0.7;">Pas het uiterlijk van Solora aan.</p>
        
        <div style="text-align: left; padding: 0 5px;">
            <div style="margin-bottom: 15px;">
                <label style="display: block; font-size: 10px; font-weight: 700; opacity: 0.5; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">THEMA</label>
                <sol-dropdown id="setting-theme" placeholder="Selecteer thema">
                    <div class="dropdown-item" data-value="light">Licht</div>
                    <div class="dropdown-item" data-value="dark">Donker</div>
                </sol-dropdown>
            </div>

            <div style="margin-bottom: 10px;">
                <label style="display: block; font-size: 10px; font-weight: 700; opacity: 0.5; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">STIJL</label>
                <sol-dropdown id="setting-variant" placeholder="Selecteer stijl">
                    <div class="dropdown-item" data-value="default">Standaard (Compact)</div>
                    <div class="dropdown-item" data-value="glass">Glass (Liquid)</div>
                </sol-dropdown>
            </div>
        </div>

        <sol-modal-button close-modal bold>Klaar</sol-modal-button>
    </sol-modal>

    <!-- Modal for Lucide Preview -->
    <sol-modal id="lucide-modal" size="xl">
        <h3 style="margin-bottom: 5px;">Lucide Icons</h3>
        <p style="margin-bottom: 20px; opacity: 0.7;">Blader door de iconen van Lucide.</p>
        <iframe id="lucide-iframe" src="" frameborder="0" style="width: 100%; height: 60vh; border-radius: 12px; background: #fff;"></iframe>
        <sol-modal-button close-modal bold>Sluiten</sol-modal-button>
    </sol-modal>

    <!-- Component Logic -->
    <script type="module">
        import { initAll } from '/dist/index.js?v=<?= time() ?>';
        initAll();
    </script>

    <!-- Doc Logic -->
    <script src="/assets/js/docs.js?v=<?= time() ?>"></script>
</body>
</html>
