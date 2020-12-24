import { Component } from 'react';
import './index.scss';

export class HouseMap extends Component {
  componentDidMount() {
    const map = new window.BMap.Map('houseMapGL');
    const point = new window.BMap.Point(116.404, 39.915);
    map.centerAndZoom(point, 15);
  }
  render() {
    return (
      <div className="house-map">
        <h3 className="house-map__title">小区：绿谷康都</h3>
        <div className="house-map__map-gl" id="houseMapGL"></div>
      </div>
    );
  }
}

export default HouseMap;
