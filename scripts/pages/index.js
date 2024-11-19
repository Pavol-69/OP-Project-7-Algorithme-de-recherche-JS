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

// Supprimer ce qu'il y a d'inscrit dans la searchBar quan don clique sur la croix
const delSearch = document.getElementById("del_search");
const searchBar = document.getElementById("search_bar");
delSearch.addEventListener("click", () => {
  delSearch.style.display = "none";
  searchBar.value = "";
});

// On affiche la croix dès qu'on tape qq chose dans la searchBar
searchBar.addEventListener("input", () => {
  if (searchBar.value != "") {
    delSearch.style.display = "block";
  } else {
    delSearch.style.display = "none";
  }
});

init();
