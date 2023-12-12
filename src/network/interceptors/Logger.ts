import {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from 'axios';

function requestLogger(request: InternalAxiosRequestConfig) {
  const {baseURL, url, params, method, data, headers} = request;
  console.log(`>>> [${method?.toUpperCase()}] ${baseURL}${url}`)
  if (headers) {
    console.log(`Header:`, JSON.stringify(headers, null, 2))
  }
  if (data) {
    console.log(`Data`, JSON.stringify(data, null, 2))
  }
  return request;
}

function responseLogger(response: AxiosResponse) {
  const {config: {baseURL, url, method, params}, status, statusText, data, headers} = response;
  console.log(`<<< [${status}] [${method?.toUpperCase()}] ${baseURL}${url}`)
  if (data) {
    console.log(`Body:`, JSON.stringify(data, null, 2))
  }
  return response;
}

function errorLoggerWithoutPromise(error: AxiosError) {
  if (!error.config) {
    return error
  }

  const {config: {method, baseURL, params, url}, response} = error;

  if (response) {
    const {status, statusText, data, headers} = response;
    console.log(`<<< [${status}] [${method}] ${baseURL}${url}`)
    if (data) {
      console.log(`Body`, JSON.stringify(data, null, 2))
    }
  }

  return error;
}

function errorLogger(error: AxiosError) {
  return Promise.reject<AxiosError>(errorLoggerWithoutPromise(error));
}

export {
  requestLogger,
  responseLogger,
  errorLogger
}
