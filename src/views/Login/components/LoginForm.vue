<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Form } from '@/components/Form'
import { useI18n } from '@/hooks/web/useI18n'
import { ElButton, ElCheckbox, ElLink } from 'element-plus'
import { required } from '@/utils/formRules'

const { t } = useI18n()

const rules = {
  username: [required],
  password: [required]
}

const schema = reactive<FormSchema[]>([
  {
    field: 'username',
    label: t('login.username'),
    component: 'Input',
    colProps: {
      span: 24
    }
  },
  {
    field: 'password',
    label: t('login.password'),
    component: 'InputPassword',
    colProps: {
      span: 24
    },
    componentProps: {
      style: {
        width: '100%'
      }
    }
  },
  {
    field: 'tool',
    colProps: {
      span: 24
    }
  },
  {
    field: 'login',
    colProps: {
      span: 24
    }
  },
  {
    field: 'other',
    component: 'Divider',
    label: t('login.otherLogin'),
    componentProps: {
      contentPosition: 'center'
    }
  },
  {
    field: 'otherIcon',
    colProps: {
      span: 24
    }
  }
])

const iconSize = 30

const remember = ref(false)
</script>

<template>
  <Form
    :schema="schema"
    :rules="rules"
    label-position="top"
    hide-required-asterisk
    size="large"
    class="@2xl:max-w-500px @xl:max-w-400px"
  >
    <template #tool>
      <div class="flex justify-between items-center w-[100%]">
        <ElCheckbox v-model="remember" :label="t('login.remember')" size="small" />
        <ElLink type="primary" :underline="false">{{ t('login.forgetPassword') }}</ElLink>
      </div>
    </template>

    <template #login>
      <ElButton type="primary" class="w-[100%]">{{ t('login.login') }}</ElButton>
    </template>

    <template #otherIcon>
      <div class="flex justify-between w-[100%]">
        <Icon icon="ant-design:github-filled" :size="iconSize" class="cursor-pointer" />
        <Icon icon="ant-design:wechat-filled" :size="iconSize" class="cursor-pointer" />
        <Icon icon="ant-design:alipay-circle-filled" :size="iconSize" class="cursor-pointer" />
        <Icon icon="ant-design:weibo-circle-filled" :size="iconSize" class="cursor-pointer" />
      </div>
    </template>
  </Form>
</template>