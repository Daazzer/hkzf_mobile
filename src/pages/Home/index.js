import { Component } from 'react';
import { Carousel, Flex } from 'antd-mobile';
import './index.scss';

function Home() {
  return (
    <div className="home">
      <SearchBar />
      <Swiper />
      <CateNav />
    </div>
  );
}

class Swiper extends Component {
  constructor() {
    super();
    this.state = {
      data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      imgHeight: 176,
    }
  }
  render() {
    return (
      <Carousel
        autoplay
        infinite
        autoplayInterval={5000}
      >
        {this.state.data.map(val => (
          <img
            src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
            alt="a"
            style={{ width: '100%', verticalAlign: 'top' }}
            onLoad={() => {
              // fire window resize event to change height
              window.dispatchEvent(new Event('resize'));
              this.setState({ imgHeight: 'auto' });
            }}
            key={val}
          />
        ))}
      </Carousel>
    );
  }
}

function SearchBar() {
  return (
    <Flex className="search-bar">
      <Flex  className="search-bar__search">
        <div className="city">
          <span>广州</span>
          <i className="iconfont icon-arrow"></i>
        </div>
        <div className="address">
          <i className="iconfont icon-seach"></i>
          <span>请输入小区或地址</span>
        </div>
      </Flex>
      <i className="search-bar__map iconfont icon-map"></i>
    </Flex>
  );
}

function CateNav() {
  return (
    <Flex>
      <Flex.Item>
        整租
      </Flex.Item>
      <Flex.Item>
        合租
      </Flex.Item>
      <Flex.Item>
        地图找房
      </Flex.Item>
      <Flex.Item>
        去出租
      </Flex.Item>
    </Flex>
  );
}

export default Home;
