import { lazy, Suspense, Component } from 'react';
import { TabBar, ActivityIndicator } from 'antd-mobile';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';

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
  {
    path: '/news',
    name: '资讯',
    icon: 'infom',
    navTab: true,
    component: lazy(() => import('@/pages/News')),
  },
  {
    path: '/user',
    name: '我的',
    icon: 'my',
    navTab: true,
    component: lazy(() => import('@/pages/User'))
  },
  {
    path: '/map',
    name: '地图',
    component: lazy(() => import('@/pages/Map'))
  },
  {
    path: '/citylist',
    name: '城市列表',
    component: lazy(() => import('@/pages/CityList'))
  }
];

class RouterTabNav extends Component {
  render() {
    const pathname = this.props.location.pathname;
    const history = this.props.history;
    const navTabs = routes.filter(route => route.navTab);

    return (
      <div className="tab-bar-nav">
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#21b97a"
          barTintColor="white"
        >
          {navTabs.map(navTab =>
            <TabBar.Item
              title={navTab.name}
              key={navTab.name}
              icon={<i className={`iconfont icon-${navTab.icon}`}></i>}
              selectedIcon={<i className={`iconfont icon-${navTab.icon}`}></i>}
              selected={pathname === navTab.path}
              onPress={() => history.push(navTab.path)}
            />
          )}
        </TabBar>
      </div>
    );
  }
}

class RouterView extends Component {
  render() {
    return (
      <Switch>
        {routes.map(route =>
          <Route
            key={route.name}
            path={route.path}
            exact={route.exact}
            children={routeProps => {
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
        )}
      </Switch>
    );
  }
}

function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<ActivityIndicator className="router-loading" size="large" text="加载中..." />}>
        <RouterView />
      </Suspense>
    </BrowserRouter>
  );
}

export default Router;
