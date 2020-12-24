import { Component } from 'react';
import HouseInfoItem from '../../HouseInfoItem';
import './index.scss';

export class HouseRecommend extends Component {
  render() {
    return (
      <div className="house-recommend">
        <h3 className="house-recommend__title">猜你喜欢</h3>
        <ul className="house-recommend-list">
          <HouseInfoItem
            title="安贞西里 3室1厅"
            houseImg="http://localhost:8080/img/message/1.png"
            desc="72.32㎡/南 北/低楼层"
            tags={['随时看房', '随时看房', '随时看房', '随时看房', '随时看房', '随时看房', '随时看房']}
            price={4500}
          />
        </ul>
      </div>
    );
  }
}

export default HouseRecommend;
