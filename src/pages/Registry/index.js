import { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, WingBlank, Flex, Toast } from 'antd-mobile';
import { withFormik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './index.scss';

export class Registry extends Component {
  render() {
    return (
      <div className="registry">
        <NavBar
          className="nav-header"
          leftContent={<i className="iconfont icon-back"></i>}
          onLeftClick={() => this.props.history.goBack()}
        >注册</NavBar>
        <WingBlank>
          <Form className="registry-form">
            <div className="registry-form__item">
              <label htmlFor="username">用户名</label>
              <Field
                name="username"
                placeholder="请输入账号"
                id="username"
              />
            </div>
            <ErrorMessage
              className="registry-form__message--error"
              name="username"
              component="div"
            />
            <div className="registry-form__item">
              <label htmlFor="password">密码</label>
              <Field
                name="password"
                type="password"
                placeholder="请输入密码"
                id="password"
              />
            </div>
            <ErrorMessage
              className="registry-form__message--error"
              name="password"
              component="div"
            />
            <div className="registry-form__item">
              <label htmlFor="comfirmPassword">确认密码</label>
              <Field
                name="confirmPassword"
                type="password"
                placeholder="请确认密码"
                id="comfirmPassword"
              />
            </div>
            <ErrorMessage
              className="registry-form__message--error"
              name="confirmPassword"
              component="div"
            />
            <button className="registry-form__submit" type="submit">注册</button>
          </Form>
          <Flex className="registry-links" justify="between">
            <Link to="/">点我返回首页</Link>
            <Link to="/login">已有账号，去登录</Link>
          </Flex>
        </WingBlank>
      </div>
    );
  }
}

const RegistryWithFormik = withFormik({
  validationSchema: Yup.object().shape({
    username: Yup.string().required('用户名不能为空'),
    password: Yup.string().required('密码不能为空'),
    confirmPassword: Yup.string().required('密码确认不能为空')
  }),
  mapPropsToValues: () => ({ username: '', password: '', confirmPassword: '' }),
  handleSubmit(values, { props }) {
    const { username, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      Toast.info('密码不一致');
      return;
    }

    console.log(values);
  }
})(Registry);

export default RegistryWithFormik;
