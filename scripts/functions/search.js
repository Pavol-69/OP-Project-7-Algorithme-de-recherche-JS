import { displayRecipes } from "../functions/displayRecipes.js";
import { displayFilters } from "../functions/displayFilters.js";
import { getAllTags } from "../functions/getAllTags.js";
import { recipes } from "../database/recipes.js";

function search(myInput, filterCtn) {
  let result = [];

  //*********** OPTION 1 - SEARCH AVEC BOUCLES NATIVES **********************

  // 1 - On filtre les recettes par rapport à ce qu'il y a dans la searchBar
  // la recherche ne lance que si on a 3 caractères ou plus
  if (myInput.length >= 3) {
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
  } else {
    // Si rien n'est spécifié, on recherche dans toutes les recettes
    result = recipes.slice(0);
  }

  //********************** FIN OPTION 1 ******************************

  // 2 - On s'occupe des tags, on supprime tout ce qui ne correspond pas aux tags
  const tagList = getAllTags(filterCtn);

  for (let i = result.length - 1; i >= 0; i--) {
    // Ingrédients
    let boolIng = true;
    if (tagList[0].length == 0) {
      boolIng = false;
    }
    for (let j = 0; j < tagList[0].length; j++) {
      for (let k = 0; k < result[i].ingredients.length; k++) {
        if (
          tagList[0][j].toLowerCase() ==
          result[i].ingredients[k].ingredient.toLowerCase()
        ) {
          boolIng = false;
        }
      }
    }

    // Appareils
    let boolApp = true;
    if (tagList[1].length == 0) {
      boolApp = false;
    }
    for (let j = 0; j < tagList[1].length; j++) {
      if (tagList[1][j].toLowerCase() == result[i].appliance.toLowerCase()) {
        boolApp = false;
      }
    }

    // Ustensiles
    let boolUst = true;
    if (tagList[2].length == 0) {
      boolUst = false;
    }
    for (let j = 0; j < tagList[2].length; j++) {
      for (let k = 0; k < result[i].ustensils.length; k++) {
        if (
          tagList[2][j].toLowerCase() == result[i].ustensils[k].toLowerCase()
        ) {
          boolUst = false;
        }
      }
    }

    // Si rien n'a été détecté
    if (boolIng || boolApp || boolUst) {
      result.splice(i, 1);
    }
  }

  return result;
}

export function displaySearch(myInput, filterCtn) {
  // Affiche les bons éléments en fonction de ce que nous retourne la fonction search
  const result = search(myInput, filterCtn);
  const rctCtn = document.getElementById("rct_ctn");

  rctCtn.innerHTML = "";

  if (result.length == 0) {
    // Si aucun résultat, on met le message d'erreur
    displayRecipes([]);
    displayFilters([]);
    const message = document.createElement("span");
    message.className = "no_result";
    message.textContent = "Aucune correspance trouvée..";
    rctCtn.appendChild(message);
  } else {
    displayRecipes(result);
    displayFilters(result);
  }
}
