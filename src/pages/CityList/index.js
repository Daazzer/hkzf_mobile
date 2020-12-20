import { Component, createRef } from 'react';
import { NavBar, Toast, List } from 'antd-mobile';
import { List as VList, AutoSizer } from 'react-virtualized';
import api from '../../utils/api';
import map from '../../utils/map';
import './index.scss';

class CityList extends Component {
  constructor() {
    super();
    this.state = {
      cities: {},
      cityIndexes: [],
      curIndex: 0
    };
    this.rowRenderer = this.rowRenderer.bind(this);
    this.getRowHeight = this.getRowHeight.bind(this);
    this.onRowsRendered = this.onRowsRendered.bind(this);
    this.vListRef = createRef();
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
      case 'Hot':
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
        <List renderHeader={label} className="citylist-list">
          {cityItems.map(cityItem =>
            <List.Item
              className="citylist-list__item"
              key={cityItem.value}
              onClick={() => this.props.history.push('/')}
            >{cityItem.label}</List.Item>
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

  onRowsRendered({ startIndex }) {
    if (this.state.curIndex !== startIndex) {
      this.setState({
        curIndex: startIndex
      });
    }
  }

  async componentDidMount() {
    const cityItems = await this.getCityItems();
    const hotCityItems = await this.getHotCityItems();
    const locationCity = await this.getLocationCity();
    const { cities, cityIndexes } = this.formatCityData(cityItems);
    cityIndexes.unshift('#', 'Hot');
    cities.Hot = hotCityItems;
    cities['#'] = [locationCity];
    this.setState({
      cities,
      cityIndexes
    });
    this.vListRef.current.measureAllRows();
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
        <ul className="citylist-index">
          {this.state.cityIndexes.map((cityIndex, index) =>
            <li
              className={`citylist-index__item ${this.state.curIndex === index ? 'active' : ''}`}
              onClick={() => {
                this.vListRef.current.scrollToRow(index);
                this.setState({
                  curIndex: index
                });
              }}
            >
              {cityIndex === 'Hot' ? '热' : cityIndex}
            </li>
          )}
        </ul>
        <AutoSizer>
          {({ width, height }) =>
            <VList
              ref={this.vListRef}
              width={width}
              height={height}
              rowCount={this.state.cityIndexes.length}
              rowHeight={this.getRowHeight}
              rowRenderer={this.rowRenderer}
              onRowsRendered={this.onRowsRendered}
              scrollToAlignment="start"
            />
          }
        </AutoSizer>
      </div>
    );
  }
}

export default CityList;
