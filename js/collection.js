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
                    <p class="collection-book__author">${book.author}</p>
                    <p class="collection-book__rating">${book.rating}</p>
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

});