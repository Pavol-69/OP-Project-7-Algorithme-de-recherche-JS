import { displayRecipes } from "../functions/displayRecipes.js";

export function search(recipes, myInput) {
  const rctCtn = document.getElementById("rct_ctn");

  // la recherche ne lance que si on a 3 caractères ou plus
  if (myInput.length >= 3) {
    // On efface tout
    rctCtn.innerHTML = "";

    let result = [];

    // Parcours de toute les recettes
    for (let i = 0; i < recipes.length; i++) {
      // Dès que ça match, on peut passer à i++, pas besoin d'aller plus loin
      let match = false;

      //Vérif dans le titre et description
      if (
        recipes[i].name.toLowerCase().includes(myInput.toLowerCase()) ||
        recipes[i].description.toLowerCase().includes(myInput.toLowerCase())
      ) {
        result.push(recipes[i]);
        match = true;
      }

      if (match) {
        continue;
      }

      // Vérif dans les ingrédient
      for (let j = 0; j < recipes[i].ingredients.length; j++) {
        if (
          recipes[i].ingredients[j].ingredient
            .toLowerCase()
            .includes(myInput.toLowerCase())
        ) {
          result.push(recipes[i]);
          break;
        }
      }
    }

    // Affichage des éléments présents dans result
    displayRecipes(result);

    if (result.length == 0) {
      // Si aucun résultat, on met le message d'erreur
      const message = document.createElement("span");
      message.className = "no_result";
      message.textContent = "Aucune correspance trouvée..";
      rctCtn.appendChild(message);
    }
  } else {
    // On efface tout et on réécrit => obligé de faire ça à chaque changement, dans le cas où on passe de 3 à 2 caractères
    rctCtn.innerHTML = "";
    displayRecipes(recipes);
  }
}
