const express = require('express')
const router = express.Router()
const Url = require('../../models/url')
const shortener = require('../../shortener')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const input = req.body.fullUrl
  const checkHttp = input.indexOf(`${req.protocol}`)
  const head = req.headers.origin
  let long = ''

  if (checkHttp < 0) {
    long = `${req.protocol}://${input}`
  } else { long = `${input}` }
  let shortUrl = ''
  let shortId = ''
  Url.find()
    .lean()
    .then(urls => {
      const checkOne = urls.find(url => { return url.fullUrl === long })
      if (checkOne) {
        shortUrl = `${head}/${checkOne.short}`
      } else {
        shortId = shortener()
        const check = urls.find(url => url.short === shortId)
        if (check) {
          return Url.find()
        } else {
          Url.create({
            fullUrl: `${long}`,
            short: `${shortId}`
          })
          shortUrl = `${head}/${shortId}`
        }
      }
    })
    .then(() => res.render('index', { shortUrl }))
    .catch(error => console.log(error))
})

router.get('/:short', (req, res) => {
  const short = req.params.short
  Url.findOne({ short: `${short}` })
    .then((url) => {
      res.redirect(`${url.fullUrl}`)
    })
    .catch(error => console.log(error))
})
module.exports = router
