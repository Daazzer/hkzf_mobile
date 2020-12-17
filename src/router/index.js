import { lazy, Suspense } from 'react';
import {
  BrowserRouter,
  Link,
  Switch,
  Route
} from 'react-router-dom';

const routes = [
  {
    path: '/citylist',
    title: '城市列表',
    component: lazy(() => import('@/pages/CityList'))
  },
  {
    path: '/',
    title: '首页',
    component: lazy(() => import('@/pages/Home')),
    exact: true
  },
];

function RouterLink() {
  return (
    <ul>
      {routes.map(route =>
        <li key={route.title}>
          <Link to={route.path}>{route.title}</Link>
        </li>
      )}
    </ul>
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
        <RouterLink />
      </Suspense>
    </BrowserRouter>
  );
}

export default Router;
