<!--
 * @description:
 * @author: steve.deng
 * @Date: 2020-11-20 17:43:05
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-11-26 09:55:23
-->
<template>
    <div class="home">
        <!-- 首页头部 -->
        <HomeHeader
            :category="category"
            @setCurrentCategory="setCurrentCategory"
        />
        <!-- 轮播图 -->
        <div ref="refreshElm">
            <Suspense>
                <template #default>
                    <HomeSwiper></HomeSwiper>
                </template>
                <template #fallback>
                    <div>loading...</div>
                </template>
            </Suspense>

            <!-- 课程列表 -->
            <HomeList :lessonList="lessonList"></HomeList>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from 'vue';
import HomeHeader from './home-header.vue';
import HomeList from './home-list.vue';
import HomeSwiper from './home-swiper.vue';
import { useStore, Store } from 'vuex';
import { IGlobalState } from '../../store';
import { CATEGORY_TYPES } from '../../typings/home';
import * as Types from '../../store/action-types';
import { useLoadMore } from '../../hooks/useLoadMore';
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

function useLessonList(store: Store<IGlobalState>) {
    const lessonList = computed(() => {
        return store.state.home.lessons.list;
    });
    onMounted(() => {
        if (lessonList.value.length == 0) {
            store.dispatch(`home/${Types.SET_LESSON_LIST}`);
        }
    });
    return {
        lessonList
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
        // 课程获取
        let { lessonList } = useLessonList(store);
        console.log('lessonList', lessonList.value);

        // DOM节点
        const refreshElm = ref<null | HTMLElement>(null);

        // const { isLoading, haseMore } = useLoadMore(
        //     refreshElm,
        //     store,
        //     `home/${Types.SET_LESSON_LIST}`
        // );
        return {
            category,
            setCurrentCategory,
            lessonList,
            refreshElm
        };
    }
});
</script>
<style lang="scss">
.home {
    position: absolute;
    top: 65px;
    bottom: 50px;
    width: 100%;
    overflow-y: auto;
}
</style>
