const chalk = require('chalk')
const fs = require('fs')
const projectInit = require('./scripts/project-init.js')
const Prompt = require('prompt-checkbox')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

let projectName = null

const namePrompt = () => {
  readline.question(chalk.yellow.bold('Enter project name\n'), (answer) => {
    if(!answer.match(/^[a-z][a-z0-9\-_]+[a-z0-9]$/)) {
      console.log(chalk.red('Please enter a valid project name (a-z, 0-9, dashes, underscores, 3 chars min)\n'))
      namePrompt()
    } else if(fs.existsSync(answer)) {
      console.log(chalk.red('Directory already exists\n'))
      namePrompt()
    } else {
      readline.close()
      projectName = answer
      createDirectory(projectName)
    }
  })
}

const createDirectory = (name) => {
  fs.mkdir(name, (err) => {
    if(err) throw err
    console.log(chalk.green('📁 Directory created\n'))

    modulePrompt()
  })
}

const modulePrompt = () => {
  const prompt = new Prompt({
    name: 'modules',
    message: chalk.yellow('Select modules to install'),
    choices: [
      'babel',
      'gtm',
      'eslint',
      'filters',
      'headroom',
      'heroku-postbuild',
      'i18n',
      'sass-boilerplate'
    ],
    default: ['babel', 'eslint', 'sass-boilerplate']
  })

  prompt.ask((answers) => {
    projectInit.init({ name: projectName, modules: answers })
      .then(() => {
        console.log(chalk.green('🎉 Project initialized\n'))
      })
  })
}

namePrompt()
