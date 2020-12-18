import { Component } from 'react';
import { Carousel, Flex } from 'antd-mobile';
import './index.scss';

function Home() {
  return (
    <div className="home">
      <SearchBar />
      <Swiper />
      <CateNav />
      <RecommendRent />
      <News />
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
      <h2 className="recommend-rent-title">
        租房小组
        <span className="more">更多</span>
      </h2>
      <Flex className="recommend-rent-list" wrap="wrap">
        <div className="recommend-rent-list__item">
          <div className="desc">
            <h3>家住回龙观</h3>
            <p>归属的感觉</p>
          </div>
          <img src="http://localhost:8080/img/groups/1.png" alt="recom" />
        </div>
        <div className="recommend-rent-list__item">
          <div className="desc">
            <h3>家住回龙观</h3>
            <p>归属的感觉</p>
          </div>
          <img src="http://localhost:8080/img/groups/1.png" alt="recom" />
        </div>
        <div className="recommend-rent-list__item">
          <div className="desc">
            <h3>家住回龙观</h3>
            <p>归属的感觉</p>
          </div>
          <img src="http://localhost:8080/img/groups/1.png" alt="recom" />
        </div>
        <div className="recommend-rent-list__item">
          <div className="desc">
            <h3>家住回龙观</h3>
            <p>归属的感觉</p>
          </div>
          <img src="http://localhost:8080/img/groups/1.png" alt="recom" />
        </div>
      </Flex>
    </div>
  );
}

function News() {
  return (
    <div className="news">
      <h2 className="news-title">最新资讯</h2>
      <div className="news-list">
        <Flex className="news-list__item" align="start">
          <img src="http://localhost:8080/img/news/1.png" alt="news-pic" />
          <div className="desc">
            <h3>置业选择 | 安贞西里 三室一厅 河间的古雅别院</h3>
            <p>
              <span>新华网</span>
              <span>两天前</span>
            </p>
          </div>
        </Flex>
        <Flex className="news-list__item" align="start">
          <img src="http://localhost:8080/img/news/1.png" alt="news-pic" />
          <div className="desc">
            <h3>置业选择 | 安贞西里 三室一厅 河间的古雅别院</h3>
            <p>
              <span>新华网</span>
              <span>两天前</span>
            </p>
          </div>
        </Flex>
        <Flex className="news-list__item" align="start">
          <img src="http://localhost:8080/img/news/1.png" alt="news-pic" />
          <div className="desc">
            <h3>置业选择 | 安贞西里 三室一厅 河间的古雅别院</h3>
            <p>
              <span>新华网</span>
              <span>两天前</span>
            </p>
          </div>
        </Flex>
      </div>
    </div>
  );
}

export default Home;
