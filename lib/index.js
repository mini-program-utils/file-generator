#!/usr/bin/env node
const program = require('commander');
const { createPage, createComponent } = require('./generator');

const name = process.argv[3];

program
  .option('component', 'create a new Component')
  .option('page', 'create a new Page');

program.parse(process.argv);

if (program.component) {
  createComponent(name);
}

if (program.page) {
  createPage(name);
}
