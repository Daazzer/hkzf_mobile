import { Component } from 'react';
import { NavBar, Toast, List } from 'antd-mobile';
import api from '../../utils/api';
import map from '../../utils/map';
import { List as VList, AutoSizer } from 'react-virtualized';
import './index.scss';

class CityList extends Component {
  constructor() {
    super();
    this.state = {
      cities: {},
      cityIndexes: []
    };
    this.rowRenderer = this.rowRenderer.bind(this);
    this.getRowHeight = this.getRowHeight.bind(this);
  }

  async getCityItems() {
    const [err, res] = await api.getAreaCity({ level: 1 });

    if (err) {
      Toast.fail('获取城市列表失败');
      return;
    }

    return res.data.body;
  }

  async getHotCityItems() {
    const [err, res] = await api.getAreaHot();

    if (err) {
      Toast.fail('获取热门城市信息失败');
      return;
    }

    return res.data.body;
  }

  async getLocationCity() {
    const { name } = await map.location();
    const [err, res] = await api.getAreaInfo({ name });

    if (err) {
      Toast.fail('定位失败');
      return;
    }

    return res.data.body;
  }

  formatCityData(cityItems) {
    const cities = {}
    cityItems.forEach(cityItem => {
      const firstLetter = cityItem.short[0].toUpperCase();
      if (cities[firstLetter]) {
        cities[firstLetter].push(cityItem);
      } else {
        cities[firstLetter] = [cityItem];
      }
    });
    const cityIndexes = Object.keys(cities).sort();
    return {
      cityIndexes,
      cities
    }
  }

  rowRenderer({ key, index, style }) {
    const { cities, cityIndexes } = this.state;
    const firstLetter = cityIndexes[index];
    const cityItems = cities[firstLetter];
    let label = '';

    switch (firstLetter) {
      case '#':
        label = '当前定位';
        break;
      case 'hot':
        label = '热门城市';
        break;
      default:
        label = firstLetter;
        break;
    }

    return (
      <div
        key={key}
        style={style}
      >
        <List renderHeader={() => label} className="my-list">
          {cityItems.map(cityItem =>
            <List.Item key={cityItem.value}>{cityItem.label}</List.Item>
          )}
        </List>
      </div>
    );
  }

  getRowHeight({ index }) {
    const { cities, cityIndexes } = this.state;
    const firstLetter = cityIndexes[index];
    const cityItems = cities[firstLetter];

    return 36 + 50 * cityItems.length;
  }

  async componentDidMount() {
    const cityItems = await this.getCityItems();
    const hotCityItems = await this.getHotCityItems();
    const locationCity = await this.getLocationCity();
    const { cities, cityIndexes } = this.formatCityData(cityItems);
    cityIndexes.unshift('#', 'hot');
    cities.hot = hotCityItems;
    cities['#'] = [locationCity];
    this.setState({
      cities,
      cityIndexes
    });
  }

  render() {
    return (
      <div className="citylist">
        <NavBar
          className="nav-header"
          mode="light"
          leftContent={<i className="iconfont icon-back"></i>}
          onLeftClick={() => this.props.history.goBack()}
        >城市选择</NavBar>
        <AutoSizer>
          {({ width, height }) =>
            <VList
              width={width}
              height={height}
              rowCount={this.state.cityIndexes.length}
              rowHeight={this.getRowHeight}
              rowRenderer={this.rowRenderer}
            />
          }
        </AutoSizer>
      </div>
    );
  }
}

export default CityList;
