const chalk = require('chalk')
const { mkdir } = require('fs')

module.exports = async (name) => {
  return new Promise((resolve) => {
    mkdir('./' + name, (err) => {
      if (err) throw err
      console.log(chalk.green('📁 Directory created\n'))

      resolve()
    })
  })
}
