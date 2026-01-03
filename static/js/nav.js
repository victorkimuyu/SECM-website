// Navigation Scroll Effect
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    const logo = document.getElementById('nav-logo');
    const cta = document.getElementById('nav-cta');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');

    // Logo Paths
    const logoWhite = './static/images/secm-logo-white.svg';
    const logoColor = './static/images/secm-logo-color.svg';

    // Helper: Close mobile menu
    const closeMobileMenu = () => {
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            menuIconOpen.classList.remove('hidden');
            menuIconClose.classList.add('hidden');
        }
    };

    const handleScroll = () => {
        // Close mobile menu on scroll
        closeMobileMenu();

        const isTransparentMode = nav.dataset.navTransparent === 'true';

        if (window.scrollY > 50 || !isTransparentMode) {
            // Scrolled state or Solid mode: White background, dark text, shadow
            nav.classList.remove('text-white');
            if (isTransparentMode) {
                nav.classList.remove('bg-transparent');
            }
            nav.classList.add('bg-white', 'text-slate-900', 'shadow-md');

            // CTA: Switch to dark text
            if (cta) {
                cta.classList.remove('text-white');
                cta.classList.add('text-slate-900');
            }

            // Mobile Menu Button: Switch to dark text
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.remove('text-white');
                mobileMenuBtn.classList.add('text-slate-900');
            }

            // Swap to Color Logo
            if (logo && logo.src.indexOf('secm-logo-color.svg') === -1) {
                logo.src = logoColor;
            }

        } else {
            // Top state in Transparent mode: Transparent background, white text, no shadow
            nav.classList.add('bg-transparent', 'text-white');
            nav.classList.remove('bg-white', 'text-slate-900', 'shadow-md');

            // CTA: Switch to white text
            if (cta) {
                cta.classList.remove('text-slate-900');
                cta.classList.add('text-white');
            }

            // Mobile Menu Button: Switch to white text
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.remove('text-slate-900');
                mobileMenuBtn.classList.add('text-white');
            }

            // Swap to White Logo
            if (logo && logo.src.indexOf('secm-logo-white.svg') === -1) {
                logo.src = logoWhite;
            }
        }
    };

    // Mobile Menu Toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent immediate close from document click
            const isOpen = !mobileMenu.classList.contains('hidden');

            if (isOpen) {
                closeMobileMenu();
            } else {
                // Open menu
                mobileMenu.classList.remove('hidden');
                menuIconOpen.classList.add('hidden');
                menuIconClose.classList.remove('hidden');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Close menu when touching outside (for mobile)
        document.addEventListener('touchstart', (e) => {
            if (!nav.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }

    // Initial check
    handleScroll();

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);
});
