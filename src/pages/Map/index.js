import { Component } from 'react';
import './index.scss';

export class Map extends Component {
  componentDidMount() {
    const map = new window.BMap.Map('map');
    const point = new window.BMap.Point(116.404, 39.915);
    map.centerAndZoom(point, 15);
  }

  render() {
    return (
      <div className="map" id="map"></div>
    );
  }
}

export default Map;
