/*
 * @description: 
 * @author: steve.deng
 * @Date: 2020-08-20 21:49:20
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-08-20 22:43:23
 */
// 通过axios来获取结果

const axios = require('axios');
axios.interceptors.response.use((res) => {
    return res.data;
})
async function fetchRepoList() {
    // 通过配置文件 拉去不同仓库对应的用户下的文件
    return axios.get('https://api.github.com/orgs/zhu-cli/repos');
}
async function fetchTagList(repo){
    return axios.get(`https://api.github.com/repos/zhu-cli/${repo}/tags`);
}
module.exports = {
    fetchRepoList
}