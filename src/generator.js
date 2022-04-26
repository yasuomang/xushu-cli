
const ora = require('ora')
const path = require('path');
const util = require('util');
require('util.promisify').shim();
const inquirer = require('inquirer')
const repoList = require('./constants').repoList
let downloadGitRepo = require('download-git-repo');
downloadGitRepo = util.promisify(downloadGitRepo);
const chalk = require('chalk');

// 添加加载动画
function wrapLoading(fn, message, ...args) {
  return new Promise((resolve, reject) => {
    // 使用 ora 初始化，传入提示信息 message
    const spinner = ora(message);
    // 开始加载动画
    spinner.start();
    // 执行传入方法 fn
    fn(...args).then((result=>{
        spinner.succeed();
        resolve(result)
    })).catch((err)=>{
        spinner.fail('Request failed, refetch ...')
        reject(err)
    })
  })
}

class Generator {
  constructor (projectName, targetDir){
    // 目录名称
    this.projectName = projectName;
    // 创建位置
    this.targetDir = targetDir;
  }

  // 获取用户选择的模板
  async getRepo() {
    const { repo } = await inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: repoList.map(item => item.projectName),
      message: 'Please choose a template to create project'
    })
    return repoList.find(item => item.projectName === repo).url;
  }

  // 核心创建逻辑
  async create(){
    const url = await this.getRepo()
    console.log(url);
    if(url){
        await wrapLoading(
        downloadGitRepo, // 远程下载方法
        'waiting download template', // 加载提示信息
        'direct:' + url, // 参数1: 下载地址
        path.resolve(process.cwd(), this.targetDir),
        { clone: true }) // 参数2: 创建位置
        .then(()=>{
            console.log(`\r\nSuccessfully created project ${chalk.cyan(this.projectName)}`)
            console.log(`\r\n  cd ${chalk.cyan(this.projectName)}`)
            console.log('  yarn && yarn dev\r\n')
        }).catch((err)=>{
            console.log(`\r\n${chalk.red(err)}`)
            console.log(`\r\n${chalk.red('Please contact the administrator')}`)
        })
    }else{
        console.log(`\r\n${chalk.yellow('This template is temporarily unavailable')}`)
    }
  }
}

module.exports = Generator;