/*
 * @description: 
 * @author: steve.deng
 * @Date: 2020-08-20 21:24:19
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-08-20 21:40:38
 */
const path = require('path');
const Creator = require('./creator');
const fs = require('fs-extra');
const Inquirer = require('inquirer');
module.exports = async function(projectName, options) {
    // 创建模块
    const cwd = process.cwd();  // 获取当前命令执行时的工作目录
    console.log(pwd); // 哪里运行就在哪里 
    const targetDir = path.join(cwd, projectName) // 目标目录
    if(fs.existsSync(targetDir)) { // 判断是否存在当前目录
        if(options.force) {
            await fs.remove(targetDir);
        } else {
            // 提示用户是否确定覆盖  prompt返回一个promise
            let { action } = await Inquirer.prompt([
                {
                    name: 'action',
                    type: 'list', // 类型丰富
                    message:`Target directory`,
                    choices: [
                        { name: 'overwrite', value: 'overwrite'},
                        { name: 'cancel', value: false},
                    ]
                }
            ]);
            if(!action) {
                return;
            } else if( action === 'overwrite') {
                await fs.remove(targetDir)
            }
        }
    }
    //  创建项目

    const creator = new Creator(projectName, targetDir);
}