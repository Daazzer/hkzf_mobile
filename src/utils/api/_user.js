import http from '../http';

/**
 * 用户登录接口
 * @param {Object} data 参数对象
 * @param {Object} data.body 用户登录的时候需要提交的内容
 * @param {string} data.body.username 用户名
 * @param {string} data.body.password 密码
 */
const login = data => http.post('/user/login', data);

const user = {
  login
};

export default user;
