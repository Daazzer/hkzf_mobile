import { Component } from 'react';
import { NavBar } from 'antd-mobile';
import './index.scss';

export class Map extends Component {
  componentDidMount() {
    const map = new window.BMap.Map('mapGL');
    const point = new window.BMap.Point(116.404, 39.915);
    map.centerAndZoom(point, 15);
    map.addControl(new window.BMap.NavigationControl());
    const opts = {
      position: point,
      offset: new window.BMap.Size(-35, -35)
    };
    const label = new window.BMap.Label(
      `<div class="map-bubble">
        <p class="map-bubble__title">番禺</p>
        <p class="map-bubble__content">120套</p>
      </div>`,
      opts
    );
    label.setStyle({
      color: '#fff',
      borderRadius: '50%',
      border: '2px solid #fff',
      fontSize: '12px',
      height: '70px',
      width: '70px',
      backgroundColor: 'rgba(12, 181, 106, 0.8)'
    });
    map.addOverlay(label);
    map.setViewport([point]);
  }

  render() {
    const history = this.props.history;

    return (
      <div className="map">
        <div className="map-gl" id="mapGL"></div>
        <NavBar
          style={{ position: 'fixed', width: '100%', top: 0 }}
          mode="light"
          icon={<i className="iconfont icon-back" style={{ color: '#333' }}></i>}
          onLeftClick={() => history.goBack()}
        >地图找房</NavBar>
      </div>
    );
  }
}

export default Map;
