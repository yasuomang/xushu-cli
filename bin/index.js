#! /usr/bin/env node

const program = require('commander');
const path = require('path');
const { version } = require('../src/constants');
const create = require('../src/create')

const mapAction = { // 需要生成的指令数据
  create: {
    alias: 'c',
    description: 'create a project',
    examples: [
      'xushu-cli create <project-name>',
    ],
  },
  '*': {
    alias: '',
    description: 'command not found',
    examples: [],
  },
};
Reflect.ownKeys(mapAction).forEach((action) => {
  program
    .command(action) // 命令名
    .alias(mapAction[action].alias) // 命令别名
    .description(mapAction[action].description) // 命令描述
    .action(() => { // 命令执行的操作
      if (action === '*') { // 命令不存在
        console.log(mapAction[action].description);
      } else {
        create(...process.argv.slice(3))
      }
    });
});

program.on('--help', () => { // help命令打印帮助信息
  console.log('\nExample');
  Reflect.ownKeys(mapAction).forEach((action) => {
    mapAction[action].examples.forEach((item) => {
      console.log(item);
    });
  });
});

program
  .version(version)
  .parse(process.argv);
  
