import { Component } from 'react';
import { Flex } from 'antd-mobile';
import './index.scss';

export class HouseDetailOption extends Component {
  render() {
    return (
      <Flex className="house-detail-option">
        <Flex.Item className="house-detail-option__item">
          <i className="iconfont icon-coll"></i>
          收藏
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

export default HouseDetailOption;
