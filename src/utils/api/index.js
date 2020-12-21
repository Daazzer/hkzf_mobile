import home from './_home';
import area from './_area';
import houses from './_houses';

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
  getHouses
} = houses;

const api = {
  ...home,
  ...area,
  ...houses
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
  getHouses
}
