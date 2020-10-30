/*
 * @description: 
 * @author: steve.deng
 * @Date: 2020-08-20 21:38:28
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-08-20 22:35:54
 */
const { fetchRepoList, fetchTagList  } = require('./request');
const Inquirer = require('inquirer');
const ora = require('ora');
const downloadGitRepo = require('download-git-repo'); // 不支持promsise
const path = require('path');
async function sleep(n) {
    return new Promse((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, n);
    });
}
// 制作等待loading
async function wrapLoading(fn, message, ...args) {
    const spinner = ora(message);
    spinner.start(); // 开始加载
    try {
        let repos = await fn(...args);
        spinner.succeed(); // 成功
        return repos;
    } catch (error) {
        spinner.fail('request failed, refetch....');
        await sleep(1000);
        return wrapLoading(fn, message, ...args);
    }
}
class creator {
    constructor(projectName, targetDir) {
        this.name = projectName;
        this.target = targetDir;
        // 转化为promise
        this.downloadGitRepo = promisify(downloadGitRepo);
    }
    async fetchRepo() {
        let repos = await wrapLoading(fetchRepoList,'waiting fetch template');
        if(!repos) return;
        repos = repos.map(item => item.name);
        let { repo } =  await Inquirer.prompt({
            name: 'repo',
            type: 'list',
            choices: repos,
            message: 'please choose a template'
        })
        return repo;
        console.log(repo);
    }
    async fetchTag() {
        let tags = await wrapLoading(fetchTagList, 'waiting fetcg tag', repo)
        if(!tags) return
        tags = tags.map(item => item.name);
        let { tag } =  await Inquirer.prompt({
            name: 'tag',
            type: 'list',
            choices: tags,
            message: 'please choose a tag'
        })
        return tag;
    }
    async download(repo, tag) {
        // 1.需要拼接下载路径来
        let requestUrl = `zhu-cli/${repo}${tag? '#'+tag : ''}`
        // 2.把资源下载下来再目标路径 (后续增加缓存功能, 下载到系统目录中，稍后使用ejs handlebar 去渲染模板 生产结果写入)
        // 放到系统文件中 -》模板
        await this.downloadGitRepo(requestUrl, path.resolve(process.pwd(), `${repo}@${tag}`));
        return this.target;
    }
    async create() {
        console.log(this.name, this.target);
        // 创建项目开始
        // 1、先去拉去当前组织下的模板     远程拉取方式 github
        let repo = await this.fetchRepo();

        // 2、通过模板找到版本号
        let tag = await this.fetchTag(repo);

        // 3、 下载
        let downloadUrl = await this.download(repo, tag);

        // 4、编译模板

    }
}