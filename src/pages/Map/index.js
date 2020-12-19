import { Component } from 'react';
import { NavBar } from 'antd-mobile';
import './index.scss';

export class Map extends Component {
  componentDidMount() {
    const map = new window.BMap.Map('mapGL');
    const point = new window.BMap.Point(116.404, 39.915);
    map.centerAndZoom(point, 15);
  }

  render() {
    const history = this.props.history;

    return (
      <div className="map">
        <NavBar
          style={{ position: 'fixed', width: '100%', zIndex: 100, top: 0 }}
          mode="light"
          icon={<i className="iconfont icon-back" style={{ color: '#333' }}></i>}
          onLeftClick={() => history.goBack()}
        >地图找房</NavBar>
        <div className="map-gl" id="mapGL"></div>
      </div>
    );
  }
}

export default Map;
