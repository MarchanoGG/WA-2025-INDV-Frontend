// Welbekende stuk code dat wacht tot de DOM is ingeladen. in dit geval wachten we voordat we de boeken inladen.
document.addEventListener("DOMContentLoaded", function() {


    // Simpele functie dat de boeken zal 'renderen' binnen de collection__books div. 
    function renderBooks(books) { // <-- de 'books' parameter zal worden opgehaald vanuit de books.js
        const collectionBooks = document.getElementById("collection__books");

        if (collectionBooks === null) {
            return; // Als de collection__books div niet bestaat, dan annuleren we de rest, anders krijgen we een error.
                    // Ookal word deze file niet ingeladen bij de andere pagina's, dit is een nette manier voor preventie!
        }

        collectionBooks.innerHTML = ""; // Dubbelcheck of div leeg is.

        books.forEach(book => { // Vanzelfsprekend, loop door elk book heen.
            const bookDiv = document.createElement("div"); // Maak een div aan voor deze boek
            bookDiv.classList.add("collection-book"); // Voeg de class 'collection-book' toe aan de div
            
            // Voeg de HTML toe aan de div. Kan netter met bijvoorbeeld een component, maar dat bewaren we voor React.
            bookDiv.innerHTML = `
                <img src="img/covers/${book.image}" alt="${book.title}" class="collection-book__image">
                <div class="collection-book__content">
                    <h3 class="collection-book__title">${book.title}</h3>
                    <p class="collection-book__author"> <span>Auteur:</span> ${book.author}</p>
                    <p class="collection-book__rating"> <span>Cijfer:</span> ${book.rating}</p>
                </div>
            `;

            // Voeg de div toe aan de collection__books div.
            collectionBooks.appendChild(bookDiv);
        });
            
    }
    
    // Roep de renderBooks functie aan met de 'books' parameter vanuit de books.js file.
    // Eigenlijk kan dit netter door een anonymous functie te gebruiken, 
    // maar dit is duidelijker vind ik voor de eerste opdracht van het semester.
    renderBooks(books);



    // Wat complexere functie dat de paginering toepast.
    function applyPagination(amountOfBooksPerPage) {
        const collectionBooks = document.getElementById("collection__books");
        if (collectionBooks === null) { // Zie lijn 10 voor uitleg.
            return;
        }

        const pagination = document.getElementById("collection__paging");
        const allBooks = collectionBooks.querySelectorAll(".collection-book");
        const amountOfPages = Math.ceil(allBooks.length / amountOfBooksPerPage);
        let currentPage = 1; // 'let' want deze var zal veranderen.

        // Helperfunctie, zodat we deze kunnen aanroepen wanneer we willen. Wordt vaker gebruikt bij frameworks zoals Vue.
        function updateVisibility() {
            document.title = `Pagina ${currentPage} van Collectie - Scifi Book Collector`;
            allBooks.forEach((book, index) => {
                let pageNumber = Math.floor(index / amountOfBooksPerPage) + 1;
                if (pageNumber === currentPage) {
                    book.style.display = "block";
                } else {
                    book.style.display = "none";
                }
            });
        }

        pagination.innerHTML = ""; // Dubbelcheck of div leeg is.
        for (let i = 0; i < amountOfPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.classList.add("collection-paging");
            pageButton.textContent = i + 1; // Pagina begint bij 1 ipv 0, want dit is normale taal, en geen code.
    
            // Zet de eerste pagina standaard op actief
            if (i === 0) pageButton.classList.add("collection-paging__current");
            else pageButton.classList.add("collection-paging__inactive");
    
            pageButton.addEventListener("click", function () {
                currentPage = i + 1; // Zelfde logica als hierboven, pagina begint bij n + 1.
    
                // Update de knop met de active state
                document.querySelectorAll(".collection-paging").forEach(btn => {
                    btn.classList.remove("collection-paging__current");
                    btn.classList.add("collection-paging__inactive");
                });
                pageButton.classList.add("collection-paging__current");
    
                // Pas zichtbaarheid van boeken aan met de helperfunctie
                updateVisibility();
            });
    
            pagination.appendChild(pageButton);
        }
        updateVisibility(); // Toon alleen de eerste pagina bij de first load.
    }

    applyPagination(5);




    // Complexe functie om de sortering toe te passen.
    function applySorting() {
        const sortSelect = document.getElementById("collection__filters");
        if (sortSelect === null) { // Zie lijn 10 voor uitleg.
            return;
        }
        const attributeSelect = document.getElementById("attributes"); // Select voor sorteren op titel, auteur of cijfer.
        const directionSelect = document.getElementById("direction");   // Select voor sorteer richting (oplopend of aflopend).
        const amountInput = document.getElementById("amount");          // Input voor het aantal boeken per pagina.

        // Haal de waardes op.
        const attribute = attributeSelect.value;
        const direction = directionSelect.value;
        const amount = parseInt(amountInput.value);

        // Sorteer de boeken array op basis van het gekozen attribuut en de richting.
        books.sort((firstBook, secondBook) => {
            let result;
            
            // Bepaal het vergelijkingsresultaat afhankelijk van het gekozen attribuut
            if (attribute === "rating") {
                // Numerieke vergelijking voor 'rating'
                result = firstBook.rating - secondBook.rating;
            } else {
                // Alfabetische vergelijking voor 'title' en 'author'
                result = firstBook[attribute].localeCompare(secondBook[attribute]);
            }
            // Als de sorteer richting aflopend is, keren we het resultaat simpelweg om.
            return direction === "asc" ? result : -result;
        });

        // reload de boeken in de nieuwe sorteervolgorde.
        renderBooks(books);
        // Voor de paginering gedeelte
        applyPagination(amount);
    }

    const applyButton = document.getElementById("collection-filter__apply"); // De "Filter Toepassen" knop.
    applyButton.addEventListener("click", applySorting); // Voeg een event listener toe aan de knop.
    // Kan opzicht ook via een onclick attribuut in de HTML, maar ik vind dit veel leesbaarder.
});