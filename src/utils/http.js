import axios from 'axios';

const http = {
  get request() {
    return axios.create({ baseURL: process.env.REACT_APP_URL })
  },

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
    return this.responseHandle(this.request.get(url, {
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
    return this.responseHandle(this.request.post(url, data));
  }
};

export default http;
