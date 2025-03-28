<template>
    <div class="el-dropdown">
        <Tooltip ref="tooltipRef" :trigger="trigger" :placement="placement" :popper-options="popperOptions"
            :open-delay="openDelay" :close-delay="closeDelay" :manual="manual" @visible-change="visibleChange">
            <slot></slot>
            <template #content>
                <ul class="el-dropdown__menu">
                    <template v-for="item in menuOptions" :key="item.key">
                        <li v-if="item.divided" role="separator" class="divided-placeholder"></li>
                        <li :id="`dropdown-item-${item.key}`" class="el-dropdown__item"
                            :class="{ 'is-disabled': item.disabled, 'is-divided': item.divided }"
                            @click="itemClick(item)">
                            <!-- {{ item.label }} -->
                            <RenderVNode :v-node="item.label" />
                        </li>
                    </template>
                </ul>
            </template>
        </Tooltip>
    </div>
</template>

<script setup lang="ts">
import type { DropdownProps, DropdownEmits, DropdownInstance, MenuOption } from './types';
import type { TooltipInstance } from '../Tooltip/types';
import Tooltip from '../Tooltip/Tooltip.vue';
import { ref } from 'vue'
import type { Ref } from 'vue'
import RenderVNode from '../Common/RenderVnode'

const props = withDefaults(defineProps<DropdownProps>(), { hideAfterClick: true })
const emits = defineEmits<DropdownEmits>()
const tooltipRef = ref() as Ref<TooltipInstance>
const visibleChange = (e: boolean) => {
    emits('visible-change', e)
}
const itemClick = (e: MenuOption) => {
    if (e.disabled) {
        return
    }
    emits('select', e)
    if (props.hideAfterClick) {
        tooltipRef.value.hide()
    }
}
defineExpose<DropdownInstance>({
    show: () => tooltipRef.value?.show(),
    hide: () => tooltipRef.value?.hide()
})
</script>