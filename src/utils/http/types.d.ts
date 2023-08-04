import Axios, {
  Method,
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

export type resultType = {
  accessToken?: string;
};

// 请求参数
export interface IHttpRequest {
  url: string;
  method?: RequestMethods;
  data?: any;
  message?: string;
  loading?: any;
  headers?: any;
  ignoreHandler?: any;
}

// 响应结果
export interface IHttpResponse {
  status: number;
  message?: string;
  errorCode?: string;
  data?: any;
  timestamp?: number;
}

export type RequestMethods = Extract<
  Method,
  "get" | "post" | "put" | "delete" | "patch" | "option" | "head"
>;

export interface PureHttpError extends AxiosError {
  isCancelRequest?: boolean;
  config: InterceptorsRequestConfig;
}

export interface PureHttpResponse extends AxiosResponse {
  config: PureHttpRequestConfig;
}

export interface PureHttpRequestConfig extends AxiosRequestConfig {
  beforeRequestCallback?: (request: PureHttpRequestConfig) => void;
  beforeResponseCallback?: (response: PureHttpResponse) => void;
  [propName: string]: any;
}

export interface InterceptorsRequestConfig extends InternalAxiosRequestConfig {
  ignoreHandler?: boolean;
  beforeRequestCallback?: (request: PureHttpRequestConfig) => void;
  beforeResponseCallback?: (response: PureHttpResponse) => void;
  [propName: string]: any;
}

export default class PureHttp {
  request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: PureHttpRequestConfig
  ): Promise<T>;
  post<T, P>(
    url: string,
    params?: T,
    config?: PureHttpRequestConfig
  ): Promise<P>;
  get<T, P>(
    url: string,
    params?: T,
    config?: PureHttpRequestConfig
  ): Promise<P>;
}

// 文件下载
export interface IDownloadOption {
  loading?: any;
  message?: string;
  url?: string;
  fileName?: string;
  data?: any;
}