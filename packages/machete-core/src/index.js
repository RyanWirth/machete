import CoreService from './core'

// Create a promise that will resolve once the service has been initialized
let resolve
const init = new Promise((_resolve) => {
  resolve = _resolve
})

// Define a "promisified" interface for the service
const CoreServiceInterface = {
  init(options) {
    return CoreService.init(options).then(resolve)
  },

  play(uri) {
    return init
      .then(() => CoreService.play(uri))
  },

  pause() {
    return init
      .then(() => CoreService.pause())
  },

  stop() {
    return init
      .then(() => CoreService.stop())
  },

  seekTo(timestamp) {
    return init
      .then(() => CoreService.seekTo(timestamp))
  },

  setVolume(volume) {
    return init
      .then(() => CoreService.setVolume(volume))
  },

  getMostPopular() {
    return init
      .then(() => CoreService.getMostPopular())
  },

  on(type, callback) {
    return init
      .then(() => CoreService.on(type, callback))
  },

  off(type, callback) {
    return init
      .then(() => CoreService.off(type, callback))
  }
}

export default CoreServiceInterface