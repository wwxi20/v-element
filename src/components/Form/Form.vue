<template>
    <form class="el-form">
        <slot></slot>
    </form>
</template>

<script setup lang="ts">
import { provide } from 'vue';
import type { ValidateFieldsError } from 'async-validator'
import type { FormContext, FormItemContext, FormProps, FormValidateFailure, FormInstance } from './types';
import { formContextKey } from './types';
import { faFilterCircleXmark } from '@fortawesome/free-solid-svg-icons';
const props = defineProps<FormProps>()
defineOptions({
    name: 'ElForm'
})
const fields: FormItemContext[] = []
const addField: FormContext['addField'] = (field) => {
    fields.push(field)
}
const removeField: FormContext['removeField'] = (field) => {
    if (field.prop) {
        fields.slice(fields.indexOf(field), 1)
    }
}
const validate = async () => {
    let validationErrors: ValidateFieldsError = {}
    console.log(fields)
    for (const field of fields) {
        try {
            await field.validate('')
        } catch (e) {
            const error = e as FormValidateFailure
            validationErrors = {
                ...validationErrors,
                ...error.fields
            }
        }
    }
    if (Object.keys(validationErrors).length === 0) return true
    return Promise.reject(validationErrors)
}
const resetFields = (keys: string[] = []) => { // keys 的类型为字符串数组    = []参数的 默认值 为空数组
    const filterArr = keys.length > 0 ? fields.filter(field => keys.includes(field.prop)) : fields
    filterArr.forEach(field => field.resetField())
}
const clearValidate = (keys: string[] = []) => {
    const filterArr = keys.length > 0 ? fields.filter(field => keys.includes(field.prop)) : fields
    filterArr.forEach(field => field.clearValidate())
}

provide(formContextKey, {
    ...props,
    addField,
    removeField
})
defineExpose<FormInstance>({
    validate,
    clearValidate,
    resetFields,
})
</script>