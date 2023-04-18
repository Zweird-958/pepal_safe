const A_UPPER = 65
const Z_UPPER = 90
const A_LOWER = 97
const Z_LOWER = 122
const ZERO = 48
const NINE = 57

const getRandomChar = (min, max) => {
  return String.fromCharCode(getRandom(min, max))
}

const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

const getRandomUpper = () => {
  return getRandomChar(A_UPPER, Z_UPPER)
}

const getRandomLower = () => {
  return getRandomChar(A_LOWER, Z_LOWER)
}

const getRandomNumber = () => {
  return getRandomChar(ZERO, NINE)
}

const getRandomChoice = (choices) => {
  const keys = Object.keys(choices)
  const randomIndex = Math.floor(Math.random() * keys.length)

  return keys[randomIndex]
}

const getRandomSpecial = () => {
  const random = Math.floor(Math.random() * 2 + 1)

  return random === 1 ? getRandomChar(35, 38) : getRandomChar(63, 64)
}

const allChoicesDone = (choices) => {
  return Object.values(choices).every((value) => value === true)
}

const getCharToAdd = (choices) => {
  const choice = getRandomChoice(choices)

  switch (choice) {
    case "upper":
      return getRandomUpper()

    case "lower":
      return getRandomLower()

    case "symbol":
      return getRandomSpecial()

    case "number":
      return getRandomNumber()

    default:
      return ""
  }
}

const generatePassword = (values) => {
  const { length } = values
  const choices = {}

  Object.entries(values).forEach(([key, value]) => {
    if (value && key !== "length") {
      choices[key] = false
    }
  })

  let password = ""

  for (let i = 0; i < length; i++) {
    if (allChoicesDone(choices)) {
      const char = getCharToAdd(choices)
      password += char
    } else {
      let choice = getRandomChoice(choices)

      while (choices[choice]) {
        choice = getRandomChoice(choices)
      }

      const char = getCharToAdd(choices)
      password += char
      choices[choice] = true
    }
  }

  return password
}

export default generatePassword
