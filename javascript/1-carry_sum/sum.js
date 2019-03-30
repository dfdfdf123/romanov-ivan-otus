const sum = (n) => {
  let result = n;

  const add = (num) => {
    if (num === undefined) {
      return result;
    }
    result += num;
    return add;
  }
  
  return add;
};