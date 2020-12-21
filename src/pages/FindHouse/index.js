import { Component } from 'react';
import { NavBar, Toast } from 'antd-mobile';
import SearchBar from '../../components/SearchBar';
import Filter from '../../components/FindHouse/Filter';
import HouseInfoList from '../../components/HouseInfoList';
import api from '../../utils/api';
import map from '../../utils/map';
import storage from '../../utils/storage';
import './index.scss';

export class FindHouse extends Component {
  constructor() {
    super();
    this.state = {
      city: {
        label: '',
        value: ''
      },
      start: 1,
      houseInfoItems: []
    };
  }

  async getCity() {
    const location = await map.location();
    const name = location.name;
    const [err, res] = await api.getAreaInfo({ name });

    if (err) {
      Toast.fail('获取城市信息失败');
      return;
    }

    const city = res.data.body;

    return city;
  }

  async renderHouseInfoItems(cityId) {
    Toast.loading('获取房源信息中...');
    const [err, res] = await api.getHouses({
      cityId,
      start: 1,
      end: 20
    });

    if (err) {
      Toast.hide();
      Toast.fail('获取房源信息失败');
      return;
    }

    Toast.hide();
    const houseInfoItems = res.data.body.list.map(houseInfoItem => {
      let houseImg = houseInfoItem.houseImg;
      if (!(/^https?:\/\//.test(houseImg))) {
        houseImg = res.config.baseURL + houseInfoItem.houseImg
      }
      return {
        ...houseInfoItem,
        houseImg
      }
    });
    this.setState({ houseInfoItems })
  }

  async componentDidMount() {
    let city = storage.getData('city');
    if (!city) {
      city = await this.getCity();
      storage.setData('city', city);
    }
    this.setState({ city });
    this.renderHouseInfoItems(city.value);
  }

  render() {
    return (
      <div className="findhouse">
        <NavBar
          className="nav-header"
          mode="light"
          onLeftClick={() => this.props.history.goBack()}
          leftContent={<i className="iconfont icon-back"></i>}
        >
          <SearchBar mapIconColor="#00ae66" cityName={this.state.city.label} />
        </NavBar>
        <Filter />
        <HouseInfoList houseInfoItems={this.state.houseInfoItems} />
      </div>
    );
  }
}

export default FindHouse;
