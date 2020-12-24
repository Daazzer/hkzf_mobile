import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Flex, Modal } from 'antd-mobile';
import './index.scss';
const baseURL = process.env.REACT_APP_URL;

export class HouseDetailOption extends Component {
  constructor() {
    super();
    this.handleFavorite = this.handleFavorite.bind(this);
  }

  handleFavorite() {
    const { history, location } = this.props;
    Modal.alert('提示', '登录后才能收藏房源，是否去登录?', [
      { text: '取消' },
      {
        text: '去登录',
        onPress: () => history.replace('/login', { from: location })
      }
    ]);
  }

  render() {
    return (
      <Flex className="house-detail-option">
        <Flex.Item className="house-detail-option__item" onClick={this.handleFavorite}>
          <img src={baseURL + '/img/unstar.png'} alt="收藏" />
          <span>收藏</span>
        </Flex.Item>
        <Flex.Item className="house-detail-option__item">
          在线质询
        </Flex.Item>
        <Flex.Item className="house-detail-option__item house-detail-option__item--tel">
          <a href="tel:1010-9666">电话预约</a>
        </Flex.Item>
      </Flex>
    );
  }
}

const HouseDetailOptionWithRouter = withRouter(HouseDetailOption);

export default HouseDetailOptionWithRouter;
