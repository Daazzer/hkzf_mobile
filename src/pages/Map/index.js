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
      mapLevel: 1,
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
    let labelStyle = null;
    let labelContent = '';
    let handleLabelClick = null;
    if (this.state.mapLevel < 3) {
      labelContent = (title, count) => `
        <div class="map-bubble">
          <p class="map-bubble__title">${title}</p>
          <p class="map-bubble__content">${count}套</p>
        </div>`;
      labelStyle = {
        color: '#fff',
        borderRadius: '50%',
        border: '2px solid #fff',
        fontSize: '12px',
        height: '70px',
        width: '70px',
        backgroundColor: 'rgba(12, 181, 106, 0.8)'
      };
      handleLabelClick = this.renderAreaLabel.bind(this);
    } else {
      labelContent = (title, count) => `
        <div class="map-rect">
          <div class="map-rect-wrapper">
            <p class="map-rect__title">${title}</p>
            <p class="map-rect__content">${count}套</p>
          </div>
          <i class="map-rect__arrow"></i>
        </div>`;
      labelStyle = {
        color: '#fff',
        borderRadius: '3px',
        border: 'none',
        fontSize: '12px',
        height: '20px',
        width: '100px',
        backgroundColor: 'rgba(12, 181, 106, 0.8)'
      };
      handleLabelClick = this.showRentInfo.bind(this);
      this.state.map.addControl(new window.BMap.ScaleControl());
    }
    this.state.rentInfoItems.forEach(rentInfoItem => {
      const { longitude, latitude } = rentInfoItem.coord;
      const position = new window.BMap.Point(longitude, latitude);
      const opts = {
        position,
        offset: new window.BMap.Size(-35, -35)
      };
      const label = new window.BMap.Label(labelContent(rentInfoItem.label, rentInfoItem.count), opts);
      label.addEventListener('click', () => handleLabelClick(rentInfoItem.label, rentInfoItem.value));
      label.setStyle(labelStyle);
      positions.push(position);
      this.state.map.addOverlay(label);
    });

    this.state.map.setViewport(positions);
  }

  async renderAreaLabel(label, value) {
    const city = this.state.city;
    let mapLevel = this.state.mapLevel;
    // 解决清除地图覆盖物的 bug
    setTimeout(() => {
      this.state.map.clearOverlays();
    });
    // 设置当前地区中心
    this.setState({
      city: {
        ...city,
        label,
        value
      },
      mapLevel: ++mapLevel
    });
    await this.renderRentInfoItems(value);
    this.renderLabels();
  }

  async showRentInfo() {
    console.log(this);
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
