const Url = require('../url')
const shortener = require('../../shortener')
const db = require('../../config/mongoose')

db.once('open', () => {
  const shortPart = shortener()
  Url.create(
    {
      fullUrl: 'https://www.facebook.com',
      short: `${shortPart}`
    }
  )
  console.log('done')
})
