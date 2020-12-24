import { Component } from 'react';
import { Flex } from 'antd-mobile';
import './index.scss';

export class HouseInfo extends Component {
  render() {
    const { title, tags, price, roomType, size, oriented, floor } = this.props;

    return (
      <div className="house-info">
        <h3 className="house-info__title">{title}</h3>
        <Flex className="house-info-tags" wrap="wrap">
          {tags.map((tag, i) =>
            <span key={tag} className={`house-info-tags__item house-info-tags__item--${(i%6)+1}`}>{tag}</span>
          )}
        </Flex>
        <Flex className="house-info-type-info">
          <Flex.Item className="house-info-type-info__item house-info-type-info__item--price">
            <h4>{price}<span>/月</span></h4>
            <p>租金</p>
          </Flex.Item>
          <Flex.Item className="house-info-type-info__item house-info-type-info__item--room-type">
            <h4>{roomType}</h4>
            <p>房型</p>
          </Flex.Item>
          <Flex.Item className="house-info-type-info__item house-info-type-info__item--size">
            <h4>{size}平米</h4>
            <p>面积</p>
          </Flex.Item>
        </Flex>
        <Flex className="house-info-base-info">
          <Flex.Item className="house-info-base-info__item">
            <p><span>装修：</span>精装</p>
            <p><span>楼层：</span>{floor}</p>
          </Flex.Item>
          <Flex.Item className="house-info-base-info__item">
            <p><span>朝向：</span>{oriented.join('、')}</p>
            <p><span>类型：</span>普通住宅</p>
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}

export default HouseInfo;
