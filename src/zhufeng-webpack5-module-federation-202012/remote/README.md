treeshaking的原理是什么
我下载过一次
张佬太强了
要不要这么牛逼
从用法来说4 -> 5变化不大
我们把本地的webpack升级成5，会不会影响平时开发
跟微前端差不多？
老师刚刚拷贝的问题还没回答完呢
好像emp就是用的模块联邦，但是只能用同框架
emp是啥
不能跨技术栈
老师 咋不用lerna 这样方便些
yy
yy的技术前端方案叫emp
yy是啥
qq
publicPath 干嘛用的
Host 安装目录不对
起服务不用webServer了吗
devServer
感觉写错地方了
写到一开始的项目里了
搜索一下
模塊中用到公共樣式，在另外一個項目還能用馬？
暴露的名称 为什么 ./ 开头
暴露的名称为什么./开头
在别的项目中引入
老师之前拷贝的问题还没回答完呢
如果有多个引入地址呢
React.lazy()在vue里面用什么方法引入
如果不是一年react 那自然就没有react.lazy   那这个remote功能怎么用
如果不是用react 那自然就没有react.lazy   那这个remote功能怎么用
那现在这个暴露出去的组件可以在host里面做ssr吗？
hr?
React.lazy只不过是动态加载，vue也有动态加载
这个什么原理，老师讲讲
除了react.lazy还有什么方式 懒加载？react 中
loadablecomponent
最开始不是 react;.lazy
这引入remote的路径key 要写成相对路径是么
remote 这个名字是不要两边对应起来
很像微前端
这个有生命周期吗？

tree shaking为啥不能优化class里的方法 /* PURE */
其实是可以的。默认不行是因为webpack怕类里面的副作用
babel class -> function

优化对象的不安全
我想知道远程的是编译到哪里了，编译到github上了吗
因为class写法比较难判断是否有副作用
编译到当前项目下 不是起了服务么
那要真正的远程呢
怎么弄
靠publichPath暴露的
host对应起来呗
跟微前端好像
两者交互参数怎么传递
remote不用启本地服务吗？ host怎么取到remote
两者交互参数怎么传递
remote当然需要起服务，否则host访问不到。
两层remote？
哦
🐮模块联邦太强
类似于乾坤？
vue he react 也能共享 模块吗
乾坤也有坑
版本不太呢
shared 怎么保证版本一致性的问题呢
shared不保证版本的一致
host react 16 
remote react 17
他们是可以共存的
选择一个更高的版本
那版本不一致的话岂不是会有问题
约定好吧
同问
react能引用vue的模块吗
他会加载贡献的
不能引用vue
加载共享的版本
真正的微前端，不应该是不同框架可以互通吗
感觉这个是和动机有关系
引用共享的的话两个版本不同优先引用哪个？
动机是 一个项目组件共享
项目组件共享，搞成npm包也可以呀
微前端是个 解决方案 两个东西不搭噶
看看没配置之前的，是不是加载了两份
公共依赖本地有，为啥去加载远程的
好卡，你们卡吗？
张大佬真的好强，阿里P9+吗
这个共享有点东西。。 不过这里的主次关系不一样。是比较平等的关系。
这是功能开发时候用的还是上线时候用的
共享？那总有一边要安装这些依赖呀，其他的可以不用安装
也就是可以互相暴露， 可以形成一个闭环
那本地组件加载远程组件的时候，会把远程的组件加载build到本地吗，还是只会通过链接异步加载访问，不会build到本地。
通过远程访问的，都是build过后了的
引入的时候是不是一定要通过react.lazy的方式
本地肯定是起服务的
但是刚刚看本地组件build后的文件，没见到有这个组件build在本地文件里
动态加载都可以，比如loadablecomponent
怎么跟angular的module思想挺想
挺像
远程访问的不用build了呀，远程的本身就是build过后了的
treeshaking为啥不能优化class里的方法y
老师，如果引入abtd
哦 都配成远程了 本质上又一个还是本地的吧
remotes 的key  是和 远程 name 对应么
朱令超:remotes 的key 是和 远程 name 对应么



