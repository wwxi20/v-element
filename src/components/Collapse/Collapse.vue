<template>
    <div class="el-collapse">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { ref, provide, watch } from 'vue'; // provide inject是什么东西？？
import type { NameType, CollapseProps, CollapseEmits } from './types'
import { collapseContextKey } from './types'
defineOptions({
    name: 'ELCollapse'
})
const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()
const activeNames = ref<NameType[]>(props.modelValue)

// 监听更新 props传递给本地的ref
watch(() => props.modelValue, () => {
    activeNames.value = props.modelValue
})

if (props.accordion && activeNames.value.length > 1) {
    // 手风琴特效要求 只能有一个
    console.warn('accordion mode should only have one active item')
}
const handleItemClick = (item: NameType) => {
    if (props.accordion) {
        activeNames.value = [activeNames.value[0] === item ? '' : item]
    } else {


        const index = activeNames.value.indexOf(item)// 是否在数组中
        if (index > -1) {
            activeNames.value.splice(index, 1)
        } else {
            activeNames.value.push(item)
        }
    }
    emits('update:modelValue', activeNames.value)
    emits('change', activeNames.value)

}
provide(collapseContextKey, {
    activeNames,
    handleItemClick
})
</script>