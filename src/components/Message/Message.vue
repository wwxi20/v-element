<template>
    <!-- js钩子 监听transition组件 -->
    <Transition :name="transitionName" @after-leave="destroyComponent" @enter="updateHeight">

        <div class="el-message" v-show="visible" :class="{
            [`el-message--${type}`]: type,
            'is-close': showClose
        }" role="alert" ref="messageRef" :style="cssStyle" @mouseenter="clearTimer" @mouseleave="startTimer">
            <div class="el-message__content">
                <slot>
                    <RenderVNode :vNode="message" v-if="message"></RenderVNode>
                </slot>

            </div>
            <div class="el-message__close" v-if="showClose">
                <Icon @click.stop="visible = false" icon="xmark" />
            </div>
        </div>
    </Transition>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import type { MessageProps } from './types'
import RenderVNode from '../Common/RenderVnode';
import Icon from '../Icon/Icon.vue';
import { getLastInstance, getLastBottomOffset } from './method';
import useEventListener from '../../hooks/useEventListener'
import { top } from '@popperjs/core';
const props = withDefaults(defineProps<MessageProps>(), {
    type: 'info',
    duration: 3000,
    offset: 20,
    transitionName: 'fade-up'
})
const visible = ref(false)

const messageRef = ref<null | HTMLDivElement>()

/* 计算 div 的偏移高度 */
const height = ref(0)
// 上一个实例的最下面的坐标数字，第一个是 0
const lastOffset = computed(() => getLastBottomOffset(props.id))
// 这个元素应该使用的 top
const topOffset = computed(() => props.offset + lastOffset.value)
// 这个元素为下一个元素预留的 offset，也就是它最低端 bottom 的 值
const bottomOffset = computed(() => height.value + topOffset.value)
const cssStyle = computed(() => ({
    top: `${topOffset.value}px`,
    zIndex: props.zIndex
}))

// let timer: NodeJS.Timeout   鼠标移入时停止计时  失败
let timer: any
function startTimer() {
    if (props.duration === 0) return
    timer = setTimeout(() => {
        visible.value = false
    }, props.duration)
    console.log("startTimer------timer::", timer)

}
function clearTimer() {
    clearTimeout(timer)
    console.log("clearTimer-------timer::", timer)
}
onMounted(async () => {
    visible.value = true
    startTimer()
    console.log("onMounted-------timer::", timer)

    // await nextTick()
    // height.value = messageRef.value!.getBoundingClientRect().height
})
function keydown(e: Event) {
    const event = e as KeyboardEvent
    if (event.code === 'Escape') {
        visible.value = false
    }
}
// watch(visible, (newValue) => {
//   if (!newValue) {
//     props.onDestroy()
//   }
// })
useEventListener(document, 'keydown', keydown)
function destroyComponent() {
    props.onDestroy()
}
function updateHeight() {
    height.value = messageRef.value!.getBoundingClientRect().height
}
defineExpose({
    bottomOffset,
    visible
})

</script>
<style>
.el-message {
    width: max-content;
    position: fixed;
    left: 50%;
    top: 20px;
    transform: translateX(-50%);
    border: 1px solid blue;
}
</style>
