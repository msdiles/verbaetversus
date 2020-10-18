import Fingerprint2 from "@fingerprintjs/fingerprintjs"

export default (
  options = {
    excludes: {
      screenResolution: true,
      availableScreenResolution: true,
      enumerateDevices: true,
    },
  }
) => {
  return new Promise((res, rej) => {
    if (window.requestIdleCallback) {
      requestIdleCallback(async function() {
        try {
          res(getFingerprint(options))
        } catch (e) {
          rej(e)
        }
      })
    } else {
      setTimeout(async function() {
        try {
          res(getFingerprint(options))
        } catch (e) {
          rej(e)
        }
      }, 100)
    }
  })
}

const getFingerprint = (options) => {
  return new Promise((res) => {
    Fingerprint2.get(options, function(components) {
      var values = components.map(function(component) {
        return component.value
      })
      var murmur = Fingerprint2.x64hash128(values.join(""), 31)
      res(murmur)
    })
  })
}
