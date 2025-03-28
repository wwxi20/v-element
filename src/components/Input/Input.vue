<template>
    <div class="el-input" :class="{
        [`el-input--${type}`]: type,
        [`el-input--${size}`]: size,
        'is-disabled': disabled,
        'is-prepend': $slots.prepend,
        'is-append': $slots.append,
        'is-prefix': $slots.prefix,
        'is-suffix': $slots.suffix,
        'is-focus': isFocus,
    }">
        <!-- input -->
        <template v-if="type !== 'textarea'">
            <!-- prepend slot -->
            <div v-if="$slots.prepend" class="el-input__prepend">
                <slot name="prepend"></slot>
            </div>
            <div class="el-input__wrapper">
                <!-- prefix -->
                <span v-if="$slots.prefix" class="el-input__prefix">
                    <slot name="prefix"></slot>
                </span>
                <input class="el-input__inner" :type="showPassword ? (passwordVisable ? 'text' : 'password') : type"
                    ref="inputRef" v-bind="attrs" :disabled="disabled" :readonly="readonly" :autocomplete="autocomplete"
                    :placeholder="placeholder" :autofocus="autofocus" :form="form" v-model="innerValue"
                    @input="handleInput" @focus="handleFocus" @blur="handleBlur" @change="handleChange">
                <!-- suffix -->
                <span v-if="$slots.suffix || showClear || showPasswordArea" class="el-input__suffix" @click="keepFocus">
                    <slot name="suffix">
                        <Icon icon="circle-xmark" v-if="showClear" class="el-input__clear" @click="clear"
                            @mousedown.prevent="NOOP"></Icon>
                        <Icon icon="eye" v-if="showPasswordArea && passwordVisable" class="el-input__password"
                            @click="togglePasswordVisble"></Icon>
                        <Icon icon="eye-slash" v-if="showPasswordArea && !passwordVisable" class="el-input__password"
                            @click="togglePasswordVisble">
                        </Icon>


                    </slot>
                </span>
            </div>
            <!-- append -->
            <div v-if="$slots.append" class="el-input__append">
                <slot name="append"></slot>
            </div>
        </template>
        <!-- textarea -->
        <template v-else>
            <textarea class="vk-textarea__wrapper" v-bind="attrs" :disabled="disabled" v-model="innerValue"
                ref="inputRef" :readonly="readonly" :autocomplete="autocomplete" :placeholder="placeholder"
                :autofocus="autofocus" :form="form" @input="handleInput" @focus="handleFocus" @blur="handleBlur"
                @change="handleChange"></textarea>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, useAttrs, nextTick } from 'vue'
import type { Ref } from 'vue';
import type { InputProps, InputEmits } from './types';
import Icon from '../Icon/Icon.vue'

defineOptions({
    name: 'ElInput',
    inheritAttrs: false
})
const props = withDefaults(defineProps<InputProps>(), { type: 'text', autocomplete: 'off' })
const emits = defineEmits<InputEmits>()
const attrs = useAttrs()
const innerValue = ref(props.modelValue)
const isFocus = ref(false)
const passwordVisable = ref(false)
const inputRef = ref() as Ref<HTMLInputElement>

const showClear = computed(() => {
    return props.clearable && !props.disabled && !!innerValue.value && isFocus.value
})
const showPasswordArea = computed(() =>
    props.showPassword && !props.disabled && !!innerValue.value
)
const togglePasswordVisble = () => {
    passwordVisable.value = !passwordVisable.value
}
// 空
const NOOP = () => { }
// 密码框优化
const keepFocus = async () => {
    await nextTick()
    inputRef.value.focus()
}
const handleInput = () => {
    emits('update:modelValue', innerValue.value)
    emits('input', innerValue.value)
}
const handleChange = () => {
    emits('change', innerValue.value)
}
const handleFocus = (event: FocusEvent) => {
    isFocus.value = true
    emits('focus', event)
}
const handleBlur = (event: FocusEvent) => {
    isFocus.value = false
    emits('blur', event)

}
const clear = () => {
    innerValue.value = ''
    emits('update:modelValue', '')
    emits('clear')
    emits('input', '')
    emits('change', '')
}
watch(() => props.modelValue, (newValue) => {
    innerValue.value = newValue
})

defineExpose({
    ref: inputRef
})
</script>
