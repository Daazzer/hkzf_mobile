import axios from 'axios';

/**
 * http 请求
 * @see 线上地址 {@link http://157.122.54.189:9060}
 * @see 本地地址 {@link http://localhost:8080}
 */

const http = {
  baseURL: 'http://157.122.54.189:9060',

  /**
   * 集中处理响应
   * @param {Promise} request axios 返回的 Promise 请求对象
   */
  responseHandle(request) {
    return request.then(response => [null, response]).catch(error => [error]);
  },

  /**
   * GET 请求
   * @param {string} url 请求 url
   * @param {Object} [params] 参数对象
   * @returns {Promise}
   */
  get(url, params) {
    return this.responseHandle(axios.get(url, {
      baseURL: this.baseURL,
      params
    }));
  },

  /**
   * POST 请求
   * @param {string} url 请求 url
   * @param {Object} [data] 参数对象
   * @returns {Promise}
   */
  post(url, data) {
    return this.responseHandle(axios.post(url, data, {
      baseURL: this.baseURL
    }));
  }
};

export default http;
