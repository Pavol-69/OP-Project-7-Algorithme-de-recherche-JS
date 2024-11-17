// Extraction de toutes les données aux filtres, puis on renvoie les éléments HTML relatifs aux différents filtres
export function filters(recipes) {
  // Extraction de tous les ingrédients de recipes
  function getAllIng() {
    let allIng = []; // array avec tous les ingrédients
    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ing) => {
        // On vérifie si l'ingrédient existe déjà ou non, pour éviter les doublons
        if (!alreadyExist(allIng, ing.ingredient)) {
          allIng.push(ing.ingredient);
        }
      });
    });
    return allIng.sort(); // .sort() pour y trier par ordre alphabétique
  }

  // Extraction de tous les appareils de recipes
  function getAllApp() {
    let allApp = []; // array avec tous les appareils
    recipes.forEach((recipe) => {
      // On vérifie si l'appareil existe déjà ou non, pour éviter les doublons
      if (!alreadyExist(allApp, recipe.appliance)) {
        allApp.push(recipe.appliance);
      }
    });
    return allApp.sort(); // .sort() pour y trier par ordre alphabétique
  }

  // Extraction de tous les ustensiles de recipes
  function getAllUst() {
    let allUst = []; // array avec tous les ustensiles
    recipes.forEach((recipe) => {
      recipe.ustensils.forEach((ust) => {
        // On vérifie si l'ingrédient existe déjà ou non, pour éviter les doublons
        if (!alreadyExist(allUst, ust)) {
          allUst.push(ust);
        }
      });
    });
    return allUst.sort(); // .sort() pour y trier par ordre alphabétique
  }

  function createFilter(name, list) {
    // Création des différents éléments HTML
    const filter = document.createElement("div");
    const header = document.createElement("div");
    const label = document.createElement("label");
    const chevron = document.createElement("i");
    const searchBar = document.createElement("form");
    const input = document.createElement("input");
    const button = document.createElement("button");
    const loupe = document.createElement("div");
    const loupeCircle = document.createElement("div");
    const loupeLine = document.createElement("div");
    const selectList = document.createElement("ul");
    const optionList = document.createElement("ul");
    list.forEach((elt) => {
      const li = document.createElement("li");
      li.textContent = elt;
      optionList.appendChild(li);
    });

    // Remplissage des éléments HTML
    label.textContent = name;

    // Attribution des classes
    filter.className = "filter";
    header.className = "filter_hd";
    chevron.className = "fa-solid fa-chevron-down";
    searchBar.className = "filter_search";
    input.className = "filter_input";
    loupe.className = "loupe_ctn";
    loupeCircle.className = "loupe_circle";
    loupeLine.className = "loupe_line";
    selectList.className = "filter_selection_list";
    optionList.className = "filter_choises_list";

    // Mise en relation des éléments HTML
    loupe.appendChild(loupeCircle);
    loupe.appendChild(loupeLine);
    button.appendChild(loupe);
    searchBar.appendChild(input);
    searchBar.appendChild(button);
    header.appendChild(label);
    header.appendChild(chevron);
    filter.appendChild(header);
    filter.appendChild(searchBar);
    filter.appendChild(selectList);
    filter.appendChild(optionList);

    // Ajout de l'évènement click on chevron pour étendre ou réduire les filtres
    chevron.addEventListener("click", (e) =>
      extandFilter(e, filter, searchBar)
    );

    return filter;
  }

  // Fonction qui indique si elm se trouve déjà dans list ou non
  function alreadyExist(list, elt) {
    let bool = false;
    list.forEach((listElt) => {
      if (listElt == elt) {
        bool = true;
      }
    });
    return bool;
  }

  // Fonction qui étend ou réduit un filtre
  function extandFilter(e, filter, searchBar) {
    if (e.target.className == "fa-solid fa-chevron-down") {
      e.target.className = "fa-solid fa-chevron-up";
      filter.style.height = "auto";
      searchBar.style.opacity = "1";
    } else {
      e.target.className = "fa-solid fa-chevron-down";
      filter.style.height = "22px";
      searchBar.style.opacity = "0";
    }
  }

  return { getAllIng, getAllApp, getAllUst, createFilter };
}
