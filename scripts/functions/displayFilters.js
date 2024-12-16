import { filters } from "../components/filter.js";

// Création des 3 filtres en fonction d'une liste de recettes
export function displayFilters(recipesList) {
  const allFilters = filters(recipesList);
  const filterCtn = document.getElementById("filter_ctn");
  filterCtn.innerHTML = "";
  filterCtn.appendChild(
    allFilters.createFilter("Ingrédient", allFilters.getAllIng())
  );
  filterCtn.appendChild(
    allFilters.createFilter("Appareil", allFilters.getAllApp())
  );
  filterCtn.appendChild(
    allFilters.createFilter("Ustensiles", allFilters.getAllUst())
  );
}
