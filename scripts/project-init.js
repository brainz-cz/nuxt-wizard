const ejs = require('ejs')
const fs = require('fs')
const { spawn } = require('child_process')

const init = async (options) => {
  const name = options.name
  const modules = options.modules

  const json = fs.readFileSync('./template/package.json.ejs', 'utf-8')
  const jsonRender = ejs.render(json, { name: name, modules: modules })

  fs.writeFileSync(name + '/package.json', jsonRender)

  return await runYarn(name)
}

const runYarn = async (folder) => {
  const ls = spawn('yarn', { cwd: folder })

  await new Promise((resolve) => {
    ls.on('close', (code) => {
      resolve()
    })
  })
}

module.exports = init
