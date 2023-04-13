import request from '@/config/axios'
import type { uploadType } from './types'

export const uploadImgApi = (params: uploadType): Promise<IResponse> => {
  return request.post({ url: '/api/identify', params })
}
