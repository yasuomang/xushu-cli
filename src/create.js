const fs = require('fs'); 
const path = require('path');
const chalk = require('chalk');
const Generator = require('./generator')

// 逻辑主体部分
module.exports =  (projectName = 'my-project') => {
    // 当前命令行选择的目录
    const cwd  = process.cwd();
    // 需要创建的目录地址
    const targetAir  = path.join(cwd, projectName)
    // 判断 projectName 文件夹是否存在？
    if (fs.existsSync(projectName)) { 
        console.log(chalk.red('Folder already exists.'));
    }else{
        // 创建项目
        const generator = new Generator(projectName, targetAir);
        // 开始创建项目
        generator.create()
    }
};

