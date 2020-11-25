<!--
 * @description:
 * @author: steve.deng
 * @Date: 2020-11-22 11:54:36
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-11-25 17:52:02
-->
<template>
    <div>
        <van-card
            v-for="(item, index) in lessonList"
            :key="index"
            :price="item.price"
            :title="item.title"
            :thumb="item.poster"
        >
            <template #tags>
                <van-tag plain type="danger">{{
                    formatCategory(item.category)
                }}</van-tag>
            </template>
        </van-card>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ILesson } from '../../typings/home';
export default defineComponent({
    props: {
        lessonList: {
            type: Array as PropType<ILesson[]>
        }
    },
    setup() {
        function formatCategory(type: number) {
            switch (type) {
                case 0: {
                    return 'react课程';
                }
                case 1: {
                    return 'node课程';
                }
                default: {
                    return '其他课程';
                }
            }
        }
        return {
            formatCategory
        };
    }
});
</script>

<style></style>
