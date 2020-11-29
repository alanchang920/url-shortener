function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

function shortener() {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const uppeerCaseLetters = lowerCaseLetters.toUpperCase()
  const number = '1234567890'

  let collecttion = []

  collecttion = collecttion.concat(lowerCaseLetters.split(''))
  collecttion = collecttion.concat(uppeerCaseLetters.split(''))
  collecttion = collecttion.concat(number.split(''))

  let short = ''
  for (let i = 0; i < 5; i++) {
    short += sample(collecttion)
  }
  return short
}

module.exports = shortener
