export function debounce(fun: Function, delay = 500) {
  let timer: NodeJS.Timeout | null = null;

  return function (this: unknown, ...args: unknown[]) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fun.apply(this, args);
      timer = null;
    }, delay);
  }
}
