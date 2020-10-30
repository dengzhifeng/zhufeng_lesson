/*
 * @description: 
 * @author: steve.deng
 * @Date: 2020-08-20 20:53:45
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-08-20 21:25:16
 */
const program = require('commander');
const chalk = require('chalk');

const cleanArgs = (cmd) => {
    const args = {};
    cmd.options.forEach( o => {
        const key = o.long.slice(2);
        if(cmd[key]) args[key] = cmd[key];
    })
    return args;
}

program
    .command('create <app-name>')
    .description('create new project')
    .option('-f, --force', 'overwrite tagxxxxxx')
    .action((name, cmd) => {
        console.log(name, cleanArgs(cmd)) // 提取cmd中的属性
    })

// vue  config --get a
// vue  config --set a 1
program
    .command('config [value]')
    .description('inspect and modify the config')
    .option('-g, --get <path>', 'get value from option')
    .option('-s, --set <path> <value>', 'set option value')
    .option('-d, --delete <path>', 'delete option from config')
    .action((value, cmd) => {
        // 调用cereate 模块调用
        require('../lib/create')(name, cleanArgs(cmd));
        console.log(value, cleanArgs(cmd)); // 提取cmd中的属性
    })

program
    .command(`ui`)
    .description('open ui server')
    .option('-p, --port <port> <value>', 'port user for UI server ')
    .action((cmd) => {

        // 调用config模块去实现
        console.log(value, cleanArgs(cmd)) // 提取cmd中的属性
    })

program.on('--help', function() {
    console.log();
    console.log(`Run ${chalk.cyan('zhu-cli <command> --help')} show detail`);
    console.log();
})

program
    .version(`${require('..package.json').version}`)
    .usage(`<command> [option]`)

// 解析执行命令传入的参数
program.parse(process.argv)