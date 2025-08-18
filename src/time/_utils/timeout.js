export function timeout(ms, fn) {
  let id;
  const promise = new Promise((resolve) => {
    id = setTimeout(() => {
      if (fn) fn();
      resolve();
    }, ms);
  });

  return {
    id,
    clear: () => clearTimeout(id),
    promise
  };
}
