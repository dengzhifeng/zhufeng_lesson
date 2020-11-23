<!--
 * @description:
 * @author: steve.deng
 * @Date: 2020-11-20 17:23:08
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-11-22 11:53:04
-->
<template>
    <div id="nav">
        <router-view></router-view>
        <van-tabbar route>
            <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
            <van-tabbar-item icon="orders-o" to="/mine">课程</van-tabbar-item>
            <van-tabbar-item icon="manager-o" to="/profile">个人中心</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<style lang="scss">

</style>
