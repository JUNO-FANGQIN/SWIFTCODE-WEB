export const debounce = (fun, interval) => {
  let timer = null
  return function() {
    clearTimeout(timer)
    timer = setTimeout(() => fun.apply(this, arguments), interval)
  }
}