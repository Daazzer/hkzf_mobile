import http from '../http';

/**
 * 根据城市名称查询该城市信息
 * @param {Object} params 参数对象
 * @param {string} params.name 地区的name值
 */
const getAreaInfo = params => http.get('/area/info', params);

const area = {
  getAreaInfo
};

export default area;
