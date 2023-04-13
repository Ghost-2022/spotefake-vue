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
import { PictureFilled, Upload } from '@element-plus/icons-vue'
import { uploadImgApi } from '@/api/upload'

const { t } = useI18n()
const disabled = ref(false)
const imgUrl = ref('')
const resultUrl = ref('')
const image = ref(false)
const limit = ref(1)

const tableData = ref([])
const baseUrl = import.meta.env.VITE_BASE_URL

const uploadUrl = baseUrl + '/api/identify'
const uploadSuccess = (response: any, uploadFile: UploadFile, uploadFiles: any) => {
  imgUrl.value = baseUrl + response.data.imgUrl
  resultUrl.value = baseUrl + response.data.resultUrl
  tableData.value = response.data.tableData
}
const uploadError = (response: any, uploadFile: UploadFile, uploadFiles: any) => {
  ElMessage({
    message: '上传失败！',
    type: 'error'
  })
}
</script>

<template>
  <ContentWrap :title="t('ClassificationDemo.classification')" class="ac_coupon-wrap">
    <div class="ac_coupon-pic">
      <div class="pic-content shadow">
        <div class="pic shadow">
          <span class="demonstration">原始图片</span>
          <ElImage :src="imgUrl">
            <template #error>
              <div class="image-slot">
                <ElIcon><PictureFilled /></ElIcon>
              </div>
            </template>
          </ElImage>
        </div>
        <div class="pic shadow">
          <span class="demonstration">检查结果</span>
          <ElImage :src="resultUrl">
            <template #error>
              <div class="image-slot">
                <ElIcon><PictureFilled /></ElIcon>
              </div>
            </template>
          </ElImage>
        </div>
      </div>
      <div class="result-content shadow">
        <div class="action center">
          <span>检测目标</span>
          <ElUpload
            :action="uploadUrl"
            :on-error="uploadError"
            :on-success="uploadSuccess"
            :data="{ type: 'classification' }"
            :show-file-list="false"
          >
            <ElButton type="success"
              ><ElIcon><Upload style="color: #fff" /></ElIcon>点击上传</ElButton
            >
          </ElUpload>
        </div>
        <ElDivider />
        <div class="result">
          <span>检测结果</span>
          <ElTable :data="tableData" border style="width: auto">
            <ElTableColumn prop="className" label="目标类别" />
            <ElTableColumn prop="size" label="目标大小" />
            <ElTableColumn prop="probability" label="置信度" />
          </ElTable>
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

        .el-image {
          margin: 0 20px;
          width: 360px;
          height: 300px;
        }

        .image-slot {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background: var(--el-fill-color-light);
          color: var(--el-text-color-secondary);
          font-size: 30px;
        }
      }
    }

    .result-content {
      margin-top: 20px;
      width: 100%;
      height: 500px;

      .action {
        height: 80px;

        span {
          margin: 0 50px;
        }
      }
      .el-divider {
        margin: 15px 0;
      }

      .result {
        span {
          margin: 0 50px;
        }
        .el-table {
          margin: 20px 50px;
        }
      }
    }
  }
}

.el-button {
  .el-icon {
    margin-right: 10px;
  }
}
</style>
