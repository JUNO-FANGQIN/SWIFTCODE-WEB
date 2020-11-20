export function debounce(fun, interval) {
  let timer = null
  return function() {
    // console.log('@@@@', args)
    console.log('@@@@1', timer)
    clearTimeout(timer)
    console.log('@@@@2', timer)
    timer = setTimeout(() => fun.apply(this, arguments), interval)
    console.log('@@@@3', timer)
  }
}
