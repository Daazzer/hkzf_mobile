import { Component } from 'react';
import { NavBar, Toast } from 'antd-mobile';
import myMap from '../../utils/map';
import { getAreaInfo, getAreaMap } from '../../utils/api';
import './index.scss';

export class Map extends Component {
  constructor() {
    super();
    this.state = {
      map: null,
      city: {
        name: '',
        id: '',
        center: null
      },
      rentItems: [],
      loading: false
    };
  }

  async componentDidMount() {
    await this.renderMap();
    await this.renderAreaInfo();
    await this.renderCityLevel();
    this.renderLabel();
  }

  async handleLabelClick(city, name, id) {
    this.state.map.clearOverlays();
    this.setState({
      city: {
        ...city,
        name,
        id
      }
    });
    await this.renderCityLevel();
    await this.renderLabel();
  }

  async getLocation() {
    Toast.loading('定位中...');
    const location = await myMap.location();
    const { name, center } = location;
    const city = this.state.city;
    this.setState({
      city: {
        ...city,
        name,
        center
      }
    });
    Toast.hide();
  }

  async renderAreaInfo() {
    Toast.loading('获取城市信息中...');
    const city = this.state.city;
    const [err, res] = await getAreaInfo({ name: city.name });

    if (err) {
      Toast.hide();
      Toast.fail('定位失败');
      return;
    }

    const id = res.data.body.value;
    this.setState({
      city: {
        ...city,
        id
      }
    });
    Toast.hide();
  }

  async renderMap() {
    const map = new window.BMap.Map('mapGL');
    this.setState({ map });
    await this.getLocation();
    map.centerAndZoom(this.state.city.center, 12);
    map.addControl(new window.BMap.NavigationControl());
  }

  async renderCityLevel() {
    Toast.loading('获取租房信息中...');
    const id = this.state.city.id;
    const [err, res] = await getAreaMap({ id });

    if (err) {
      Toast.hide();
      Toast.fail('获取租房信息失败');
      return;
    }

    const rentItems = res.data.body;
    this.setState({ rentItems });
    Toast.hide();
  }

  renderLabel() {
    const positions = [];
    // const labels = [];
    const labelStyle = {
      color: '#fff',
      borderRadius: '50%',
      border: '2px solid #fff',
      fontSize: '12px',
      height: '70px',
      width: '70px',
      backgroundColor: 'rgba(12, 181, 106, 0.8)'
    };
    this.state.rentItems.forEach(rentItem => {
      const { longitude, latitude } = rentItem.coord;
      const position = new window.BMap.Point(longitude, latitude);
      const opts = {
        position,
        offset: new window.BMap.Size(-35, -35)
      };
      const label = new window.BMap.Label(
        `<div class="map-bubble">
          <p class="map-bubble__title">${rentItem.label}</p>
          <p class="map-bubble__content">${rentItem.count}套</p>
        </div>`,
        opts
      );
      label.addEventListener('click', () => {
        this.handleLabelClick(
          this.state.city,
          rentItem.label,
          rentItem.value
        );
      });
      label.setStyle(labelStyle);
      positions.push(position);
      this.state.map.addOverlay(label);
    });

    this.state.map.setViewport(positions);
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
