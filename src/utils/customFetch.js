export default (options) => {
  window._fetch = new Proxy(fetch, {
    apply: function(target, thisArg, argumentsList) {
      return target(options.url + argumentsList[0], argumentsList[1])
    },
  })
}
