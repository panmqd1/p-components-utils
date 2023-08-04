import { IHttpResponse } from './types'

/**
 * 请求响应错误处理函数
 * @param response
 */
export const HttpResponseHandler = (response: IHttpResponse) => {
  const { message, errorCode, data } = response

  return data
}
