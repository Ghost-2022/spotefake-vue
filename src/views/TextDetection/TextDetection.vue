<script setup lang="ts">
import { reactive, ref, unref } from 'vue'
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { useValidator } from '@/hooks/web/useValidator'
import { FormSchema } from '@/types/form'
import { ElButton, ElMessage, ElUpload, ElIcon, ElProgress } from 'element-plus'
import { useForm } from '@/hooks/web/useForm'
import { Form } from '@/components/Form'
import { TextType } from '@/api/form/types'
import { textDetectionApi } from '@/api/form/index'
import { Plus } from '@element-plus/icons-vue'

const { t } = useI18n()

const { required } = useValidator()
const loading = ref(false)
const result = ref(0.0)
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
  }
])
const imageUrl = ref('')
const baseUrl = import.meta.env.VITE_BASE_URL

const uploadUrl = '/api/upload-file'

const uploadError = (response: any, uploadFile: UploadFile, uploadFiles: any) => {
  ElMessage({
    message: '上传失败！',
    type: 'error'
  })
}
const uploadSuccess = (response: any, uploadFile: UploadFile, uploadFiles: any) => {
  if (response.code === '0000') {
    ElMessage({
      message: '上传成功！',
      type: 'success'
    })
    imageUrl.value = response.data
  } else {
    ElMessage({
      message: response.message,
      type: 'error'
    })
  }
}
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
      let formData = await getFormData<TextType>()
      formData.img = imageUrl.value
      try {
        loading.value = true
        const res = await textDetectionApi(formData)
        if (res.code == '0000') {
          result.value = parseFloat((parseFloat(res.data) * 100).toFixed(2))
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
    <div class="ac_coupon-pic shadow">
      <div class="pic-content">
        <div class="pic shadow center">
          <ElUpload
            :action="uploadUrl"
            :on-error="uploadError"
            :on-success="uploadSuccess"
            :show-file-list="false"
          >
            <img v-if="imageUrl" :src="imageUrl" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </ElUpload>
        </div>
        <div class="pic shadow center">
          <Form
            :schema="schema"
            :rules="rules"
            label-position="top"
            hide-required-asterisk
            size="large"
            class="dark:(border-1 border-[var(--el-border-color)] border-solid)"
            @register="register"
            labelWidth="200px"
          />
        </div>
      </div>
      <div class="action center">
        <ElButton :loading="loading" type="primary" @click="submit">
          {{ t('TextDetection.submit') }}
        </ElButton>
      </div>
      <div v-if="result" class="action center">
        <ElProgress type="circle" :percentage="result" />
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
  justify-content: center;
}

.ac_coupon-wrap {
  height: 1150px;
  //padding-top: 15.16%;
  position: relative;
  .ac_coupon-pic {
    width: 75%;
    height: 800px;
    margin: auto;

    .pic-content {
      width: 100%;
      height: 450px;
      display: flex;
      justify-content: space-around;
      .pic {
        margin: 30px;
        width: 400px;
        height: 380px;
      }
    }

    .result-content {
      margin-top: 20px;
      width: 100%;
      height: 500px;
    }
  }
}
.action {
  height: 80px;
  margin-top: 20px;
}
.el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
