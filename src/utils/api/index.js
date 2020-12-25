import home from './_home';
import area from './_area';
import houses from './_houses';
import user from './_user';

const {
  getSwiper,
  getGroups,
  getNews
} = home;

const {
  getArea,
  getAreaCity,
  getAreaHot,
  getAreaInfo,
  getAreaCommunity,
  getAreaMap
} = area;

const {
  getHouses,
  getHousesById,
  getHousesCondition
} = houses;

const {
  login,
  registered,
  getFavorites,
  getFavoritesById,
  favorites
} = user;

const api = {
  ...home,
  ...area,
  ...houses,
  ...user
};

export {
  api as default,
  getSwiper,
  getGroups,
  getNews,
  getArea,
  getAreaCity,
  getAreaHot,
  getAreaInfo,
  getAreaCommunity,
  getAreaMap,
  getHouses,
  getHousesById,
  getHousesCondition,
  login,
  registered,
  getFavorites,
  getFavoritesById,
  favorites
};
