import { recipes } from "../database/recipes.js";
import { displayFilters } from "../functions/displayFilters.js";
import { displayRecipes } from "../functions/displayRecipes.js";
import { displaySearch } from "../functions/search.js";
import { verifInput } from "../functions/verifInput.js";

function init() {
  // 1 - Création des filtres
  displayFilters(recipes);

  // 2 - Création des tuiles recette
  displayRecipes(recipes);
}

const delSearch = document.getElementById("del_search");
const searchBar = document.getElementById("search_bar");
const searchForm = document.getElementById("search_ctn");
const filterCtn = document.getElementById("filter_ctn");

// Supprimer ce qu'il y a d'inscrit dans la searchBar quan don clique sur la croix
delSearch.addEventListener("click", () => {
  delSearch.style.display = "none";
  searchBar.value = "";
  displaySearch("", filterCtn);
});

// On affiche la croix dès qu'on tape qq chose dans la searchBar
searchBar.addEventListener("input", () => {
  if (searchBar.value != "") {
    delSearch.style.display = "block";
    displaySearch(verifInput(searchBar.value, searchBar), filterCtn); // On lance également une recherche
  } else {
    delSearch.style.display = "none";
  }
});

// On lance une recherche au submit
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  displaySearch(verifInput(searchBar.value, searchBar), filterCtn);
});

init();
