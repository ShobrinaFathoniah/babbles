export const checkSamePassword = (password, checkPassword) => {
  if (password === checkPassword) {
    return true;
  } else {
    return false;
  }
};
