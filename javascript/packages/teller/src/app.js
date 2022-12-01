import process from 'node:process'
import { createInterface } from 'node:readline'

// Assume it is not a leap year
const SECONDS_IN_YEAR = 31540000
// Assume a month is 28 days (4 weeks)
const SECONDS_IN_MONTH = 2628000
const SECONDS_IN_DAY = 86400
const SECONDS_IN_HOUR = 3600
const SECONDS_IN_MINUTE = 60

export const getUserInput = (streams = process) => {
  const readline = createInterface({
    input: streams.stdin,
    output: streams.stdout,
  })
  return new Promise((res, rej) => {
    readline.question('Hoeveel seconden moeten er omgerekend worden? \x1b[32m', (input) => {
      process.stdout.write('\x1b[0m')
      const asNumber = parseInt(input, 10)

      readline.close()
      if (Number.isNaN(asNumber) || input < 0) {
        rej(new Error(`Invalid input "${input}"`))
      }
      res(asNumber)
    })
  })
}

const calculate = (seconds) => {
  const parts = {}
  parts.years = Math.floor(seconds / SECONDS_IN_YEAR)
  seconds = seconds % SECONDS_IN_YEAR
  parts.months = Math.floor(seconds / SECONDS_IN_MONTH)
  seconds = seconds % SECONDS_IN_MONTH
  parts.days = Math.floor(seconds / SECONDS_IN_DAY)
  seconds = seconds % SECONDS_IN_DAY
  parts.hours = Math.floor(seconds / SECONDS_IN_HOUR)
  seconds = seconds % SECONDS_IN_HOUR
  parts.minutes = Math.floor(seconds / SECONDS_IN_MINUTE)
  parts.seconds = seconds % SECONDS_IN_MINUTE

  return parts
}

const format = (val, singular, plural) => `${val} ${val === 1 ? singular : plural}`

const formatParts = (parts) =>
  `${format(parts.years, 'jaar', 'jaren')}, ${format(parts.months, 'maand', 'maanden')}, ${format(
    parts.days,
    'dag',
    'dagen',
  )}, ${format(parts.hours, 'uur', 'uren')}, ${format(
    parts.minutes,
    'minuut',
    'minuten',
  )} en ${format(parts.seconds, 'seconde', 'seconden')}`

export const main = async () => {
  const input = await getUserInput()

  const parts = calculate(input)

  console.log(formatParts(parts))
}
