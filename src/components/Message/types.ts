import type { ComponentInternalInstance, VNode } from 'vue'
export interface MessageProps {
    message?: string | VNode
    duration?: number
    showClose?: boolean
    type?: 'success' | 'info' | 'warning' | 'danger'
    onDestroy: () => void
    offset?: number
    id: string
    zIndex: number
    transitionName?: string
}
export interface MessageContext {
    id: string
    vNode: VNode
    vm: ComponentInternalInstance
    props: MessageProps
    destroy: () => void
}
export type CreateMessageProps = Omit<MessageProps, 'onDestroy' | 'id' | 'zIndex'>
