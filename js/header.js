// Welbekende stuk code dat wacht tot de DOM is ingeladen.
document.addEventListener("DOMContentLoaded", function() {

    // Simpele functie dat eerst de HTML elementen ophaalt, in 'const' stopt want deze vars veranderen niet meer.
    // Vervolgens gaat het met een eventlistener inhaken op de click event van de hamburger button.
    // Als er op de hamburger button geklikt wordt, dan toggled het de 'active' class. In de CSS is dit utitgewerkt met display none en display flex.
    const toggleButton = document.querySelector(".header__toggle");
    const menu = document.querySelector(".header__menu");

    toggleButton.addEventListener("click", function () {
        menu.classList.toggle("active");
    });
});