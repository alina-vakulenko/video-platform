export const getPagesArray = (totalPages) => {
  let result = [];
  for (let i = 1; i <= totalPages; i++) {
    result.push(i);
  }
  return result;
};
