const { spawn } = require('child_process')
const ejs = require('ejs')
const fs = require('fs')
const { copy } = require('fs-extra')
const { join } = require('path')

const templateFolder = __dirname + '/../template'
const templateBaseFolder = templateFolder + '/base'
const templatePluginsFolder = templateFolder + '/plugins'
const templateScssFolder = templateFolder + '/scss-boilerplate'
const templateAdditionalFolder = templateFolder + '/additional'

const init = async (options) => {
  const name = options.name
  const modules = options.modules

  const targetFolder = './' + name
  const targetPluginsFolder = targetFolder + '/plugins'

  const copyAdditionalFile = (filename, targetFilename) => {
    fs.copyFile(`${templateAdditionalFolder}/${filename}`, `${targetFolder}/${targetFilename}`, err => {
      if (err) throw err
    })
  }

  const json = fs.readFileSync(templateFolder + '/package.json.ejs', 'utf-8')
  const jsonRender = ejs.render(json, { name: name, modules: modules })

  fs.writeFileSync(targetFolder + '/package.json', jsonRender)

  const config = fs.readFileSync(templateFolder + '/nuxt.config.js.ejs', 'utf-8')
  const configRender = ejs.render(config, { modules: modules })

  fs.writeFileSync(targetFolder + '/nuxt.config.js', configRender)

  fs.readdir(templateBaseFolder, (err, items) => {
    if (err) throw err
    items.forEach((item) => {
      copy(`${templateBaseFolder}/${item}`, `${targetFolder}/${item}`, (err) => {
        if (err) throw err
      })
    })
  })

  fs.mkdir(targetPluginsFolder, err => {
    if (err) throw err
    copyPluginFiles('README.md', targetPluginsFolder)

    if (modules.includes('event-bus')) {
      copyPluginFiles('event-bus.js', targetPluginsFolder)
    }

    if (modules.includes('filters')) {
      copyPluginFiles('filters.js', targetPluginsFolder)
    }

    if (modules.includes('gtm')) {
      copyPluginFiles(['gtm.js', 'gtm-pageview.js'], targetPluginsFolder)
    }

    if (modules.includes('headroom')) {
      copyPluginFiles('headroom.js', targetPluginsFolder)
    }
  })

  fs.mkdir(targetFolder + '/assets', err => {
    if (err) throw err
    if (modules.includes('scss-boilerplate')) {
      const targetScssFolder = targetFolder + '/assets/scss'
      fs.mkdir(targetScssFolder, err => {
        if (err) throw err
        copy(templateScssFolder, targetScssFolder)
      })
    }
  })

  if (modules.includes('i18n')) {
    copy(templateFolder + '/locales', targetFolder + '/locales')
  }

  if (modules.includes('eslint')) {
    copyAdditionalFile('eslintrc.js', '.eslintrc.js')
  } else if (modules.includes('prettier')) {
    copyAdditionalFile('eslintrc-prettier.js', '.eslintrc.js')
    copyAdditionalFile('prettierrc', '.prettierrc')
  }

  return await runInstall(name)
}

const copyPluginFiles = (filenames, folder) => {
  if (!Array.isArray(filenames)) filenames = [filenames]

  filenames.forEach(filename => {
    fs.copyFile(`${templatePluginsFolder}/${filename}`, `${folder}/${filename}`, err => {
      if (err) throw err
    })
  })
}

const runInstall = async (folder) => {
  const yarnSuccess = await runCommand('yarn', [], folder)
  if (!yarnSuccess) {
    await runCommand('npm', ['install'], folder)
  }
  return true
}

const runCommand = async (cmd, arguments, folder) => {
  const ls = spawn(cmd, arguments, { cwd: folder })

  return await new Promise((resolve) => {
    ls.on('error', (error) => {
      resolve(false)
    })
    ls.on('close', (code) => {
      resolve(true)
    })
  })
}

module.exports = init
