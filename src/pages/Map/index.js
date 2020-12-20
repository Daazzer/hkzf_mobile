import { Component } from 'react';
import { NavBar, Toast } from 'antd-mobile';
import myMap from '../../utils/map';
import { getAreaInfo, getAreaMap } from '../../utils/api';
import storage from '../../utils/storage';
import './index.scss';

export class Map extends Component {
  constructor() {
    super();
    this.state = {
      map: null,
      city: {
        label: '',
        value: '',
        center: null
      },
      rentInfoItems: [],
      loading: false
    };
  }

  async getCityInfo(name) {
    Toast.loading('获取城市信息中...');
    const [err, res] = await getAreaInfo({ name });

    if (err) {
      Toast.hide();
      Toast.fail('定位失败');
      return;
    }

    Toast.hide();
    return res.data.body;
  }

  /**
   * 渲染地图并且设置地图中心点
   * @param {string|Object} center
   */
  async renderMap(center) {
    const map = new window.BMap.Map('mapGL');
    map.centerAndZoom(center, 12);
    map.addControl(new window.BMap.NavigationControl());
    this.setState({ map });
  }

  async getLocation() {
    Toast.loading('定位中...');
    const location = await myMap.location();
    const { name, center } = location;
    Toast.hide();
    return {
      name,
      center
    };
  }

  async renderRentInfoItems(id) {
    Toast.loading('获取租房信息中...');
    const [err, res] = await getAreaMap({ id });

    if (err) {
      Toast.hide();
      Toast.fail('获取租房信息失败');
      return;
    }

    const rentInfoItems = res.data.body;
    this.setState({ rentInfoItems });
    Toast.hide();
  }

  renderLabels() {
    const positions = [];
    const labelStyle = {
      color: '#fff',
      borderRadius: '50%',
      border: '2px solid #fff',
      fontSize: '12px',
      height: '70px',
      width: '70px',
      backgroundColor: 'rgba(12, 181, 106, 0.8)'
    };
    this.state.rentInfoItems.forEach(rentInfoItem => {
      const { longitude, latitude } = rentInfoItem.coord;
      const position = new window.BMap.Point(longitude, latitude);
      const opts = {
        position,
        offset: new window.BMap.Size(-35, -35)
      };
      const label = new window.BMap.Label(
        `<div class="map-bubble">
          <p class="map-bubble__title">${rentInfoItem.label}</p>
          <p class="map-bubble__content">${rentInfoItem.count}套</p>
        </div>`,
        opts
      );
      label.addEventListener('click', () => {
        // 解决清除地图覆盖物的 bug
        setTimeout(() => {
          this.state.map.clearOverlays();
        });
        this.handleLabelClick(
          this.state.city,
          rentInfoItem.label,
          rentInfoItem.value
        );
      });
      label.setStyle(labelStyle);
      positions.push(position);
      this.state.map.addOverlay(label);
    });

    this.state.map.setViewport(positions);
  }

  async handleLabelClick(city, label, value) {
    this.setState({
      city: {
        ...city,
        label,
        value
      }
    });
    await this.renderRentInfoItems(value);
    this.renderLabels();
  }

  async componentDidMount() {
    // 获取本地城市信息
    let city = storage.getData('city');
    let center = null;
    if (!city) {
      const location = await this.getLocation();
      center = location.center;
      city = await this.getCityInfo(location.name);
      storage.setData('city', city);
    } else {
      center = city.label + '市';
    }

    this.setState({
      city: {
        ...city,
        center
      }
    });

    await this.renderMap(center);
    await this.renderRentInfoItems(city.value);
    this.renderLabels();
  }

  render() {
    const history = this.props.history;

    return (
      <div className="map">
        <div className="map-gl" id="mapGL"></div>
        <NavBar
          className="nav-header"
          mode="light"
          leftContent={<i className="iconfont icon-back"></i>}
          onLeftClick={() => history.goBack()}
        >地图找房</NavBar>
      </div>
    );
  }
}

export default Map;
