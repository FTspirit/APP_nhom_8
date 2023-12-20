import AsyncStorage from '@react-native-async-storage/async-storage'
import axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios'
import Keychain from 'react-native-keychain'

const { CancelToken } = axios
const source = CancelToken.source()
let store: {
  getState: () => { (): any; new(): any; appInfoReducer: { language: any } }
  dispatch: (arg0: { payload: undefined; type: string }) => void
}

export const injectStore = (_store: any) => {
  store = _store
}
/**
 * tạo ra 1 func request api dựa vào axios
 * @param API_URL
 * @param timeout
 */
export const createRequest = (API_URL: string, timeout: number) => {
  return () => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const defaultOptions: AxiosRequestConfig = {
      headers,
      baseURL: API_URL,
      timeout,
    }

    axios.interceptors.request.use(async function (config) {
      let user_token = await AsyncStorage.getItem("user_token");
      config.headers.Authorization = user_token ? `Bearer ${user_token}` : '';
      return config;
    });

    axios.interceptors.response.use(response => {
      // console.log('Response:', JSON.stringify(response, null, 2))
      return response
    })

    return {
      /**
       * func get
       * override option request
       */
      get: <T = any, R = AxiosResponse<T>>(url: string, options: AxiosRequestConfig = {}) => {
        return axios.get<T, R>(url, {
          // ...options.params,
          ...defaultOptions,
          ...options,
          headers: {
            ...defaultOptions.headers,
            ...options?.headers,
          },
        })
      },
      /**
       * func post
       * override option request
       */
      post: <T = any, R = AxiosResponse<T>>(
        url: string,
        data?: any,
        options: AxiosRequestConfig = {}
      ) => {
        console.log({ data })
        return axios.post<T, R>(url, data, {
          ...defaultOptions,
          ...options,
          headers: {
            ...defaultOptions.headers,
            ...options?.headers,
          },
        })
      },
      /**
       * func put
       * override option request
       */
      put: <T = any, R = AxiosResponse<T>>(
        url: string,
        data?: any,
        options: AxiosRequestConfig = {}
      ) =>
        axios.put<T, R>(url, data, {
          ...defaultOptions,
          ...options,
          headers: {
            ...defaultOptions.headers,
            ...options?.headers,
          },
        }),

      /**
       * func put
       * override option request
       */
      patch: <T = any, R = AxiosResponse<T>>(
        url: string,
        data?: any,
        options: AxiosRequestConfig = {}
      ) =>
        axios.patch<T, R>(url, data, {
          ...defaultOptions,
          ...options,
          headers: {
            ...defaultOptions.headers,
            ...options?.headers,
          },
        }),

      /**
       * func delete
       * override option request
       */
      delete: <T = any, R = AxiosResponse<T>>(
        url: string,
        data?: any,
        options: AxiosRequestConfig = {}
      ) =>
        axios.delete<T, R>(url, {
          data: [
            ...data,
          ],
          ...defaultOptions,
          ...options,
          headers: {
            ...defaultOptions.headers,
            ...options?.headers,
          },
        }),
      deleteOjb: <T = any, R = AxiosResponse<T>>(
        url: string,
        data?: any,
        options: AxiosRequestConfig = {}
      ) =>
        axios.delete<T, R>(url, {
          data: {
            ...data,
          },
          ...defaultOptions,
          ...options,
          headers: {
            ...defaultOptions.headers,
            ...options?.headers,
          },
        }),
    }
  }
}

export const getToken = async () => {
  const token = await AsyncStorage.getItem('user_token');
  console.log('====================================');
  console.log("token", token);
  console.log('====================================');
  return token
}

export const getRefreshToken = async () => {
  const refreshToken = await Keychain.getGenericPassword({ service: 'refreshToken' }).then(res => {
    if (res) return res.password
    return ''
  })
  return refreshToken
}
