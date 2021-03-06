const express = require('express')
const router = express.Router()
const Url = require('../../models/url')
const PORT = process.env.PORT ? '' : ':3000'
const shortener = require('../../shortener')

router.get('/', (req, res) => {
  res.render('index')
})


router.post('/', (req, res) => {
  const input = req.body.fullUrl.trim()
  const checkHttp = input.indexOf(`${req.protocol}`)
  let long = ''

  if (checkHttp < 0) {
    long = `${req.protocol}://${input}`
  } else long = `${input}`
  let shortUrl = ''
  let shortId = ''
  Url.find()
    .lean()
    .then(urls => {
      const checkOne = urls.find(url => { return url.fullUrl === long })
      if (checkOne) {
        shortUrl = `${req.protocol}://${req.hostname}${PORT}/${checkOne.short}`
      } else {
        shortId = shortener()
        Url.find()
          .then(urls => {
            while (urls.some(url => url.short === shortId)) {
              shortId = shortener()
            }
            Url.create({
              fullUrl: `${long}`,
              short: `${shortId}`
            })
            shortUrl = `${req.protocol}://${req.hostname}${PORT}/${shortId}`
          })
          .then(() => res.render('index', { shortUrl }))
          .catch(error => console.log(error))
      }
    })
    .then(() => res.render('index', { shortUrl }))
    .catch(error => console.log(error))
})

router.get('/:short', (req, res) => {
  const short = req.params.short
  Url.findOne({ short: `${short}` })
    .then(url => { res.redirect(`${url.fullUrl}`) })
    .catch(error => console.log(error))
    .then(res.render('notExist', { error: 'The short URL does not exist!' }))
})

module.exports = router
