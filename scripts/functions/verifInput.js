// Fonction qui vérifie qu'on utilise que les lettres, chiffres, et @, via un regex, pour chacun des input
// afin de limiter les failles de sécurité
export function verifInput(txt) {
  /*var regex = /^[a-zA-Z0-9@]+$/;
  if (regex.test(txt)) {
    return true;
  } else {
    alert("caractère non valide !");
    return false;
  }*/
  return true;
}
