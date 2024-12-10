// Va récupérer tous les tags sélectionnés, et va retourner un résultat sous forme de tableau à 3 colonnes, une pour chaque filtre
export function getAllTags(filterCtn) {
  let tagList = [[], [], []]; // regroupe tous les tag sélectionnés

  // Parcours du container de filtres, on va s'intérésser à l'ul nommée "filter_selection_list"
  for (let i = 0; i < filterCtn.childNodes.length; i++) {
    // Il s'agit du 1er élément du 3ème enfant
    const selectionList = filterCtn.childNodes[i].childNodes[2].childNodes[0];

    // Parcours des tags sélectionnés
    for (let j = 0; j < selectionList.childNodes.length; j++) {
      tagList[i].push(selectionList.childNodes[j].textContent);
    }
  }
  return tagList;
}
