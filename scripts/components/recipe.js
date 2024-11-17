export function makeRecipeCard(rct) {
  // Crée une tuile recette en fonction des infos de rct

  // Création des différents éléments HTML
  const recette = document.createElement("article");
  const imgCtn = document.createElement("div");
  const img = document.createElement("img");
  const txtCtn = document.createElement("div");
  const title = document.createElement("h1");
  const sctRct = document.createElement("section");
  const h2Rct = document.createElement("h2");
  const pRct = document.createElement("p");
  const sctIng = document.createElement("section");
  const h2Ing = document.createElement("h2");
  const ingCtn = document.createElement("div");
  const time = document.createElement("span");

  // Attribution des différentes classes
  recette.className = "recette";
  imgCtn.className = "rct_img_ctn";
  txtCtn.className = "rct_txt_ctn";
  sctRct.className = "sct_rct";
  sctIng.className = "sct_ing";
  ingCtn.className = "ing_ctn";
  time.className = "time";

  // Attribution valeur aux différents éléments
  img.setAttribute(
    "src",
    `../../assets/images/Recette${rct.id < 10 ? `0${rct.id}` : rct.id}.jpg`
  );
  img.setAttribute("alt", rct.name);
  title.textContent = rct.name;
  h2Rct.textContent = "RECETTE";
  pRct.textContent = rct.description;
  h2Ing.textContent = "INGREDIENTS";
  time.textContent = `${rct.time}min`;

  // Liaison entre les différents éléments HTML
  imgCtn.appendChild(img);
  recette.appendChild(imgCtn);
  txtCtn.appendChild(title);
  sctRct.appendChild(h2Rct);
  sctRct.appendChild(pRct);
  txtCtn.appendChild(sctRct);
  recette.appendChild(txtCtn);
  sctIng.appendChild(h2Ing);
  rct.ingredients.forEach((elt) => {
    // Création des différents éléments HTML
    const ing = document.createElement("div");
    const ingName = document.createElement("p");
    const ingQty = document.createElement("p");

    // Attribution des différentes classes
    ing.className = "ing";
    ingName.className = "ing_name";
    ingQty.className = "ing_qty";

    // Attribution valeur aux différents éléments
    ingName.textContent = elt.ingredient;
    ingQty.textContent = `${elt.quantity === undefined ? "" : elt.quantity} ${
      elt.unit === undefined ? "" : elt.unit
    }`;

    // Liaison entre les différents éléments HTML
    ing.appendChild(ingName);
    ing.appendChild(ingQty);
    ingCtn.appendChild(ing);
    sctIng.appendChild(ingCtn);
  });
  txtCtn.appendChild(sctIng);
  recette.appendChild(time);

  return recette;
}
