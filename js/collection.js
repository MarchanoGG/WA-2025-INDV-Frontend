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
        const amountOfPages = Math.ceil(allBooks.length / amountOfBooksPerPage); // Deel het aantal boeken door de hoeveelheid boeken per pagina en rond af naar boven.

        pagination.innerHTML = ""; // Dubbelcheck of div leeg is.
        
        // Render de paginering
        // <button class="collection-paging collection-paging__current">1</button>
        // <button class="collection-paging collection-paging__inactive">2</button>
        // <button class="collection-paging collection-paging__inactive">3</button>

        for (let i = 0; i < amountOfPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.classList.add("collection-paging");
            pageButton.textContent = i + 1; // +1 omdat we willen dat de paginering begint bij 1 en niet bij 0.

            if (i === 0) { // Als de huidige pagina 0 is, dan voeg de class 'collection-paging__current' toe.
                pageButton.classList.add("collection-paging__current");
            } else { // Anders voeg de class 'collection-paging__inactive' toe.
                pageButton.classList.add("collection-paging__inactive");
            }
            pagination.appendChild(pageButton); // Voeg de button toe aan de div.
        }
    }

    applyPagination(5);
});