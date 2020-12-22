import { Component } from 'react';
import { NavBar, Toast, ActivityIndicator } from 'antd-mobile';
import {
  WindowScroller,
  AutoSizer,
  List,
  InfiniteLoader
} from 'react-virtualized';
import SearchBar from '../../components/SearchBar';
import Filter from '../../components/FindHouse/Filter';
import HouseInfoItem from '../../components/HouseInfoItem';
import Sticky from '../../components/Sticky';
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
      count: 0,
      isSticky: false,
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

  isRowLoaded({ index }) {
    return !!this.state.houseInfoItems[index];
  }

  loadMoreRows({ startIndex, stopIndex }) {
    // TODO 过快滚动时会有 startIndex 相同的情况
    return this.renderHouseInfoItems(this.state.city.value, startIndex + 1, stopIndex + 1);
  }

  async renderHouseInfoItems(cityId, start, end) {
    Toast.loading('获取房源信息中...');
    const [err, res] = await api.getHouses({
      cityId,
      start,
      end
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
    const count = res.data.body.count;
    this.setState({
      houseInfoItems: [...this.state.houseInfoItems, ...houseInfoItems],
      count
    });
  }

  onScroll({ scrollTop }) {
    if (scrollTop > 45) {
      this.setState({ isSticky: true });
    } else {
      this.setState({ isSticky: false });
    }
  }

  renderHouseList({ key, index, style }) {
    const houseInfoItem = this.state.houseInfoItems[index];

    if (!houseInfoItem) {
      return (
        <li className="findhouse-house-list__item--loading" key={key} style={style}>
          <div className="item-bg">
            <ActivityIndicator size="large" text="加载中..." />
          </div>
        </li>
      );
    }

    return (
      <HouseInfoItem
        key={key}
        style={style}
        title={houseInfoItem.title}
        houseCode={houseInfoItem.houseCode}
        houseImg={houseInfoItem.houseImg}
        desc={houseInfoItem.desc}
        tags={houseInfoItem.tags}
        price={houseInfoItem.price}
      />
    );
  }

  get renderList() {
    const count = this.state.count;  // 列表总条数

    if (count === 0) {
      return <li className="findhouse-house-list__item--none">暂无数据</li>;
    }

    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded.bind(this)}
        loadMoreRows={this.loadMoreRows.bind(this)}
        rowCount={count}
      >
        {({ onRowsRendered, registerChild }) =>
          <WindowScroller>
            {({ height, isScrolling, scrollTop }) =>
              <AutoSizer>
                {({ width }) =>
                  <List
                    onRowsRendered={onRowsRendered}
                    ref={registerChild}
                    autoHeight
                    width={width}
                    height={height}
                    rowCount={count}
                    rowHeight={120}
                    rowRenderer={this.renderHouseList.bind(this)}
                    isScrolling={isScrolling}
                    scrollTop={scrollTop}
                  />
                }
              </AutoSizer>
            }
          </WindowScroller>
        }
      </InfiniteLoader>
    );
  }

  async componentDidMount() {
    let city = storage.getData('city');
    if (!city) {
      city = await this.getCity();
      storage.setData('city', city);
    }

    this.setState({ city });
    this.renderHouseInfoItems(city.value, 1, 20);
    this.forceUpdate();
  }

  render() {
    return (
      <WindowScroller onScroll={this.onScroll.bind(this)}>
        {
          () =>
          <div className="findhouse">
            <NavBar
              className="nav-header"
              mode="light"
              onLeftClick={() => this.props.history.goBack()}
              leftContent={<i className="iconfont icon-back"></i>}
            >
              <SearchBar mapIconColor="#00ae66" cityName={this.state.city.label} />
            </NavBar>
            <Sticky holderHeight={40} isSticky={this.state.isSticky}>
              <Filter id={this.state.city.value} />
            </Sticky>
            <div className="findhouse-house-list">
              {this.renderList}
            </div>
          </div>
        }
      </WindowScroller>
    );
  }
}

export default FindHouse;
