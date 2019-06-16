import cheerio from 'cheerio'
import needle from 'needle'
import EventBus from './event-bus'

const Injectable = {
  init({ proxy }) {
    this.proxy = proxy || ''
  },

  get(url, options) {
    return needle('get', this.proxy + url, options)
      .then((response) => response.body)
      .then((body) => cheerio.load(body))
  },

  dispatch(type, payload) {
    EventBus.dispatch(type, payload)
  }
}

export default Injectable
