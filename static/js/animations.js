/**
 * Scroll Reveal Animations
 * Handles both staggered entry for hero and intersection-based 
 * scroll reveals for sections.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Hero Reveal (triggered on load)
    const initHeroReveal = () => {
        const heroElements = [
            { id: '#hero-title', delay: 200 },
            { id: '#hero-subtitle', delay: 400 },
            { id: '#service-card-1', delay: 600 },
            { id: '#service-card-2', delay: 750 },
            { id: '#service-card-3', delay: 900 },
            { id: '#all-services-btn', delay: 1050 }
        ];

        heroElements.forEach(({ id, delay }) => {
            const el = document.querySelector(id);
            if (el) {
                setTimeout(() => {
                    el.classList.remove('opacity-0', 'translate-y-8');
                    el.classList.add('opacity-100', 'translate-y-0');
                }, delay);
            }
        });
    };

    // 2. Scroll Reveal (Intersection Observer)
    const initScrollReveal = () => {
        const revealOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;

                    // If it's a container, reveal children with stagger
                    if (target.classList.contains('reveal-container')) {
                        const items = target.querySelectorAll('.reveal-on-scroll');
                        items.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.remove('opacity-0', 'translate-y-8');
                                item.classList.add('opacity-100', 'translate-y-0');
                            }, index * 150);
                        });
                    } else {
                        // Direct reveal
                        target.classList.remove('opacity-0', 'translate-y-8');
                        target.classList.add('opacity-100', 'translate-y-0');
                    }

                    // Stop observing once revealed
                    observer.unobserve(target);
                }
            });
        }, revealOptions);

        // Track containers for staggered reveal
        document.querySelectorAll('.reveal-container').forEach(el => {
            observer.observe(el);
        });

        // Track standalone items (those NOT inside a reveal-container)
        document.querySelectorAll('.reveal-on-scroll').forEach(el => {
            if (!el.closest('.reveal-container')) {
                observer.observe(el);
            }
        });
    };

    // 3. Counter Animation
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-counter');
        const duration = 2000; // 2 seconds for animation

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseFloat(counter.getAttribute('data-target'));
                    const start = parseFloat(counter.getAttribute('data-start') || 0);
                    const suffix = counter.getAttribute('data-suffix') || '';
                    let startTime = null;

                    const step = (timestamp) => {
                        if (!startTime) startTime = timestamp;
                        const progress = Math.min((timestamp - startTime) / duration, 1);
                        const current = progress * (target - start) + start;

                        // Handle decimals for specific cases (like 0.1 to 1B)
                        counter.innerText = (target % 1 === 0 && start % 1 === 0)
                            ? Math.floor(current) + suffix
                            : current.toFixed(1) + suffix;

                        if (progress < 1) {
                            window.requestAnimationFrame(step);
                        } else {
                            counter.innerText = target + suffix;
                        }
                    };

                    window.requestAnimationFrame(step);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    };

    // Run inits
    initHeroReveal();
    initScrollReveal();
    animateCounters();
});
