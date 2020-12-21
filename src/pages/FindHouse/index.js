import { Component } from 'react';
import { NavBar, Toast } from 'antd-mobile';
import SearchBar from '../../components/SearchBar';
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
      }
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

  async componentDidMount() {
    let city = storage.getData('city');
    if (!city) {
      city = await this.getCity();
      storage.setData('city', city);
    }
    this.setState({ city });
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
      </div>
    );
  }
}

export default FindHouse;
