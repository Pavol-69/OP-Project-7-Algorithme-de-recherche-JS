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
    const erase = document.createElement("i");
    const selectList = document.createElement("ul");
    const optionList = document.createElement("ul");
    const scroll = document.createElement("div");
    list.forEach((elt) => {
      const li = document.createElement("li");
      li.textContent = elt;
      optionList.appendChild(li);

      // Chaque élément sélectionné doit être répertorié pour la recherche
      li.addEventListener("click", () => {
        // On vérifie d'abord si l'élément n'existe pas déjà
        let bool = true;
        selectList.childNodes.forEach((elt) => {
          if (li.textContent == elt.textContent) {
            bool = false;
          }
        });
        if (bool) {
          const liSelect = document.createElement("li");
          const del = document.createElement("i"); // On rajoute également un bouton pour enlever la sélection au besoin
          del.className = "fa-solid fa-circle-xmark";
          liSelect.textContent = li.textContent;
          liSelect.appendChild(del);
          selectList.appendChild(liSelect);

          // On ajoute également l'élément dans la section tag
          const tagCtn = document.getElementById("tag_ctn");
          const tag = document.createElement("div");
          const delTag = document.createElement("i");
          tag.className = "tag";
          delTag.className = "fa-solid fa-xmark";
          tag.innerHTML = li.textContent;
          tag.appendChild(delTag);
          tagCtn.appendChild(tag);

          // Evènement suppression de l'élément si on clique sur le bouton supprimer
          del.addEventListener("click", () => {
            delSelect();
          });

          delTag.addEventListener("click", () => {
            delSelect();
          });

          function delSelect() {
            selectList.removeChild(liSelect);
            tagCtn.removeChild(tag);
          }
        }
      });
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
    scroll.className = "scroll";
    erase.className = "fa-solid fa-xmark";

    // Mise en relation des éléments HTML
    loupe.appendChild(loupeCircle);
    loupe.appendChild(loupeLine);
    button.appendChild(loupe);
    searchBar.appendChild(input);
    searchBar.appendChild(erase);
    searchBar.appendChild(button);
    header.appendChild(label);
    header.appendChild(chevron);
    filter.appendChild(header);
    filter.appendChild(searchBar);
    scroll.appendChild(selectList);
    scroll.appendChild(optionList);
    filter.appendChild(scroll);

    // Ajout de l'évènement click on chevron pour étendre ou réduire les filtres
    chevron.addEventListener("click", (e) =>
      extandFilter(e, filter, searchBar)
    );

    // Ajout de l'évènement onBlur pour réduire les menus quand on clique ailleurs
    /*filter.setAttribute("tabIndex", "0"); // Obligatoire pour l'évènement
    filter.onblur = filterOnBlur;
    function filterOnBlur() {
      chevron.className = "fa-solid fa-chevron-down";
      filter.style.height = "22px";
      searchBar.style.opacity = "0";
    }*/

    // Ajout de la fonction effacer dans l'input
    erase.addEventListener("click", () => {
      input.value = "";
      majList(input.value, list, optionList, erase);
    });

    // Evènement à chaque fois qu'on change qq chose dans input, ou qu'on clique sur la loupe
    // On met à jour la liste de proposition
    input.addEventListener("input", () => {
      majList(input.value, list, optionList, erase);
    });
    searchBar.addEventListener("submit", (e) => {
      e.preventDefault();
      majList(input.value, list, optionList, erase);
    });

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

  // Met à jour la liste du filtre en fonction de ce qu'on écrit dans l'input
  function majList(inputVal, list, optionList, erase) {
    let newList = [];

    // On affiche le bouton effacer s'il y a une valeur
    if (inputVal != "") {
      erase.style.display = "block";
    } else {
      erase.style.display = "none";
    }

    // Parcours de la liste originale, dès que ce qu'il y a inscrit dans input se trouve dans l'élément, on l'ajoute à la newList
    list.forEach((elt) => {
      if (elt.toLowerCase().includes(inputVal.toLowerCase())) {
        newList.push(elt);
      }
    });

    // On reconstitue ensuite le HTML
    optionList.innerHTML = "";
    newList.forEach((elt) => {
      const li = document.createElement("li");
      li.textContent = elt;
      optionList.appendChild(li);
    });
  }

  return { getAllIng, getAllApp, getAllUst, createFilter };
}
