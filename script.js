//Script para animación fade hacia arriba

document.addEventListener('DOMContentLoaded', function () {
    let cards = document.querySelectorAll('.fade-up');

    let options = {
        root: null, // Use the viewport as the root
        rootMargin: '0px', // No margin around the root
        threshold: 0.3 // Trigger animation when 50% of the element is in the viewport
    };

    let observer = new IntersectionObserver(handleIntersection, options);

    function handleIntersection(entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }

    // Observa cada tarjeta
    cards.forEach(function (card) {
        observer.observe(card);
    });
});

//Script para animación fade hacia la izquierda

document.addEventListener('DOMContentLoaded', function() {
    let cards = document.querySelectorAll('.fade-right');

    let options = {
        root: null, // Use the viewport as the root
        rootMargin: '0px', // No margin around the root
        threshold: 0.3 // Trigger animation when 50% of the element is in the viewport
    };

    let observer = new IntersectionObserver(handleIntersection, {threshold: 0.5});

    function handleIntersection(entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }

    cards.forEach(function (card) {
        observer.observe(card);
    });
})