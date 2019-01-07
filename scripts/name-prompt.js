const chalk = require('chalk')
const { existsSync } = require('fs')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

module.exports = async () => {
  return new Promise((resolve) => {
    const ask = () => {
      readline.question(chalk.yellow.bold('Enter project name\n'), (answer) => {
        if (!answer.match(/^[a-z][a-z0-9\-_]+[a-z0-9]$/)) {
          console.log(chalk.red('Please enter a valid project name (a-z, 0-9, dashes, underscores, 3 chars min)\n'))
          ask()
        } else if (existsSync(answer)) {
          console.log(chalk.red('Directory already exists\n'))
          ask()
        } else {
          readline.close()
          resolve(answer)
        }
      })
    }

    ask()
  })
}
