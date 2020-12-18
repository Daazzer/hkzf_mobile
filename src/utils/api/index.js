import home from './_home';


const {
  getSwiper,
  getGroups,
  getNews
} = home;

const api = {
  ...home
};

export {
  api as default,
  getSwiper,
  getGroups,
  getNews
}
