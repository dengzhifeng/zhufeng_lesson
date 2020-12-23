<!--
 * @description: 
 * @author: steve.deng
 * @Date: 2020-12-21 17:16:24
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-23 17:20:52
-->
<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </div>
        <p @click="set">点击</p>
        {{ a }}
        <router-view />
    </div>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
<script>
export default {
    xxx: 'app',
    data: () => {
        return {
            a: 1
        };
    },
    mounted() {},
    methods: {
        set() {
            this.a = { n: 2222 };
        }
    }
};
</script>
