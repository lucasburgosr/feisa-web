document.addEventListener('DOMContentLoaded', function () {
    let cardsUp = document.querySelectorAll('.fade-up');
    let cardsRight = document.querySelectorAll('.fade-right');

    console.log(cardsUp.length); // Asegura que haya tarjetas para fade-up
    console.log(cardsRight.length); // Asegura que haya tarjetas para fade-right

    let options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
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

    // Observa tarjetas para fade-up
    cardsUp.forEach(function (card) {
        observer.observe(card);
    });

    // Observa tarjetas para fade-right
    cardsRight.forEach(function (card) {
        observer.observe(card);
    });
});
