<!--
 * @description:
 * @author: steve.deng
 * @Date: 2020-12-19 06:40:54
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-19 08:26:48
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
