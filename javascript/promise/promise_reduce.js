async function promiseReduce(asyncFuncs, reducer, initialValue) {
  let result = initialValue;

  for (let func of asyncFuncs) {
    let f = await func();
    result = reducer(result, f);
  }

  return result;
}