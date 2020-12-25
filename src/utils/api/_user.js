import http from '../http';

/**
 * 用户登录接口
 * @param {Object} data 用户登录的时候需要提交的内容
 * @param {string} data.username 用户名
 * @param {string} data.password 密码
 */
const login = data => http.post('/user/login', data);

/**
 * 用户注册接口
 * @param {Object} data 用户注册的时候需要提交的一些数据
 * @param {string} data.username 用户名
 * @param {string} data.password 密码
 */
const registered = data => http.post('/user/registered', data);

const user = {
  login,
  registered
};

export default user;
