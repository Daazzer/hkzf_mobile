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

- 页面加载时获取本地数据中的当前城市，如果没有当前城市的数据，则调用百度地图 API 进行 IP 定位当前城市并保存到本地

  ```js
  // ... 
  async componentDidMount() {
    let city = storage.getData('city');  // 从本地获取当前城市数据
    if (!city) {
      city = await this.getCity();
      storage.setData('city', city);
    }
    this.setState({ city }, () => {
      this.renderRentItems(this.state.city);
      this.renderNewsItems(this.state.city);
    });
  }
  // ...
  ```

  

- 首页轮播图渲染

- 搜索栏布局与链接跳转：跳转到切换城市页、地图页

- 分类导航栏渲染

- 租房推荐列表渲染

  - 推荐列表无数据状态渲染
  - 推荐列表加载状态渲染

- 最新资讯列表渲染

  - 最新资讯列表无数据状态渲染
  - 推荐列表加载状态渲染



### 城市列表页

- 城市列表数据的获取

- 热门城市数据的获取

- 城市定位，本地数据判断，如果有城市定位的本地数据，则不向后台发送请求

- 获取所有城市后，对城市数据进行处理，将城市名按拼音首字母进行排序，返回城市拼音索引数组用于后续的首字母索引栏

  ```js
  // ... 
  formatCityData(cityItems) {
    const cities = {}
    cityItems.forEach(cityItem => {
       // *** 获取城市的拼音首字母，转换为大写 ***
      const firstLetter = cityItem.short[0].toUpperCase();
      // *** 判断是否已经保存了首字母，如果保存了则往后添加，否则新建一个数组 ***
      if (cities[firstLetter]) {
        cities[firstLetter].push(cityItem);
      } else {
        cities[firstLetter] = [cityItem];
      }
    });
    // *** 将首字母对象的键保存到一个数组中并排序 ***
    const cityIndexes = Object.keys(cities).sort();
    return {
      cityIndexes,
      cities
    }
  }
  // ...
  ```
  
- 在城市拼音索引数组开头加入 `#` 与 `hot` 项，代表当前城市与热门城市

- 顶部导航栏渲染

- 城市列表索引栏渲染，点击每个拼音页面滚动到对应的城市列表，并且高亮当前的索引项

- 城市列表渲染

  - `react-virtualized` 的可视区渲染优化，限制页面中 DOM 的显示数量
  - 由于 `react-virtualized` 组件内部特性，计算每项的固定高度
  - 每次点击当前城市项则将当前城市的数据保存到本地
  - 初始化时调用 `measureAllRows` 方法校正 `react-virtualized` 高度，用于索引滚动
  - 利用 `react-virtualized` 的 `<AutoSizer>` 组件适配尺寸大小

### 找房页

- 城市定位功能，上同

- 顶部导航栏
  - 返回按钮，点击返回上一页
  - 搜索栏 `<SearchBar>` 组件复用
  - 地图图标点击跳转到地图页
  
- 数据筛选栏渲染
  - 筛选栏组件拆分 `<Filter>` `<FilterTitle>` `<FilterPicker>` `<FilterMore>` `<FilterFooter>`
  
  - 点击对应的筛选项标题会显示不同的 `Picker` 进行数据筛选
  
  - `<FilterPicker>` 组件复用，前三个筛选标题项使用 `<FilterPicker>`
  
  - 使用 `react-spring` 动画库显示筛选项开关的遮罩、与 `<FilterMore>` 组件过渡效果
  
  - `<FilterPicker>` 组件每次激活时会传入不同的当前选中值，`this.state` 引用父组件传入的值
  
    ```js
    // /src/components/FindHouse/FilterPicker/index.js
    // ...
    constructor(props) {
      super(props);
      this.state = {
        value: props.defaultValue
      };
    	// ...
    }
    // ...
    ```
  
    
  
  - `<FilterPicker>` 组件激活状态时切换不同的筛选标题时手动改变组件 `key` 值卸载组件，触发组件的 `constructor` 函数
  
  - 选择 `<FilterPicker>` 组件的非默认选项会将对应的筛选标题保持高亮
  
  - `<FilterMore>` 组件的数据渲染
  
  - 使用非受控组件的形式引用 `<FilterMore>` 组件，在点击兄弟组件时，调用 `<FilterMore>` 的 `setState()` 方法
  
    ```js
    // /src/components/FindHouse/Filter/index.js
    // ...
    onOpen(activeType) {
      this.setState({ activeType });
      if (activeType === 'more') {
        this.filterMoreRef.current.setState({ selectedValues: [...this.state.selectedData.more] });
      }
      // ...
    }
    // ...
    ```
  
- 封装 `<Sticky>` 组件配合 `react-virtualized` 的 `<WindowScroller>` 组件实现 `<Filter>` 筛选栏的吸顶效果

- 分页请求租房列表数据项

  - 配合 `react-virtualized` 的 `<InfiniteLoader>` 组件的 `loadMoreRows` 钩子实现瀑布流数据加载，每次滚动出不可见的区域时向后端请求房源信息数据加载下一页数据
  - 数据项的加载状态显示
  - 列表空数据状态显示

