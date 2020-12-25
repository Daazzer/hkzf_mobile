import { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, WingBlank } from 'antd-mobile';
import './index.scss';

export class Login extends Component {
  render() {
    return (
      <div className="login">
        <NavBar
          className="nav-header"
          mode="light"
          leftContent={<i className="iconfont icon-back"></i>}
          onLeftClick={() => this.props.history.goBack()}
        >账号登录</NavBar>
        <WingBlank>
          <form className="login-form">
            <div className="login-form__item">
              <input placeholder="请输入账号" type="text" />
            </div>
            <div className="login-form__item">
              <input placeholder="请输入密码" type="password" />
            </div>
            <button className="login-form__submit">登录</button>
          </form>
          <div className="login-reg">
            <Link to="/registry">还没有账号，去注册~</Link>
          </div>
        </WingBlank>
      </div>
    );
  }
}

export default Login;
