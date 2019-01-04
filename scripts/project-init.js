const { spawn } = require('child_process')
const ejs = require('ejs')
const fs = require('fs')
const { copy } = require('fs-extra')
const { join } = require('path')

const templateFolder = './template'
const templateBaseFolder = templateFolder + '/base'

const init = async (options) => {
  const name = options.name
  const modules = options.modules

  const json = fs.readFileSync(templateFolder + '/package.json.ejs', 'utf-8')
  const jsonRender = ejs.render(json, { name: name, modules: modules })

  fs.writeFileSync(name + '/package.json', jsonRender)

  const config = fs.readFileSync(templateFolder + '/nuxt.config.js', 'utf-8')
  const configRender = ejs.render(config, { modules: modules })

  fs.writeFileSync(name + '/nuxt.config.js', configRender)

  fs.readdir(templateBaseFolder, (err, items) => {
    if (err) throw err
    const folders = items.filter(x => fs.lstatSync(`${templateBaseFolder}/${x}`).isDirectory())
    folders.forEach((folder) => {
      copy(`${templateBaseFolder}/${folder}`, `${name}/${folder}`, (err) => {
        if (err) throw err
      })
    })
  })

  // return await runYarn(name)
  return true
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
