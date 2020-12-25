import { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, WingBlank, Toast } from 'antd-mobile';
import api from '../../utils/api';
import './index.scss';

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const [err, res] = await api.login({ username, password });

    if (err) {
      Toast.fail('登录失败');
      return;
    }

    const { status, description, body } = res.data;

    if (status !== 200) {
      Toast.info(description);
    } else {
      console.log(res);
      console.log(body);
    }
  }

  render() {
    const { username, password } = this.state;
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
              <input
                name="username"
                placeholder="请输入账号"
                type="text"
                value={username}
                onChange={this.handleInput}
              />
            </div>
            <div className="login-form__item">
              <input
                name="password"
                placeholder="请输入密码"
                type="password"
                value={password}
                onChange={this.handleInput}
              />
            </div>
            <button className="login-form__submit" onClick={this.handleSubmit}>登录</button>
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
