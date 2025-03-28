<template>
    <i class="el-icon" :class="{ [`el-icon--${type}`]: type }" :style="customStyles" v-bind="$attrs">
        <font-awesome-icon v-bind="$props" />
    </i>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { IconProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
defineOptions({
    name: 'ELIcon',
    inheritAttrs: false // 停止透传到根组件i
})
const props = defineProps<IconProps>()
const customStyles = computed(() => {
    return props.color ? { color: props.color } : {}
})
</script>