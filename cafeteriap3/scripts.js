ocument.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const id = this.getAttribute('href');
        const section = document.querySelector(id);

        window.scrollTo({
            top: section.offsetTop - 50, // margem opcional
            behavior: 'smooth'
        });
    });
});