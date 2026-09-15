document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (!menuToggle || !navMenu) {
        return;
    }


    // ================= MOBILE MENU =================

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("show");

        const isOpen = navMenu.classList.contains("show");

        menuToggle.textContent = isOpen ? "✕" : "☰";
        menuToggle.setAttribute("aria-expanded", isOpen);

    });


    // ================= CLOSE MENU =================

    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("show");

            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");

        });

    });


    // ================= ESCAPE KEY =================

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            navMenu.classList.remove("show");

            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");

        }

    });

});