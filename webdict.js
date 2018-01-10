#!/usr/bin/env node
'use strict'
const webdict = require('webdict')
const program = require('commander')
const chalk = require('chalk')
const pkgversion = require('./package.json').version

function fetchDefinition (site, word) {
  webdict(site, word)
        .then(resp => {
          if (resp.message === 'success') {
            console.log(chalk.bold('Type: ') + chalk.green(resp.type))
            console.log(chalk.bold('Source: ') + chalk.green(resp.source))
            resp.definition.forEach((val, idx) => {
              console.log(chalk.bold('Definition', idx + 1) + ':\n' + chalk.green(val))
            })
          } else {
            console.log(chalk.bold('-----------------'))
            console.log(chalk.bold('From: ') + chalk.green(resp.source))
            console.log(chalk.bold('Message: ') + chalk.red(`${resp.message}`))
          }
        })
}

program
    .description('Search dictionary.com and urbandictionary from CLI')
    .version(pkgversion)
    .option('-d , --dictionary <word>', 'search in dictionary.com')
    .option('-u, --urbandictionary <word>', 'search in urbandictionary.com')
    .parse(process.argv)

if (program.dictionary) {
  fetchDefinition('dictionary', program.dictionary)
} else if (program.urbandictionary) {
  fetchDefinition('urbandictionary', program.urbandictionary)
} else if (program.args.length > 0) {
  var word = program.args.join(' ')
  fetchDefinition('dictionary', word)
  fetchDefinition('urbandictionary', word)
} else {
  console.log('see `webdict --help` for more info')
}
