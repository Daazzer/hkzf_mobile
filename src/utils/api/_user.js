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

/** 查看收藏列表 */
const getFavorites = () => http.get('/user/favorites');

/**
 * 房屋是否收藏
 * @param {string} id 房屋的code值
 */
const getFavoritesById = id => http.get(`/user/favorites/${id}`);

/**
 * 添加收藏
 * @param {string} id 房屋的code值
 */
const favorites = id => http.post(`/user/favorites/${id}`);

/**
 * 添加收藏
 * @param {string} id 房屋的code值
 */
const unFavorites = id => http.delete(`/user/favorites/${id}`);

const user = {
  login,
  registered,
  getFavorites,
  getFavoritesById,
  favorites,
  unFavorites
};

export default user;
