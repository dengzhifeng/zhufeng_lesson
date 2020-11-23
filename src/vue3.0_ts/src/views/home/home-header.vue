<!--
 * @description:
 * @author: steve.deng
 * @Date: 2020-11-22 11:54:18
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-11-23 17:18:22
-->
<template>
    <div class="home-header">
        <img src="@/assets/logo.png" />
        <van-dropdown-menu>
            <van-dropdown-item
                :modelValue="category"
                :options="options"
                @change="change"
            />
        </van-dropdown-menu>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from 'vue';
import { CATEGORY_TYPES } from '../../typings/home';

export default defineComponent({
    props: {
        category: {
            type: Number as PropType<CATEGORY_TYPES> // 类型断言
        }
    },
    emits: ['setCurrentCategory'], // 为了提示作用的
    setup(props, context) {
        let state = reactive({
            options: [
                { text: '全部课程', value: CATEGORY_TYPES.ALL },
                { text: 'react课程', value: CATEGORY_TYPES.REACT },
                { text: 'vue课程', value: CATEGORY_TYPES.VUE },
                { text: 'node课程', value: CATEGORY_TYPES.NODE }
            ]
        });
        function change(value: CATEGORY_TYPES) {
            context.emit('setCurrentCategory', value);
        }
        return {
            ...toRefs(state), //在模板中就可以直接使用属性，不用state.XXX  把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref ，和响应式对象 property 一一对应。
            change
        };
        // props.category;
        // context.emit("setCurrentCategory")
    }
});
</script>

<style lang="scss">
.home-header {
    height: 65px;
    background: #222222;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2.5%;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    img {
        height: 50px;
    }
    .van-dropdown-menu__title {
        color: #ffffff;
    }
    .van-dropdown-menu__item {
        background: #222222;
    }
}
</style>
