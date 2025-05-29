// Initialize AOS
AOS.init({
    duration: 1000, // global duration for animations
    once: true,    // animations happen only once
    offset: 50,    // offset (in px) from the original trigger point
    delay: 0,      // values from 0 to 3000, with step 50ms
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const closeBtn = document.getElementById('closeNavBtn');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    const desktopNavLinks = document.querySelectorAll('.desktop-nav a');

    // --- Mobile Navigation Logic ---

    // Open mobile nav
    if (hamburgerBtn && mobileNavOverlay) {
        hamburgerBtn.addEventListener('click', () => {
            mobileNavOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when nav is open
            // Add a focus trap for accessibility (optional but good practice)
            mobileNavOverlay.focus();
        });
    }

    // Close mobile nav
    const closeMobileNav = () => {
        if (mobileNavOverlay) {
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
            // Return focus to the hamburger button for accessibility
            if (hamburgerBtn) {
                hamburgerBtn.focus();
            }
        }
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', closeMobileNav);
    }

    // Close mobile nav when a link is clicked
    if (mobileNavLinks) {
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMobileNav);
        });
    }

    // Close mobile nav if clicked outside the content
    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', (event) => {
            // Check if the click occurred directly on the overlay, not its children
            if (event.target === mobileNavOverlay) {
                closeMobileNav();
            }
        });
    }

    // Close mobile nav with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && mobileNavOverlay && mobileNavOverlay.classList.contains('active')) {
            closeMobileNav();
        }
    });

    // --- Active Link Highlighting ---

    const highlightActiveLink = (links) => {
        const currentPath = window.location.pathname.split('/').pop();
        links.forEach(link => {
            // Check if href matches current page or if it's index.html for root path
            if (link.getAttribute('href') === currentPath || (currentPath === '' && link.getAttribute('href') === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    // Highlight active link in desktop nav
    if (desktopNavLinks.length > 0) {
        highlightActiveLink(desktopNavLinks);
    }

    // Highlight active link in mobile nav
    if (mobileNavLinks.length > 0) {
        highlightActiveLink(mobileNavLinks);
    }

    // --- Dynamic Progress Bar Widths (for About Me section) ---
    // This assumes you want to set the width dynamically on load,
    // and AOS will handle the fade-in effect.
    const skillBars = document.querySelectorAll('.progress-bar');
    skillBars.forEach(bar => {
        const skillItem = bar.closest('.skill-item');
        if (skillItem) {
            // Extract the percentage from the HTML (e.g., from a data-percent attribute)
            // For now, let's assume the width is directly in style, or you add a data-attribute.
            // Example: <div class="progress-bar" data-percent="96"></div>
            const percentText = bar.previousElementSibling.textContent; // Gets '96%'
            const percent = parseInt(percentText, 10);
            if (!isNaN(percent)) {
                bar.style.setProperty('--aos-width', `${percent}%`);
            }
        }
    });
});