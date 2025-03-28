<template>
    <div class="el-tooltip" ref="popperContainerNode" v-on="outerEvents">
        <div class="el-tooltip__trigger" ref="triggerNode" v-on="events">
            <slot></slot>
        </div>
        <transition :name="transition">
            <div v-if="isOpen" class="el-tooltip__popper" ref="popperNode">
                <slot name="content">{{ content }}</slot>
                <div id="arrow" data-popper-arrow></div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import type { TooltipProps, TooltipEmits, TooltipInstance } from './types';
import type { Instance } from '@popperjs/core'
import { createPopper } from '@popperjs/core'
import { ref, reactive, watch, onUnmounted, computed } from 'vue'
import useClickOutside from '../../hooks/useClickOutside'
import { debounce } from 'lodash-es'

const props = withDefaults(defineProps<TooltipProps>(), {
    placement: 'bottom',
    trigger: 'hover',
    transition: 'fade',
    openDelay: 0,
    closeDelay: 0
})
const emits = defineEmits<TooltipEmits>()
const isOpen = ref(false)
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const popperContainerNode = ref<HTMLElement>()

let popperInstance: null | Instance = null
let events: Record<string, any> = reactive(({}))
let outerEvents: Record<string, any> = reactive(({}))

const popperOptions = computed(() => {
    return {
        placement: props.placement,
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 9],
                },
            }
        ],
        ...props.popperOptions
    }
})

const open = () => {

    isOpen.value = true
    emits('visible-change', true)


}
const close = () => {

    isOpen.value = false
    emits('visible-change', false)


}
const openDebounce = debounce(open, props.openDelay)
const closeDebounce = debounce(close, props.closeDelay)

const openFinal = () => {
    closeDebounce.cancel()
    openDebounce()
}
const closeFinal = () => {
    openDebounce.cancel()
    closeDebounce()
}
const togglePopper = () => {
    if (isOpen.value) {
        closeFinal()
    } else { openFinal() }
}



useClickOutside(popperContainerNode, () => {
    if (props.trigger === 'click' && isOpen.value && !props.manual) {
        close()
    }
})
const attachEvents = () => {
    if (props.trigger === 'hover') {
        events['mouseenter'] = openDebounce
        outerEvents['mouseleave'] = closeDebounce

    } else if (props.trigger === 'click') {
        events['click'] = togglePopper
    }
}

if (!props.manual) {
    attachEvents()
}
watch(() => props.manual, (isManual) => {
    if (isManual) {
        events = {}
        outerEvents = {}
    } else {
        attachEvents()
    }
})
watch(() => props.trigger, (newTrigger, oldTrigger) => {
    if (newTrigger !== oldTrigger) {
        events = {}
        outerEvents = {}
        attachEvents()
    }
})
watch(isOpen, (newValue) => {
    if (newValue) {
        if (triggerNode.value && popperNode.value) {
            popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
        } else {
            popperInstance?.destroy()
        }
    }
}, { flush: 'post' })
onUnmounted(() => {
    popperInstance?.destroy()
})
defineExpose<TooltipInstance>({
    'show': openDebounce,
    'hide': closeDebounce
})
</script>

<style>
/* 在 Tooltip.vue 的 <style> 中 */
.el-tooltip {
    position: relative;
    /* 创建定位上下文 */
    display: inline-block;
    /* 防止宽度被拉伸 */
}

/* .el-tooltip__popper>* {
    margin-bottom: 0;
    /* 重置所有直接子元素的下边距 */
/*} 
*/
</style>