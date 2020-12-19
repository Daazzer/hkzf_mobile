import home from './_home';
import area from './_area';

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

const api = {
  ...home,
  ...area
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
  getAreaMap
}
