import { render, h, shallowReactive } from 'vue'
import type { CreateMessageProps, MessageContext } from './types'
import MessageConstructor from './Message.vue'
import useZIndex from '../../hooks/useZIndex'

let seed = 1
const instances: MessageContext[] = shallowReactive([]) // 响应式  否则无法获取最后一个的位置  优化为 浅层级
export const createMessage = (props: CreateMessageProps) => {
    const { nextZIndex } = useZIndex()
    const id = `message_${seed++}`
    const container = document.createElement('div')
    const destroy = () => {
        const idx = instances.findIndex((ins) => ins.id === id)
        if (idx === -1) return
        instances.splice(idx, 1)
        render(null, container)
    }
    // 手动调用删除，其实就是手动的调整组件中 visible 的值
    // visible 是通过 expose 传出来的
    const manualDestroy = () => {
        const instance = instances.find((instance) => instance.id === id)
        if (instance) {
            instance.vm.exposed!.visible.value = false
        }
    }
    const newProps = {
        ...props,
        id,
        zIndex: nextZIndex(),
        onDestroy: destroy
    }
    const vNode = h(MessageConstructor, newProps)
    render(vNode, container)
    document.body.appendChild(container.firstElementChild!) // 非空断言操作符
    const vm = vNode.component!
    const instance = {
        id,
        vNode,
        vm,
        props: newProps,
        destroy: manualDestroy
    }
    instances.push(instance)
    return instance
}

export const getLastInstance = () => {
    return instances[instances.length - 1]
}

// 计算
export const getLastBottomOffset = (id: string) => {
    const idx = instances.findIndex((ins) => {
        return ins.id === id
    })
    if (idx <= 0) {
        return 0
    } else {
        const prev = instances[idx - 1]
        return prev.vm.exposed!.bottomOffset.value
    }
}

export const closeAll = () => {
    instances.forEach((instance) => {
        instance.destroy()
    })
}
