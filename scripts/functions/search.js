import { displayRecipes } from "../functions/displayRecipes.js";
import { displayFilters } from "../functions/displayFilters.js";
import { getAllTags } from "../functions/getAllTags.js";
import { recipes } from "../database/recipes.js";

export function search(myInput, filterCtn) {
  const rctCtn = document.getElementById("rct_ctn");

  let result = [];

  // 1 - On filtre les recettes par rapport à ce qu'il y a dans la searchBar
  // la recherche ne lance que si on a 3 caractères ou plus
  if (myInput.length >= 3) {
    // On efface tout
    rctCtn.innerHTML = "";

    // Parcours de toute les recettes
    recipes.forEach((rct) => {
      // Vérif dans les ingrédient
      const resultIng = rct.ingredients.filter((ing) =>
        ing.ingredient.toLowerCase().includes(myInput.toLowerCase())
      );

      //Vérif si ce qui est rentré est dans le titre, la description, ou les ingrédients
      // et s'il y a un match dans les tags
      if (
        myInput.length >= 3 &&
        (rct.name.toLowerCase().includes(myInput.toLowerCase()) ||
          rct.description.toLowerCase().includes(myInput.toLowerCase()) ||
          resultIng.length > 0)
      ) {
        result.push(rct);
      }
    });
  } else {
    // Si rien n'est spécifié, on recherche dans toutes les recettes
    result = recipes.slice(0);
  }

  // 2 - On s'occupe des tags, on supprime tout ce qui ne correspond pas aux tags
  const tagList = getAllTags(filterCtn);

  for (let i = result.length - 1; i >= 0; i--) {
    // Ingrédients
    let boolIng = true;
    if (tagList[0].length == 0) {
      boolIng = false;
    }
    tagList[0].forEach((tag) => {
      result[i].ingredients.forEach((ing) => {
        if (tag == ing.ingredient) {
          boolIng = false;
        }
      });
    });

    // Appareils
    let boolApp = true;
    if (tagList[1].length == 0) {
      boolApp = false;
    }
    tagList[1].forEach((tag) => {
      if (tag.toLowerCase() == result[i].appliance.toLowerCase()) {
        boolApp = false;
      }
    });

    // Ustensiles
    let boolUst = true;
    if (tagList[2].length == 0) {
      boolUst = false;
    }
    tagList[2].forEach((tag) => {
      result[i].ustensils.forEach((ust) => {
        if (tag == ust) {
          boolUst = false;
        }
      });
    });

    // Si rien n'a été détecté
    if (boolIng || boolApp || boolUst) {
      result.splice(i, 1);
    }
  }

  // 3 - On affiche les résultats
  // Affichage des éléments présents dans result + maj filtres
  displayRecipes(result);
  displayFilters(result);
}
