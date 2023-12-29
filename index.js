document.addEventListener('DOMContentLoaded', function () {
    var cards = document.querySelectorAll('.fadeUp');

    function isElementInViewport(el, threshold) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.bottom - threshold <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }

    function handleScroll() {
        cards.forEach(function (card) {
            if (isElementInViewport(card, 250)) { // Ajusta el valor de threshold según tus necesidades
                card.classList.add('show');
            }
        });
    }

    // Agrega un listener al evento scroll
    window.addEventListener('scroll', handleScroll);

    // Llama a handleScroll() una vez al cargar la página para verificar si las tarjetas ya están en el viewport
    handleScroll();
});