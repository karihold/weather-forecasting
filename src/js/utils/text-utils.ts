export function capitalizeFirstLetter(word: string) {
  const firstLetter = word.charAt(0).toLocaleUpperCase();
  const restOfTheWord = word.slice(1);

  return `${firstLetter}${restOfTheWord}`;
}

export function toLowerCaseAndHyphenateText(text: string) {
  return text.toLocaleLowerCase(text).replace(/\s/gm, '-');
}
