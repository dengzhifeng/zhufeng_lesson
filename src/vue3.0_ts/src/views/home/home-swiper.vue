<!--
 * @description:
 * @author: steve.deng
 * @Date: 2020-11-22 11:54:26
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-11-23 17:57:19
-->
<template>
    <van-swipe v-if="sliderList.length">
        <van-swipe-item v-for="item in sliderList" :key="item.url">
            <img :src="item.url" alt="" />
        </van-swipe-item>
    </van-swipe>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { IGlobalState } from '../../store';
import * as Types from '../../store/action-types';
export default defineComponent({
    async setup() {
        // 页面一加载就要获取数据
        let store = useStore<IGlobalState>();
        let sliderList = computed(() => store.state.home.sliders);
        // 缓存 如果没有再获取
        if (sliderList.value.length == 0) {
            await store.dispatch(`home/${Types.SET_SLIDER_LIST}`);
        }
        return {
            sliderList
        };
    }
});
</script>

<style></style>
