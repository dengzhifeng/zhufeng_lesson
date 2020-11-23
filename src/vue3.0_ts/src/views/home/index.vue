<!--
 * @description:
 * @author: steve.deng
 * @Date: 2020-11-20 17:43:05
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-11-23 15:12:44
-->
<template>
    <div class="home">
        {{ category }}
        <!-- 首页头部 -->
        <HomeHeader
            :category="category"
            @setCurrentCategory="setCurrentCategory"
        />
        <!-- 轮播图 -->
        <HomeSwiper />
        <!-- 课程列表 -->
        <HomeList />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import HomeHeader from './home-header.vue';
import HomeList from './home-list.vue';
import HomeSwiper from './home-swiper.vue';
import { useStore, Store } from 'vuex';
import { IGlobalState } from '../../store';
import { CATEGORY_TYPES } from '../../typings/home';
import * as Types from '../../store/action-types';

// 专门为修改分类使用的options api
function useCategoty(store: Store<IGlobalState>) {
    let category = computed(() => store.state.home.currentCategory); // vuex中的状态
    function setCurrentCategory(category: CATEGORY_TYPES) {
        store.commit(`home/${Types.SET_CATEGORY}`, category);
    }
    return {
        category,
        setCurrentCategory
    };
}

export default defineComponent({
    components: {
        HomeHeader,
        HomeList,
        HomeSwiper
    },
    setup(props, context) {
        let store = useStore<IGlobalState>(); // 获取一个store
        let { category, setCurrentCategory } = useCategoty(store);
        return {
            category,
            setCurrentCategory
        };
    }
});
</script>
