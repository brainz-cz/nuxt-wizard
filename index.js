#!/usr/bin/env node

const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const fs = require('fs')
const path = require('path')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

const createDirectory = require('./scripts/create-directory.js')
const modulePrompt = require('./scripts/module-prompt.js')
const namePrompt = require('./scripts/name-prompt.js')
const projectInit = require('./scripts/project-init.js')

const run = async () => {
  clear()
  console.log(chalk.cyan(figlet.textSync('nuxt-wizard')))

  const projectName = await namePrompt()
  await createDirectory(projectName)

  const modules = await modulePrompt(projectName)

  await projectInit({ name: projectName, modules: modules })

  console.log(chalk.green('🎉 Project initialized\n'))
}

run()
