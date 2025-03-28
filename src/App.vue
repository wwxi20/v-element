<script setup lang="ts">
import { ref, onMounted, h } from 'vue';
import type { ButtonInstance } from '@/components/Button/types'
import type { TooltipInstance } from './components/Tooltip/types';
import type { Options } from '@popperjs/core';

import Button from './components/Button/button.vue'
import Collapse from './components/Collapse/Collapse.vue';
import Item from './components/Collapse/CollapseItem.vue'
import Icon from './components/Icon/Icon.vue'
import Tooltip from './components/Tooltip/Tooltip.vue';
import Dropdown from './components/Dropdown/Dropdown.vue';
import Message from './components/Message/Message.vue';
import Input from './components/Input/Input.vue'
import Switch from './components/Switch/Switch.vue';
import Form from './components/Form/Form.vue';
import FormItem from './components/Form/FormItem.vue';

import type { MenuOption } from './components/Dropdown/types';
import { createMessage } from './components/Message/method'

const buttonRef = ref<ButtonInstance | null>(null)
const openedValue = ref(['1'])
const trigger = ref<any>('click')
const tooltipRef = ref<TooltipInstance | null>(null)
const test = ref<any>('right');



const open = () => {
  tooltipRef.value?.show()
}
const close = () => {
  tooltipRef.value?.hide()
}
onMounted(() => {
  const instance = createMessage({ message: 'hello 1', showClose: true })
  createMessage({ message: 'hello world 2 ', duration: 0, showClose: true, type: "success" })
  createMessage({ message: 'hello world again 3', duration: 0, type: "danger" })

  if (buttonRef.value) {
    console.log(buttonRef.value.ref);
  }
  setTimeout(() => {
    // instance.destroy()
  }, 2000)
})

// const options: Partial<Options> = { placement: 'right-end', strategy: 'fixed' }
const options: MenuOption[] = [
  { key: 1, label: h('b', 'this is bold') },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' }

]
</script>

<template>
  {{ '图标：' }}
  <Icon icon="arrow-up" size="2xl" type="danger" color="#000" /><br>
  {{ 'button测试：' }}
  <Button type="primary" plain ref="buttonRef"> Test Button</Button>
  <Button plain> plain button</Button>
  <Button round> round button</Button>
  <Button circle> el</Button>
  <Button disabled>disabled button</Button><br />
  <Button type="primary">primary</Button>
  <Button type='success'>success</Button>
  <Button type='info'>info</Button>
  <Button type='warning'>warning</Button>
  <Button type='danger'>danger</Button><br />
  <Button type='primary' plain>primary</Button>
  <Button type='success' plain>success</Button>
  <Button type='info' plain>info</Button>
  <Button type='warning' plain>warning</Button>
  <Button type='danger' plain>danger</Button><br>
  <Button size="large">large</Button>
  <Button size="small">small</Button><br>
  <Button size="large" loading>loading</Button>
  <Button size="large" icon="arrow-up">Up</Button>

  <br><br>
  {{ "折叠面板：" }}
  <Collapse v-model="openedValue" accordion>
    <Item name="a">
      <template #title>
        <h1>nice title</h1>
      </template>
      <h1>headline title</h1>
      <div>this is content a aaa</div>
    </Item>
    <Item name="b" title="nice title b item b">
      <div>this is bbbbb test</div>
    </Item>
    <Item name="c" title="nice cccc" disabled>
      <div>this is cccc test</div>
    </Item>
  </Collapse>
  <br><br>
  {{ '文字提示：' }}
  <!-- 用header包裹起来 -->
  <header>
    <Tooltip placement="right" :trigger="trigger" ref="tooltipRef" :open-delay=1000 :close-delay=1000>
      <img src="./assets/logo.svg" alt="" width="125" height="125">
      <template #content>
        <h1>Hello Tooltip</h1>
      </template>
    </Tooltip>
  </header>
  <Button plain @click="open"> open</Button>
  <Button plain @click="close"> close</Button>
  <br><br>
  {{ '下拉菜单：' }}
  <header>
    <Dropdown :menu-options="options" placement="right" :trigger="trigger">
      <img src="./assets/logo.svg" alt="" width="125" height="125">

    </Dropdown>
  </header>
  <br><br>
  {{ '输入框：' }}
  <Input v-model="test" placeholder="基础文本框，请输入" />
  <span>{{ test }}</span>
  <br>
  <br>
  <Input v-model="test" clearable placeholder="输入字符以后可以点击清空" />
  <br>
  <br>

  <Input v-model="test" placeholder="prepend append">
  <template #prepend>Https://</template>
  <template #append>.com</template>
  </Input>
  <br>
  <br>

  <Input v-model="test" placeholder="prefix suffix">
  <template #prefix>
    <Icon icon="fa-user" />
  </template>
  <template #suffix>
    <Icon icon="fa-user" />
  </template>
  </Input>
  <br><br><br>
  {{ '开关：' }}
  <Switch v-model="test"></Switch>
  <br><br>
  <Switch v-model="test" active-value="right" inactive-value="wrong" activeText="ON" inactiveText="OFF" />
  <br><br><br>
  {{ '表单：' }}
  <br>
  <div>
    <Form>
      <FormItem label="the email">
        <Input v-model="test"></Input>
      </FormItem>
      <FormItem label="the password">
        <template #label="{ label }">
          <Button>{{ label }}</Button>
        </template>
        <Input v-model="test" type="password"></Input>
      </FormItem>
      <div>
        <Button type="primary">Submit</Button>
        <Button>Reset</Button>
      </div>
    </Form>
  </div>

</template>

<style scoped></style>
