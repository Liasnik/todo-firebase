export const memoizeLast = (fn) => {
    let lastArg;
    let lastResult;
    return (arg) => {
      if (arg === lastArg) return lastResult;
      lastArg = arg;
      lastResult = fn(arg);
      return lastResult;
    };
  };