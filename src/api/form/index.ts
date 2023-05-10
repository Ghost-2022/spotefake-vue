import request from '@/config/axios'
import type { TextType } from './types'

export const textDetectionApi = (data: TextType): Promise<IResponse<any>> => {
  return request.post({ url: '/api/detection', data })
}
