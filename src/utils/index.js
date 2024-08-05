export const debounce = (fn, interval) => {
  let time = Date.now()
  let timeout
  return (...args) => {
    if (Date.now() - time < interval) clearTimeout(timeout)
    time = Date.now()
    timeout = setTimeout(() => {
      fn(...args)
    }, interval)
  }
}

export const throttle = (fn, interval) => {
  let time = Date.now()
  return (...args) => {
    if (Date.now() - time < interval) return
    time = Date.now()
    fn(...args)
  }
}
