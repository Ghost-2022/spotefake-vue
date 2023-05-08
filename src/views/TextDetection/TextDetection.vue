<script setup lang="ts">
import { reactive, ref, unref } from 'vue'
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { useValidator } from '@/hooks/web/useValidator'
import { FormSchema } from '@/types/form'
import { ElButton, ElMessage } from 'element-plus'
import { useForm } from '@/hooks/web/useForm'
import { Form } from '@/components/Form'
import { TextType } from '@/api/form/types'
import { textDetectionApi } from '@/api/form/index'

const { t } = useI18n()

const { required } = useValidator()
const loading = ref(false)
const result = ref('34523634')
const schema = reactive<FormSchema[]>([
  {
    field: 'text',
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      placeholder: t('TextDetection.textPlaceholder')
    }
  },
  {
    field: 'submit',
    colProps: {
      span: 24
    }
  }
])

const rules = {
  text: [required()]
}
const { register, elFormRef, methods } = useForm()

const submit = async () => {
  const formRef = unref(elFormRef)
  await formRef?.validate(async (isValid) => {
    if (isValid) {
      loading.value = true
      const { getFormData } = methods
      const formData = await getFormData<TextType>()

      try {
        loading.value = true
        const res = await textDetectionApi(formData)
        if (res.code == '0000') {
          result.value = res.data
        } else {
          ElMessage({
            message: res.message,
            type: 'error'
          })
        }
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<template>
  <ContentWrap :title="t('TextDetection.title')" class="ac_coupon-wrap">
    <div class="ac_coupon-pic">
      <div class="content shadow">
        <Form
          :schema="schema"
          :rules="rules"
          label-position="top"
          hide-required-asterisk
          size="large"
          class="dark:(border-1 border-[var(--el-border-color)] border-solid)"
          @register="register"
          labelWidth="200px"
        >
          <template #submit>
            <ElButton :loading="loading" type="primary" class="w-[100%]" @click="submit">
              {{ t('TextDetection.submit') }}
            </ElButton>
          </template>
        </Form>
        <div class="result">
          <span class="title">结果: </span>
          <span class="content">{{ result }}</span>
        </div>
      </div>
    </div>
  </ContentWrap>
</template>

<style scoped lang="less">
.shadow {
  background-color: #ffffff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
.center {
  display: flex;
  align-items: center;
}

.result {
  width: 314px;

  .title {
    font-size: x-large;
  }
}

.ac_coupon-wrap {
  height: 1150px;
  //padding-top: 15.16%;
  position: relative;
  .ac_coupon-pic {
    width: 75%;
    height: 450px;
    margin: auto;

    .content {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      padding-top: 20px;
    }
  }
}
</style>
