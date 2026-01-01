// Navigation Scroll Effect
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    const logo = document.getElementById('nav-logo');
    const cta = document.getElementById('nav-cta');

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

            // CTA: Switch to dark text
            if (cta) {
                cta.classList.remove('text-white');
                cta.classList.add('text-slate-900');
            }

        } else {
            // Top state: Transparent background, white text, no shadow
            nav.classList.add('bg-transparent', 'text-white');
            nav.classList.remove('bg-white', 'text-slate-900', 'shadow-md');

            // Swap to White Logo
            if (logo && logo.src.indexOf('secm-logo-white.svg') === -1) {
                logo.src = logoWhite;
            }

            // CTA: Switch to white text
            if (cta) {
                cta.classList.remove('text-slate-900');
                cta.classList.add('text-white');
            }
        }
    };

    // Initial check
    handleScroll();

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);
});
