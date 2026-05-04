        <footer>
            &copy; 2026 Solora UI Kit. Met passie gemaakt voor ontwikkelaars.
        </footer>
    </main>

    <!-- Modal for Lucide Preview -->
    <div id="lucide-modal" class="apple-modal">
        <div class="apple-modal-backdrop"></div>
        <div class="apple-modal-content">
            <div class="apple-modal-header">
                <span class="apple-modal-title">Lucide Icons</span>
                <button id="close-lucide-modal" class="apple-modal-close">
                    <sol-icon name="x" size="20"></sol-icon>
                </button>
            </div>
            <iframe id="lucide-iframe" src="" frameborder="0"></iframe>
        </div>
    </div>

    <!-- Component Logic -->
    <script type="module">
        import { initAll } from '/dist/index.js';
        initAll();
    </script>

    <!-- Doc Logic -->
    <script src="/assets/js/docs.js"></script>
</body>
</html>
