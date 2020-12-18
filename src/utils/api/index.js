import home from './_home';
import area from './_area';

const {
  getSwiper,
  getGroups,
  getNews
} = home;

const { getAreaInfo } = area;

const api = {
  ...home,
  ...area
};

export {
  api as default,
  getSwiper,
  getGroups,
  getNews,
  getAreaInfo
}
