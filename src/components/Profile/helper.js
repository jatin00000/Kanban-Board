export function getInitials(fullName) {
  const names = fullName.split(" ");
  let firstNameInitial = "";
  let lastNameInitial = "";

  if (names.length > 0) {
    firstNameInitial = names[0].charAt(0);

    if (names.length > 1) {
      lastNameInitial = names[names.length - 1].charAt(0);
    }
  }

  return `${firstNameInitial}${lastNameInitial}`.toUpperCase();
}
export function ColorStatus(x) {
  if (x === true) {
    return "gold";
  } else {
    return "rgb(199, 203, 207)";
  }
}
