document.addEventListener('DOMContentLoaded', function () {
    var cards = document.querySelectorAll('.fadeUp');

    var options = {
        root: null, // Use the viewport as the root
        rootMargin: '0px', // No margin around the root
        threshold: 0.3 // Trigger animation when 50% of the element is in the viewport
    };

    var observer = new IntersectionObserver(handleIntersection, options);

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