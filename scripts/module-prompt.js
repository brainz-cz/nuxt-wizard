const chalk = require('chalk')
const Prompt = require('prompt-checkbox')

module.exports = async (projectName) => {
  return new Promise((resolve) => {
    const prompt = new Prompt({
      name: 'modules',
      message: chalk.yellow('Select modules to install'),
      choices: [
        'axios',
        'babel',
        'gtm',
        'eslint',
        'event-bus',
        'filters',
        'headroom',
        'heroku-postbuild',
        'i18n',
        'sass-boilerplate',
        'webfont-loader'
      ],
      default: ['axios', 'babel', 'eslint', 'sass-boilerplate']
    })

    prompt.ask((answers) => {
      console.log(chalk.green('⏳ Initializing project'))
      resolve(answers)
    })
  })
}
