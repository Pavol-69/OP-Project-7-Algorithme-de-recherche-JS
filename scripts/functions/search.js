import { displayRecipes } from "../functions/displayRecipes.js";
import { recipes } from "../database/recipes.js";

function search(myInput) {
  // la recherche ne lance que si on a 3 caractères ou plus
  if (myInput.length >= 3) {
    // Variable pour enregistrer résultats
    let result = [];

    // Parcours de toute les recettes
    recipes.forEach((rct) => {
      // Vérif dans les ingrédient
      const resultIng = rct.ingredients.filter((ing) =>
        ing.ingredient.toLowerCase().includes(myInput.toLowerCase())
      );
      //Vérif dans le titre, la description, les ingrédients
      if (
        rct.name.toLowerCase().includes(myInput.toLowerCase()) ||
        rct.description.toLowerCase().includes(myInput.toLowerCase()) ||
        resultIng.length > 0
      ) {
        result.push(rct);
      }
    });

    return result;
  } else {
    // Si < 3 caractères, on affiche tout
    return recipes;
  }
}

export function displaySearch(myInput) {
  const rctCtn = document.getElementById("rct_ctn");
  const result = search(myInput);

  if (result.length == 0) {
    // Si aucun résultat, on met le message d'erreur
    const message = document.createElement("span");
    message.className = "no_result";
    message.textContent = "Aucune correspance trouvée..";
    rctCtn.appendChild(message);
  } else {
    // On efface tout et on réécrit => obligé de faire ça à chaque changement, dans le cas où on passe de 3 à 2 caractères
    rctCtn.innerHTML = "";
    displayRecipes(result);
  }
}
