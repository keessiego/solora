</main>
    </div>

    <script type="module">
        import { initDropdowns, initCodeblocks } from '<?php echo $basePath; ?>node_modules/@kerkhoff-ict/solora/dist/index.js';
        
        document.addEventListener('DOMContentLoaded', () => {
            initDropdowns();
            initCodeblocks();

            // Theme Toggle Logic
            const toggleBtn = document.getElementById('theme-toggle');
            toggleBtn.addEventListener('click', () => {
                if (document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark');
                    localStorage.theme = 'light';
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.theme = 'dark';
                }
            });
        });
    </script>
</body>
</html>