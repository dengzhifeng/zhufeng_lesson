<!--
 * @description:
 * @author: steve.deng
 * @Date: 2020-11-20 17:43:05
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-11-22 22:53:04
-->
<template>
    <div class="home">
        {{category}}
        <!-- 首页头部 -->
        <HomeHeader/>
        <!-- 轮播图 -->
        <HomeSwiper/>
        <!-- 课程列表 -->
        <HomeList/>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import HomeHeader from './home-header.vue'
import HomeList from './home-list.vue'
import HomeSwiper from './home-swiper.vue'
import { useStore } from 'vuex';
import { IGlobalState } from '../../store';
export default defineComponent({
    components: {
        HomeHeader,
        HomeList,
        HomeSwiper
    },
    setup(props, context){
        let store = useStore<IGlobalState>()
        let category = computed(() => {
            return store.state.home.currentCategory
        })
        return {
            category
        }
    }
});
</script>
