<script setup lang="ts">
import { ref } from 'vue'
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import {
  ElUpload,
  ElIcon,
  ElImage,
  ElButton,
  ElDivider,
  ElTable,
  ElTableColumn,
  ElMessage
} from 'element-plus'
import type { UploadFile } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const { t } = useI18n()
const result = ref('')
const imageUrl = ref('')
const baseUrl = import.meta.env.VITE_BASE_URL

const uploadUrl = baseUrl + '/api/img-detection'
const uploadSuccess = (response: any, uploadFile: UploadFile, uploadFiles: any) => {
  if (response.code === '0000') {
    ElMessage({
      message: '检查结束！',
      type: 'success'
    })
    result.value = response.data.result
    imageUrl.value = response.data.url
  } else {
    ElMessage({
      message: response.message,
      type: 'error'
    })
  }
}
const uploadError = (response: any, uploadFile: UploadFile, uploadFiles: any) => {
  ElMessage({
    message: '上传失败！',
    type: 'error'
  })
}
const handlerChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  ElMessage({
    message: '开始检查！',
    type: 'success'
  })
}
</script>

<template>
  <ContentWrap :title="t('ImgDetection.title')" class="ac_coupon-wrap">
    <div class="ac_coupon-pic">
      <div class="pic-content shadow">
        <div class="pic shadow">
          <ElUpload
            :action="uploadUrl"
            :on-error="uploadError"
            :on-success="uploadSuccess"
            :on-change="handlerChange"
            :show-file-list="false"
          >
            <ElImage v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </ElUpload>
        </div>
        <div class="pic shadow center">
          <div style="display: flex; align-items: center; justify-content: center; height: 380px">
            <span class="title">结果: {{ result }}</span>
          </div>
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
.title {
  font-size: x-large;
}
.ac_coupon-wrap {
  height: 1150px;
  //padding-top: 15.16%;
  position: relative;
  .ac_coupon-pic {
    width: 75%;
    height: 450px;
    margin: auto;

    .pic-content {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      .pic {
        margin: 30px;
        width: 400px;
        height: 380px;
        display: inline-block;

        .demonstration {
          display: block;
          color: #fff;
          background-color: var(--top-header-bg-color);
          font-size: 20px;
          margin-bottom: 20px;
          text-align: center;
        }
      }
    }
  }
}

.el-upload {
  height: 380px;
  width: 400px;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 400px;
  height: 380px;
  text-align: center;
}
</style>
