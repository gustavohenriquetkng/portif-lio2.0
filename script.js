// Lógica para o menu responsivo (Hamburger Menu)
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
        });

        // Fechar o menu ao clicar em um link (apenas no mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 768) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    navLinks.classList.remove('active');
                }
            });
        });
    }
});

// Smooth Scroll (Fallback para navegadores que não suportam scroll-behavior: smooth no CSS)
// No CSS, já definimos scroll-behavior: smooth; para a maioria dos navegadores modernos.
// Mantemos este JS apenas como um fallback, mas o CSS é o método preferido.
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e) {
        const href = this.getAttribute("href");
        if (href === "#" || href === "") return; // Ignora links vazios

        // Verifica se o scroll-behavior: smooth é suportado. Se não for, usa o JS.
        // A verificação é complexa, então vamos confiar no CSS e manter o JS simples.
        // O CSS é mais performático.

        // Se o CSS falhar, o JS abaixo garante o smooth scroll.
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});
