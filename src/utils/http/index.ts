import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
// import { successMessage, warnMessage, errorMessage } from '/@/utils/message';
import {
  resultType,
  PureHttpError,
  RequestMethods,
  PureHttpResponse,
  PureHttpRequestConfig,
  InterceptorsRequestConfig,
  IHttpRequest,
  IHttpResponse,
  IDownloadOption
} from './types.d';
import qs from 'qs';
import { HttpResponseHandler } from './response';

const { VITE_BASE_API } = import.meta.env;

// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
  baseURL: VITE_BASE_API,
  timeout: 1000 * 60 * 2,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true,
  // 数组格式参数序列化
  paramsSerializer: params => qs.stringify(params, { indices: false })
};

class PureHttp {
  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }
  // 初始化配置对象
  private static initConfig: PureHttpRequestConfig = {};

  // 保存当前Axios实例对象
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);

  // 请求拦截
  private httpInterceptorsRequest(): void {
    PureHttp.axiosInstance.interceptors.request.use(
      (config: InterceptorsRequestConfig) => {
        const $config = config;
        // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
        if (typeof config.beforeRequestCallback === 'function') {
          config.beforeRequestCallback($config);
          return $config;
        }
        if (PureHttp.initConfig.beforeRequestCallback) {
          PureHttp.initConfig.beforeRequestCallback($config);
          return $config;
        }
        // const token = getToken();
        // 添加响应标头
        // if (token) {
        //   config.headers['Authorization'] = 'Bearer ' + token;
        // }
        return $config;
      },
      error => {
        const $config = error.config;
        return Promise.reject(error);
      }
    );
  }

  // 响应拦截
  private httpInterceptorsResponse(): void {
    const instance = PureHttp.axiosInstance;
    instance.interceptors.response.use(
      (response: PureHttpResponse) => {
        const $config = response.config;
        // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
        if (typeof $config.beforeResponseCallback === 'function') {
          $config.beforeResponseCallback(response);
          return response.data;
        }
        if (PureHttp.initConfig.beforeResponseCallback) {
          PureHttp.initConfig.beforeResponseCallback(response);
          return response.data;
        }

        // if (response.headers.authorization) {
        //   setToken(response.headers.authorization);
        // }

        // 处理返回消息
        if (response.status === 200) {
          if ($config.message) {
            // successMessage($config.message);
          }
        } else {
          // warnMessage(response.data.message);
        }
        if (response.config.responseType === 'blob') {
          return response;
        }
        return response.data;
      },
      (error: PureHttpError) => {
        const $error = error;
        $error.isCancelRequest = Axios.isCancel($error);
        let result;
        if (error.config.ignoreHandler) {
          // ElMessageBox.confirm('认证失败，请稍后重试', '提示', {
          //   confirmButtonText: '重试',
          //   cancelButtonText: '取消',
          //   type: 'warning'
          // })
          //   .then(() => {
          //     HttpResponseHandler(error!.response!.data as IHttpResponse);
          //   })
          //   .catch(() => {});
        } else {
          result = HttpResponseHandler(error!.response!.data as IHttpResponse);
          return Promise.reject(result);
        }
      }
    );
  }

  // 通用请求工具函数
  public request<T>(options: IHttpRequest): Promise<any> {
    const config = {
      method: options.method || 'post',
      url: options.url,
      data: options.data,
      message: options.message,
      loading: options.loading,
      headers: options.headers,
      ignoreHandler: options.ignoreHandler
    } as PureHttpRequestConfig;
    // 单独处理自定义请求/响应回掉
    return new Promise((resolve, reject) => {
      PureHttp.axiosInstance
        .request(config)
        .then((response: any) => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // 单独抽离的post工具函数
  public post<P>(options: IHttpRequest): Promise<P> {
    options.method = 'post';
    return this.request<P>(options);
  }

  // 单独抽离的get工具函数
  public get<P>(options: IHttpRequest): Promise<P> {
    options.method = 'get';
    return this.request<P>(options);
  }

  /**
   * 下载文件
   * @param options
   * @returns
   */
  public downloadFile<T>(options: IDownloadOption): Promise<any> {
    return new Promise((resolve, reject) => {
      PureHttp.axiosInstance
        .request({
          url: options.url,
          data: options.data,
          loading: options.loading,
          message: options.message,
          method: 'post',
          responseType: 'blob'
        } as PureHttpRequestConfig)
        .then((response: any) => {
          const { data: blob, headers } = response;
          let fileName = '';
          const disposition = headers['content-disposition'];
          // 优先使用配置的文件名
          if (options.fileName) {
            fileName = options.fileName;
          } 
          // 其次使用后端文件名
          else if (disposition) {
            const encodedFileName = disposition?.split("filename*=utf-8''")?.[1];
            fileName = encodedFileName ? decodeURIComponent(encodedFileName) : fileName;
          }
          if ('download' in document.createElement('a')) {
            // 非IE下载
            const eLink = document.createElement('a');
            eLink.download = fileName;
            eLink.style.display = 'none';
            eLink.href = URL.createObjectURL(blob);
            document.body.appendChild(eLink);
            eLink.click();
            URL.revokeObjectURL(eLink.href); // 释放 URL对象
            document.body.removeChild(eLink);
          }
          resolve(null);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export default new PureHttp();
