<template>
    <button ref="_ref" class="el-button" :class="{
        [`el-button--${type}`]: type,
        [`el-button--${size}`]: size,

        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
        'is-disabled': disabled,
        'is-loading': loading,
    }" :disabled="disabled || loading" :autofocus="autofocus" :type="nativeType">
        <Icon icon="spinner" spin v-if="loading" />
        <Icon :icon="icon" v-if="icon" />
        <span>
            <slot></slot>
        </span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'ELButton'
})
</script>

<script setup lang="ts">
import { ref } from 'vue';
import Icon from '../Icon/Icon.vue'
import type { ButtonProps } from './types';

withDefaults(defineProps<ButtonProps>(), {
    nativeType: 'button'
})
// 暴露
const _ref = ref<HTMLButtonElement>()
defineExpose({
    ref: _ref
})
</script>

<style>
.el-button {
    background-color: var(--main-bg-color);
}
</style>