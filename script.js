/* =========================================================
   SANA MEHBOOB — PORTFOLIO CORE SCRIPT (script.js)
   Features: Robust Mobile Navigation, Scroll Lock, 
   Click Outside Dismiss, & Desktop Drag-to-Scroll for Galleries
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    // ================= MOBILE NAVIGATION =================
    if (menuToggle && navMenu) {

        const toggleMenu = (open) => {
            const shouldOpen = open !== undefined ? open : !navMenu.classList.contains("show");
            
            navMenu.classList.toggle("show", shouldOpen);
            menuToggle.textContent = shouldOpen ? "✕" : "☰";
            menuToggle.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
            
            // Prevent background page scrolling when mobile menu is open
            if (window.innerWidth <= 768) {
                document.body.style.overflow = shouldOpen ? "hidden" : "";
            }
        };

        // Menu button toggle
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Close when clicking any nav link
        const navLinks = navMenu.querySelectorAll("a");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                toggleMenu(false);
            });
        });

        // Close when clicking anywhere outside the menu
        document.addEventListener("click", (event) => {
            if (navMenu.classList.contains("show")) {
                if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                    toggleMenu(false);
                }
            }
        });

        // Close on ESC key press
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && navMenu.classList.contains("show")) {
                toggleMenu(false);
            }
        });

        // Reset menu state if user resizes window to desktop view
        window.addEventListener("resize", () => {
            if (window.innerWidth > 768 && navMenu.classList.contains("show")) {
                toggleMenu(false);
            }
        });
    }


    // ================= DESKTOP MOUSE DRAG TO SCROLL (GALLERIES) =================
    // Laptop / Desktop par mouse se screenshots ko aasaani se aage peeche scroll karne ke liye
    const sliders = document.querySelectorAll('.gallery-track, .small-gallery-track, .preview-strip');

    sliders.forEach(slider => {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.style.cursor = 'grabbing';
            slider.style.scrollBehavior = 'auto'; // smooth snap off while dragging
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.style.cursor = 'grab';
            slider.style.scrollBehavior = 'smooth';
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 1.6; // Scroll speed factor
            slider.scrollLeft = scrollLeft - walk;
        });
    });

});