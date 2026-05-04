document.addEventListener('DOMContentLoaded', () => {
    // 1. Sidebar Navigation - Active State (Simple version for separate pages)
    const navLinks = document.querySelectorAll('.sidebar nav a');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath.endsWith(href) || (currentPath.endsWith('/') && href === '/index.php')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 2. Apple Modal for Lucide Icons
    const lucideLink = document.getElementById('open-lucide');
    const modal = document.getElementById('lucide-modal');
    if (lucideLink && modal) {
        const closeBtn = document.getElementById('close-lucide-modal');
        const iframe = document.getElementById('lucide-iframe');
        const backdrop = modal.querySelector('.apple-modal-backdrop');

        const openModal = (e) => {
            e.preventDefault();
            if (!iframe.src || iframe.src === window.location.href) {
                iframe.src = "https://lucide.dev/icons";
            }
            modal.classList.add('open');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        };

        const closeModal = () => {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        };

        lucideLink.addEventListener('click', openModal);
        closeBtn.addEventListener('click', closeModal);
        backdrop.addEventListener('click', closeModal);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('open')) {
                closeModal();
            }
        });
    }
});
