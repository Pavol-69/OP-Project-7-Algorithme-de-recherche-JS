import { recipes } from "../database/recipes.js";
import { filters } from "../components/filter.js";
import { makeRecipeCard } from "../components/recipe.js";

function init() {
  // 1 - Création des filtres
  const allFilters = filters(recipes);
  const filterCtn = document.getElementById("filter_ctn");
  filterCtn.appendChild(
    allFilters.createFilter("Ingrédient", allFilters.getAllIng())
  );
  filterCtn.appendChild(
    allFilters.createFilter("Appareil", allFilters.getAllApp())
  );
  filterCtn.appendChild(
    allFilters.createFilter("Ustensiles", allFilters.getAllUst())
  );
  const nbRct = document.getElementById("nb_rct");
  nbRct.textContent = `${recipes.length} recettes`;

  // 2 - Création des tuiles recette
  const rctCtn = document.getElementById("rct_ctn");
  recipes.forEach((rct) => rctCtn.appendChild(makeRecipeCard(rct)));
}

init();
