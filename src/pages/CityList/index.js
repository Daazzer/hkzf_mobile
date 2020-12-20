import { Component } from 'react';
import { NavBar, Toast, List } from 'antd-mobile';
import api from '../../utils/api';
import './index.scss';
import { List as VList, AutoSizer } from 'react-virtualized';

class CityList extends Component {
  constructor() {
    super();
    this.state = {
      cities: {},
      cityIndexItems: []
    };
    this.rowRenderer = this.rowRenderer.bind(this);
  }

  async renderCityItems() {
    const [err, res] = await api.getAreaCity({ level: 1 });

    if (err) {
      Toast.fail('获取城市列表失败');
      return;
    }

    const cityItems = res.data.body;

    const { cities, cityIndexItems } = this.formatCityData(cityItems);

    this.setState({ cities, cityIndexItems });
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
    const cityIndexItems = Object.keys(cities).sort();
    cityIndexItems.unshift('#', '热');
    return {
      cityIndexItems,
      cities
    }
  }

  componentDidMount() {
    this.renderCityItems();
  }

  rowRenderer(row) {
    return (
      <div
        key={row.key}
        style={row.style}
      >
        <List renderHeader={() => 'Basic Style'} className="my-list">
          <List.Item>Title</List.Item>
        </List>
      </div>
    );
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
        {/* <VList
          height={300}
          rowCount={this.state.list.length}
          rowHeight={100}
          width={300}
          rowRenderer={this.rowRenderer}
        /> */}
      </div>
    );
  }
}

export default CityList;
