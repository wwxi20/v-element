<template>
    <div class="el-form-item">
        <label class="el-form-item__label">
            <slot name="label" :label="label">
                {{ label }}
            </slot>
        </label>
        <div class="el-form-item__content">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { FormItemProps } from './types'
defineOptions({
    name: 'ElFormItem'
})
defineProps<FormItemProps>()
</script>