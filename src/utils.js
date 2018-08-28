function* idMaker(prefix = "") {
  let index = 0;
  while (index < index + 1) yield prefix + index++;
}

export const getId = idMaker("slm");
