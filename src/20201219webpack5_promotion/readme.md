<!--
 * @description:
 * @author: steve.deng
 * @Date: 2020-12-19 06:40:54
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-21 11:48:57
-->

## 1.安装依赖包

```
    cnpm webpack webpack-cli html-webpack-plugin webpack-dev-server cross-env -D

    cnpm i friendly-errors-webpack-plugin node-notifier -D
```

## 2.安装插件

### 2.1 日志美化安装

-   friendly-errors-webpack-plugin 可以识别某类别的 webpack 错误，并清理，聚合和优先级，以提供更好的开发人员体验

```
    cnpm i friendly-errors-webpack-plugin node-notifier -D
```

### 2.2 速度分析

-   speed-measure-webpack5-plugin 进行分析打包速度

```
cnpm i speed-measure-webpack5-plugin -D
```

### 2.3 文件体积监控

-   webpack-bundle-analyzer 是一个 webpack 插件，需要配合 webpack 和 webpack-cli 一起使用， 生产代码分析报告，
-   可以分析打包出文件的大小，依赖关系，压缩大小如何等。

### 2.3.1 安装

```
cnpm i webpack-bundle-analyzer -D
```

## 3.编译时间优化

-   减少要处理的文件
-   缩小查找的范围

### 3.1 缩小查找范围

### 3.1.1 extensions

-   指定 extensions 之后可以不用再 require 或是 import 的时候加文件拓展名
-   查找的时候会依次尝试添加拓展名进行匹配

```
resolve:{
    extensions: ['.js', '.jsx','.json']
}
```

### 3.1.2 alias

-   配置别名加快 webpack 查找模块的速度
-   每当引入 bootstrap 模块的时候，它会直接引入 bootstrap 而不需要从 node_modules 文件夹中按模块的查找规则查找

```
cnpm i bootstrap css-loader style-loader -S
```

### 3.2

-   利用缓存
-   重新构件时会尝试读取缓存， 从而提高打包速度
-   缓存存放位置 node_modules/.cache/babel-loader

```
  {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true // 自动babel缓存
                        }
                    }
```

### 3.3 cache-loader

-   在一些性能开销大的 loader 之前添加此 loader, 可以将结果缓存在磁盘中
-   默认保存在 node_modules/.cache/cache-loader 目录下

```
cnpm i cache-loader -D
```

### 3.4 hard-source-webpack-plugin

-   hardSourceWebpackPlugin 为模块提供了中间缓存， 缓存默认存放的路径是 node_modules/.cache/hard-source
-   首次构建无太大变化， 第二次构建时间大约可以减少 80%
-   webpack5 已经内置了模块缓存，不需要再使用此插件

```
cnpm i hard-source-webpack-plugin -D
```

## 4.编译体积优化

### 4.1 压缩 js、css、HTML 和图片

-   optimize-css-assets-webpack-plugin 是一个优化和压缩 css 资源的插件
-   terser-webpack-plugin 是一个优化和压缩 js 资源的插件
-   image-webpack-loader 可以帮助我们对图片进行压缩和优化

### 4.1.2 安装

```
cnpm i terser-webpack-plugin optimize-css-assets-webpack-plugin image-webpack-loader -D
```

## 4.2 清除无用的 css

-   purgecss-webpack-plugin 单独提取 css 并清除用不到的 css

### 4.2.1 安装

```
cnpm i purgecss-webpack-plugin mini-css-extract-plugin -D
```

## 5. 环境

### 4.1 mode 的默认值

-   webpack 的 mode 默认 production
-   webpack serve 的 mode 默认为 development
-   可以在模块内通过 process.env.NODE_ENV 获取当前环境变量 无法在 webpack 配置文件中获取此变量

### 4.2 修改

-   命令行加--mode=production 可以赋值 可以覆盖掉配置文件 优先级 默认 mode <config < --mode 配置

### 4.3 DefinePlugin

-   设置全局变量 所有模块都能读取该变量的值
-   可以在任意模块内通过 process.env.NODE_ENV 获取当前的环境变量
-   但无法在 node 环境（webpack 配置文件中）下获取当前的环境变量

```
 // 定义全局变量 修改process.env.NODE_ENV
new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
    ENV: JSON.stringify('ENV')
})
```
