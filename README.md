# 好客租房移动App

## 使用方法

```bash
$ npm start

$ npm test

$ npm run build

$ npm run eject
```



## 项目目录结构

```bash
.
├─public
└─src
    ├─assets
    │  ├─fonts
    │  └─images
    ├─components
    │  ├─Detail
    │  │  ├─HouseAbout
    │  │  ├─HouseDetailInfo
    │  │  ├─HouseDetailOption
    │  │  ├─HouseMap
    │  │  ├─HouseProfile
    │  │  └─HouseRecommend
    │  ├─FindHouse
    │  │  ├─Filter
    │  │  ├─FilterFooter
    │  │  ├─FilterMore
    │  │  ├─FilterPicker
    │  │  └─FilterTitle
    │  ├─HouseInfoItem
    │  ├─HousePackage
    │  ├─SearchBar
    │  └─Sticky
    ├─pages
    │  ├─CityList
    │  ├─Detail
    │  ├─Favorite
    │  ├─FindHouse
    │  ├─Home
    │  ├─Login
    │  ├─Map
    │  ├─News
    │  ├─Registry
    │  ├─Rent
    │  │  └─Add
    │  └─User
    ├─router
    └─utils
        └─api
```



## 项目技术

- 前端框架：[React](https://reactjs.org/)
- 脚手架工具：[Create React App](https://create-react-app.dev/)
- 前端路由：[React-Router](https://reactrouter.com/)
- 样式预编译语言：[Sass](https://sass-lang.com/)
- UI 框架：[Ant Design Mobile](https://mobile.ant.design/)
- 字体图标：[iconfont](https://www.iconfont.cn/)
- Ajax 请求：[Axios](https://github.com/axios/axios)
- 地图：[百度地图](http://lbsyun.baidu.com/index.php?title=jspopularGL)
- 过渡动画库：[react-spring](https://www.react-spring.io/)
- 可视区懒加载：[react-virtualized](https://github.com/bvaughn/react-virtualized)
- 表单验证：[formik](https://formik.org/docs/overview)、[Yup](https://github.com/jquense/yup)



## 项目 API 地址

http://157.122.54.189:9060/



## 项目配置

- 配置 antd-mobile 的[按需引入](https://mobile.ant.design/docs/react/use-with-create-react-app-cn)

- 配置目录路径别名，将 `src` 配置为 `@`

  ```js
  // /config-overrides.js
  // ...
  const path = require('path');
  
  module.exports = override(
  	// ...
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src')
    })
  );
  ```

  



## 项目路由

| 路径          | 描述     |
| ------------- | -------- |
| `/`           | 首页     |
| `/findhouse`  | 找房     |
| `/news`       | 资讯     |
| `/user`       | 我的     |
| `/map`        | 地图     |
| `/citylist`   | 城市列表 |
| `/detail/:id` | 租房详情 |
| `/login`      | 登录     |
| `/registry`   | 注册     |
| `/favorite`   | 收藏     |
| `/rent`       | 我的租房 |
| `/rent/add`   | 成为房主 |



### 路由配置

- 使用 `history` 模式路由

- `<Switch>` 组件路由精确匹配

- 路由重定向

- React.lazy()  + import() + Suspense 组件，动态路由加载，将代码按照路由进行分割

- `<Suspense>` 组件显示动态路由加载时的后备信息

- 路由条件判断，判断当前路由是否显示底部导航栏

  ```jsx
  class RouterView extends Component {
    render() {
      return (
        <Switch>
          {routes.map(route => {
            if (route.auth) {
              return authRoute({
                component: route.component,
                key: route.name
              });
            } else {
              return (
                <Route
                  key={route.name}
                  path={route.path}
                  exact={route.exact}
                  children={routeProps => {
                    // *** 判断是否显示底部导航栏 ***
                    if (route.navTab) {
                      return (
                        <>
                          <route.component {...routeProps} />
                          <RouterTabNav {...routeProps} />
                        </>
                      );
                    }
                    return <route.component {...routeProps} />;
                  }
                } />
              );
            }
          })}
        </Switch>
      );
    }
  }
  ```

- 将路由对象封装到数组中进行遍历渲染

  ```js
  const routes = [
    {
      path: '/',
      name: '首页',
      icon: 'ind',
      component: lazy(() => import('@/pages/Home')),
      navTab: true,
      exact: true
    },
    {
      path: '/findhouse',
      name: '找房',
      icon: 'findHouse',
      navTab: true,
      component: lazy(() => import('@/pages/FindHouse')),
    },
  	// ...
  ];
  ```

  

## 公用方法

### 本地存储

将项目需要持久化数据存到一个数据对象中然后同步到 `localStorage`

```js
// /src/utils/storage.js
const storage = {
  setData(key, data) {
    let hkzf = JSON.parse(localStorage.getItem('hkzf'));
    // *** Object 类型精确判断 ***
    if (Object.prototype.toString.call(hkzf) !== '[object Object]') {
      hkzf = {};
    }
    hkzf[key] = data;
    localStorage.setItem('hkzf', JSON.stringify(hkzf));
  },

  getData(key) {
    // *** 每次获取对象数据时都从本地获取一次 ***
    let hkzf = JSON.parse(localStorage.getItem('hkzf'));
    if (Object.prototype.toString.call(hkzf) !== '[object Object]') {
      hkzf = {};
    }
    return hkzf[key];
  }
};

// ...
```



### 地图

将定位功异步 API 封装为 `Promise`

百度地图的 [IP 定位](http://lbsyun.baidu.com/index.php?title=jspopular3.0/guide/geolocation)功能封装

```js
// /src/utils/map.js
const map = {
  location() {
    const myCity = new window.BMap.LocalCity();
    const p = new Promise(rv => {
      myCity.get(res => {
        rv(res);
      });
    });
    return p;
  }
}
// ...
```



### HTTP

基于 `axios` 发送请求，使用 ES6 `class` 抽象所有的项目的请求 `method`

集中调用 `axios` 的 `then/catch`

实例化时进行 `axios` 请求配置初始化

```js
// /src/utils/http.js
class Http {
  constructor(baseURL) {
    // *** 在 Http 实例化时进行 axios 请求配置初始化 ***
    this.request = axios.create({ baseURL });
    this.request.interceptors.request.use(config => {
      const token = storage.getData('token');
      if (token && checkAuthURL(config.url)) {
        config.headers.authorization = token;
      }
      return config;
    }, error => Promise.reject(error));
  }

  /**
   * 集中处理请求的响应
   * @param {Promise} request axios 返回的 Promise 请求对象
   */
  handleRequest(request) {
    return request.then(response => [null, response]).catch(error => [error]);
  }

  /**
   * GET 请求
   * @param {string} url 请求 url
   * @param {Object} [params] 参数对象
   * @returns {Promise}
   */
  get(url, params) {
    return this.handleRequest(this.request.get(url, {
      params
    }));
  }

  // ...
}
```



### 登录检测

`/src/utils/auth.js`

### API 方法

封装不同 API 模块的请求方法

使用默认导出和导出单个绑定

例如：

单个 api 模块

```js
// /src/utils/api/_home.js
import http from '../http';

/** 首页轮播图 */
const getSwiper = () => http.get('/home/swiper');

/**
 * 租房小组
 * @param {Object} data 参数对象
 * @param {string} data.area 地区的id
 */
const getGroups = data => http.get('/home/groups', data);

// ...

const home = {
  getSwiper,
  getGroups,
  getNews
}

export default home;
```



api 统一导出

```js
// /src/utils/api/index.js
import home from './_home';
// ...

const {
  getSwiper,
  getGroups,
  getNews
} = home;

// ...

const api = {
  ...home,
  // ...
};

export {
  api as default,
  getSwiper,
  getGroups,
	// ...
};
```



## 项目实现

- BEM 命名规范配合 scss 的父类选择器

  ```jsx
  // ...
  <Flex.Item className="cate-nav__item" key={cateNav.title} onClick={() => props.history.push(cateNav.to)}>
    {/* ... */}
  </Flex.Item>
  // ...
  ```

  ```scss
  // ...
  .cate-nav {
    padding: 10px 0;
    &__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 48px;
      }
      h2 {
        margin-top: 7px;
        font-size: 13px;
        font-weight: normal;
      }
    }
  }
  // ...
  ```



### 首页

- 首页轮播图渲染
- 搜索栏布局与链接跳转：跳转到切换城市页、地图页
- 分类导航栏渲染
- 租房推荐列表渲染
- 最新资讯列表渲染

