// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// Navigation Bar JavaScript - script.js

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Get DOM elements
    const menuBtn = document.getElementById('menuBtn');
    const closeBtn = document.getElementById('closeBtn');
    const slideMenu = document.getElementById('slideMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    // Check if all elements exist
    if (!menuBtn || !closeBtn || !slideMenu || !menuOverlay) {
        console.error('Navigation elements not found');
        return;
    }

    // Open menu function
    function openMenu() {
        slideMenu.classList.add('active');
        menuOverlay.classList.add('active');
        // Prevent body scroll when menu is open
        document.body.style.overflow = 'hidden';
    }

    // Close menu function
    function closeMenu() {
        slideMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        // Restore body scroll
        document.body.style.overflow = '';
    }

    // Event listeners
    menuBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', closeMenu);

    // Close menu on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });

    // Close menu when clicking on menu links (optional)
    const menuLinks = slideMenu.querySelectorAll('.menu-items a');
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Handle menu button animation on click
    menuBtn.addEventListener('click', function () {
        this.classList.add('clicked');
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 200);
    });
});

// Optional: Add smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function () {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just a hash
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});