/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-12-29 07:15:57
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-29 07:17:25
 */
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json()); // 可以接收JSON格式请求体
app.listen(3000, () => {
    console.log('服务端在3000端口启动了!');
});
