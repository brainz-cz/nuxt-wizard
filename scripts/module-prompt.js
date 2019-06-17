const chalk = require('chalk')
const { MultiSelect, Select } = require('enquirer')

module.exports = async (projectName) => {
  return new Promise((resolve) => {
    const prompt = new MultiSelect({
      name: 'modules',
      message: chalk.yellow('Select modules to install'),
      choices: [
        'axios',
        'gtm',
        'event-bus',
        'filters',
        'headroom',
        'heroku-postbuild',
        'i18n',
        'scss-boilerplate'
      ],
      default: ['axios', 'eslint', 'scss-boilerplate']
    })

    const lintPrompt = new Select({
      name: 'lint',
      message: chalk.yellow('Select formatter'),
      choices: [
        { name: 'no-linter', message: 'None' },
        { name: 'eslint', message: 'ESLint' },
        { name: 'prettier', message: 'ESLint + Prettier' }
      ]
    })

    prompt.run()
      .then(answers => {
        lintPrompt.run()
          .then(lintAnswers => {
            console.log(chalk.green('⏳ Initializing project'))
            resolve(answers.concat(lintAnswers))
          })
          .catch(console.error)
      })
      .catch(console.error)
  })
}
