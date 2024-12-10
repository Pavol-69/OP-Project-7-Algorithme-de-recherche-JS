// Elimine tous les caractères pouvant servir à une inversion HTML / SQL
export function verifInput(txt, myInput) {
  var verif = txt.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, "");
  myInput.value = verif;
  return verif;
}
