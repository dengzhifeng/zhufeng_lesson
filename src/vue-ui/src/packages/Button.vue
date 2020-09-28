<template>
  <button class='zh-button-success'>
    <span v-if="this.$slots.default">
      <slot></slot>
    </span>
  </button>
</template>
<script>
export default {
  name: 'zhu-button',
  props: {
    type: {
      type: string,
      default: '',
      validator(type) {
        if (type && !['warning','success','danger', 'info','primary'].includes(type)) {
          console.error('type类型必须为' + ['warning','success','danger', 'info','primary'].join('、'));
        }
        return true
      }
    }
  },
  computed: {

  },
}
</script>
<style>
@import '../styles/common.scss';
</style>
