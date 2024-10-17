document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("autocomplete-input");
    const autocompleteList = document.getElementById("autocomplete-list");

    inputField.addEventListener("input", function () {
        const query = this.value;

        if (!query) {
            // Effacer la liste si le champ est vide
            autocompleteList.innerHTML = "";
            return;
        }

        // Appel à l'API en POST avec la valeur du champ
        fetch("http://localhost:3000/document", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: query }),
        })
            .then(response => response.json())
            .then(data => {
                // Effacer les suggestions précédentes
                autocompleteList.innerHTML = "";

                if (data && data.length > 0) {
                    // Parcourir les résultats et les ajouter à la liste
                    data.forEach(item => {
                        const itemDiv = document.createElement("div");
                        itemDiv.innerText = item.name; // Assurez-vous que "name" correspond à vos données

                        // Ajout d'un événement pour compléter le champ lorsque l'utilisateur clique sur un élément
                        itemDiv.addEventListener("click", function () {
                            inputField.value = item.name;
                            autocompleteList.innerHTML = ""; // Vider la liste après sélection
                        });

                        autocompleteList.appendChild(itemDiv);
                    });
                }
            })
            .catch(error => console.error("Erreur lors de la récupération des données :", error));
    });
});