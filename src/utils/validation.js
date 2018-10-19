export const blankPopValidation = (text) => {
  for (let i = text.length - 1; i >= 0; i--) {
    if (text[i] === '' || text[i] === ' ') {
      text.pop();
    } else {
      break;
    }
  }

  return text;
}

export const regexEn = (text) => {
  const regex = /[A-Za-z0-9]/;
  const result = regex.test(text);

  return result;
}
