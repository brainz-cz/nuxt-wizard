const fs = require('fs')
const { spawn } = require('child_process')

let json = require('../assets/default-package.json')

const addDependency = (name, dev) => {
  const key = dev ? 'devDependencies' : 'dependencies'
  json[key][name] = '*'
}

const addScript = (name, body) => {
  json.scripts[name] = body
}

const init = async (options) => {
  const name = options.name
  const modules = options.modules

  if(modules.includes('babel')) {

    if(modules.includes('eslint')) {
      addDependency('babel-eslint', true)
    }
  }

  if(modules.includes('gtm')) {

  }

  if(modules.includes('eslint')) {
    addDependency('eslint', true)
    addDependency('eslint-loader', true)
    addDependency('eslint-plugin-vue', true)
  }

  if(modules.includes('filters')) {
    addDependency('vue2-filters', true)
  }

  if(modules.includes('headroom')) {
    addDependency('vue-headroom')
  }

  if(modules.includes('heroku-postbuild')) {
    addScript('heroku-postbuild', 'npm run build')
  }

  if(modules.includes('i18n')) {
    addDependency('nuxt-i18n', true)
  }

  if(modules.includes('sass-boilerplate')) {

  }

  fs.writeFileSync(name + '/package.json', JSON.stringify(json))

  return await runYarn(name)
}

const runYarn = async (folder) => {
  const ls = spawn('yarn', { cwd: folder })

  // ls.stdout.on('data', (data) => {
  //   console.log(`stdout: ${data}`)
  // })

  // ls.stderr.on('data', (data) => {
  //   console.log(`stderr: ${data}`)
  // })

  await new Promise((resolve) => {
    ls.on('close', (code) => {
      resolve(console.log('ls close'))
    })
  })
}

module.exports = { init }
