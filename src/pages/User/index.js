import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'antd-mobile';
import './index.scss';

// 菜单数据
const menus = [
  { id: 1, name: '我的收藏', iconfont: 'icon-coll', to: '/favorate' },
  { id: 2, name: '我的出租', iconfont: 'icon-ind', to: '/rent' },
  { id: 3, name: '看房记录', iconfont: 'icon-record' },
  {
    id: 4,
    name: '成为房主',
    iconfont: 'icon-identity'
  },
  { id: 5, name: '个人资料', iconfont: 'icon-myinfo' },
  { id: 6, name: '联系我们', iconfont: 'icon-cust' }
];

export class User extends Component {
  render() {
    return (
      <div className="user">
        <div className="user-title">
          <img src="http://157.122.54.189:9060/img/profile/bg.png" alt="背景" />
          <div className="user-profile">
            <div className="user-profile__avatar">
              <img src="http://157.122.54.189:9060/img/profile/avatar.png" alt="头像" />
            </div>
            <div className="user-profile__content">
              <p>游客</p>
              <Link className="opt-btn" to="/login">去登录</Link>
            </div>
          </div>
        </div>
        <Grid
          className="user-menu"
          data={menus}
          columnNum={3}
          hasLine={false}
          renderItem={item =>
            item.to ? (
              <Link className="user-menu__item" to={item.to}>
                <i className={`iconfont ${item.iconfont}`} />
                <span>{item.name}</span>
              </Link>
            ) : (
              <div className="user-menu__item">
                <i className={`iconfont ${item.iconfont}`} />
                <span>{item.name}</span>
              </div>
            )
          }
        />
        <div className="user-ad">
          <img src="http://localhost:8080/img/profile/join.png" alt="ad" />
        </div>
      </div>
    );
  }
}

export default User;
