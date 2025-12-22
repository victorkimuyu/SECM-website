// Navigation Scroll Effect
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    const logo = document.getElementById('nav-logo');

    // Logo Paths
    const logoWhite = './static/images/secm-logo-white.svg';
    const logoColor = './static/images/secm-logo-color.svg';

    const handleScroll = () => {
        if (window.scrollY > 50) {
            // Scrolled state: White background, dark text, shadow
            nav.classList.remove('bg-white/10', 'text-white');
            nav.classList.add('bg-white', 'text-slate-900', 'shadow-md');

            // Swap to Color Logo
            if (logo && logo.src.indexOf('secm-logo-color.svg') === -1) {
                logo.src = logoColor;
            }

        } else {
            // Top state: Transparent background, white text, no shadow
            nav.classList.add('bg-transparent', 'text-white');
            nav.classList.remove('bg-white', 'text-slate-900', 'shadow-md');

            // Swap to White Logo
            if (logo && logo.src.indexOf('secm-logo-white.svg') === -1) {
                logo.src = logoWhite;
            }
        }
    };

    // Initial check
    handleScroll();

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);
});
