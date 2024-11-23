import { makeRecipeCard } from "../components/recipe.js";

// Fonction qui remet toutes les recettes dans les propositions
export function displayRecipes(recipes) {
  const rctCtn = document.getElementById("rct_ctn");
  rctCtn.innerHTML = "";
  recipes.forEach((rct) => rctCtn.appendChild(makeRecipeCard(rct)));
  const nbRct = document.getElementById("nb_rct");
  nbRct.textContent = `${recipes.length} recettes`;
}
