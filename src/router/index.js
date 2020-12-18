import { lazy, Suspense } from 'react';
import { TabBar, ActivityIndicator } from 'antd-mobile';
import {
  BrowserRouter,
  Switch,
  Route,
  useHistory,
  useLocation
} from 'react-router-dom';

const routes = [
  {
    path: '/',
    title: '首页',
    icon: 'ind',
    component: lazy(() => import('@/pages/Home')),
    exact: true
  },
  {
    path: '/findhouse',
    title: '找房',
    icon: 'findHouse',
    component: lazy(() => import('@/pages/FindHouse')),
  },
  {
    path: '/news',
    title: '资讯',
    icon: 'infom',
    component: lazy(() => import('@/pages/News')),
  },
  {
    path: '/user',
    title: '我的',
    icon: 'my',
    component: lazy(() => import('@/pages/User'))
  }
];

function RouterTabNav() {
  const pathname = useLocation().pathname;
  const history = useHistory();

  return (
    <div className="tab-bar-nav">
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#21b97a"
        barTintColor="white"
      >
        {routes.map(route =>
          <TabBar.Item
            title={route.title}
            key={route.title}
            icon={<i className={`iconfont icon-${route.icon}`}></i>}
            selectedIcon={<i className={`iconfont icon-${route.icon}`}></i>}
            selected={pathname === route.path}
            onPress={() => history.push(route.path)}
          />
        )}
      </TabBar>
    </div>
  );
}

function RouterView() {
  return (
    <Switch>
      {routes.map(route =>
        <Route key={route.title} path={route.path} exact={route.exact}>
          <route.component />
        </Route>
      )}
    </Switch>
  );
}

function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<ActivityIndicator className="router-loading" size="large" text="加载中..." />}>
        <RouterView />
      </Suspense>
      <RouterTabNav />
    </BrowserRouter>
  );
}

export default Router;
