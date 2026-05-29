// Aguarda o DOM (HTML) carregar completamente antes de executar o script
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. EFEITO DE SCROLL NO HEADER (OPCIONAL)
    // Se você tiver uma tag <header> ou <nav>, adiciona a classe 'active' ao rolar a página
    const header = document.querySelector("header");
    
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                header.classList.add("header-scrolled");
            } else {
                header.classList.remove("header-scrolled");
            }
        });
    }

    // 2. ANIMAÇÃO AO ROLAR A PÁGINA (Para os títulos das seções)
    // Usa a API IntersectionObserver para detectar quando os títulos aparecem na tela
    const sectionTitles = document.querySelectorAll(".section-title");

    // Configura o estilo inicial de transição via JS para não quebrar o layout se o JS falhar
    sectionTitles.forEach(title => {
        title.style.opacity = "0";
        title.style.transform = "translateY(20px)";
        title.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    });

    const observerOptions = {
        root: null, // usa a viewport como referência
        threshold: 0.15 // dispara quando 15% do elemento estiver visível
    };

    const appearanceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const title = entry.target;
                title.style.opacity = "1";
                title.style.transform = "translateY(0)";
                observer.unobserve(title); // Para de observar após animar uma vez
            }
        });
    }, observerOptions);

    sectionTitles.forEach(title => {
        appearanceObserver.observe(title);
    });

});
