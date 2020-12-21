import { Component } from 'react';
import { NavBar } from 'antd-mobile';
import SearchBar from '../../components/SearchBar';

export class FindHouse extends Component {
  render() {
    return (
      <div className="findhouse">
        <NavBar className="nav-header" mode="light" leftContent={<i className="iconfont icon-back"></i>}>
          <SearchBar mapIconColor="#00ae66" />
        </NavBar>
      </div>
    );
  }
}

export default FindHouse;
