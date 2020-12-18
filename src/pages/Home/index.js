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
  const cateNavs = [
    {
      title: '整租',
      image: require('@/assets/images/nav-1.png').default
    },
    {
      title: '合租',
      image: require('@/assets/images/nav-2.png').default
    },
    {
      title: '地图找房',
      image: require('@/assets/images/nav-3.png').default
    },
    {
      title: '去出租',
      image: require('@/assets/images/nav-4.png').default
    }
  ];

  return (
    <Flex className="cate-nav">
      {cateNavs.map(cateNav =>
        <Flex.Item className="cate-nav__item" key={cateNav.title}>
          <img src={cateNav.image} alt="cateNavIcon" />
          <h2>{cateNav.title}</h2>
        </Flex.Item>
      )}
    </Flex>
  );
}

function RecommendRent() {
  return (
    <div className="recommend-rent">
      <h2>
        租房小组
        <span className="more">更多</span>
      </h2>
      <Flex>
        <Flex.Item>
          家住回龙观
        </Flex.Item>
      </Flex>
    </div>
  );
}

export default Home;
