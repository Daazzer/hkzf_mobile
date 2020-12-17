import { lazy, Suspense } from 'react';
import { TabBar } from 'antd-mobile';
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
    icon: <i className="iconfont icon-ind"></i>,
    component: lazy(() => import('@/pages/Home')),
    exact: true
  },
  {
    path: '/findhouse',
    title: '找房',
    icon: <i className="iconfont icon-findHouse"></i>,
    component: lazy(() => import('@/pages/FindHouse')),
  },
  {
    path: '/news',
    title: '资讯',
    icon: <i className="iconfont icon-infom"></i>,
    component: lazy(() => import('@/pages/News')),
  },
  {
    path: '/user',
    title: '我的',
    icon: <i className="iconfont icon-my"></i>,
    component: lazy(() => import('@/pages/User'))
  }
];

function RouterTabNav() {
  const pathname = useLocation().pathname;
  const history = useHistory();

  return (
    <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#21b97a"
        barTintColor="white"
      >
        {routes.map(route =>
          <TabBar.Item
            title={route.title}
            key={route.title}
            icon={route.icon}
            selectedIcon={route.icon}
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
      <Suspense fallback={<div className="route-loading">loading...</div>}>
        <RouterView />
        <RouterTabNav />
      </Suspense>
    </BrowserRouter>
  );
}

export default Router;
