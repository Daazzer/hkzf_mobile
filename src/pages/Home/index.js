import { Component } from 'react';
import { Carousel, Flex, Toast, ActivityIndicator } from 'antd-mobile';
import { getSwiper, getGroups, getNews } from '../../utils/api';
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
      carouselItems: [],
    };
    this.renderCarousel();
  }

  async renderCarousel () {
    const [err, res] = await getSwiper();

    if (err) {
      Toast.fail('获取轮播图失败');
      return;
    }

    const baseURL = res.config.baseURL;

    const carouselItems = res.data.body.map(carouselItem => ({
      ...carouselItem,
      imgSrc: baseURL + carouselItem.imgSrc
    }))

    this.setState({
      carouselItems
    });
  }

  render() {
    return (
      <Carousel
        autoplay
        infinite
        autoplayInterval={5000}
      >
        {this.state.carouselItems.map(carouselItem => (
          <img
            key={carouselItem.id}
            src={carouselItem.imgSrc}
            alt={carouselItem.alt}
            style={{ width: '100%', verticalAlign: 'top' }}
            onLoad={() => window.dispatchEvent(new Event('resize'))}
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

class RecommendRent extends Component {
  constructor() {
    super();
    this.state = {
      rentItems: [],
      loading: false
    };
  }

  async renderRentItems() {
    this.setState({ loading: true });
    const [err, res] = await getGroups({
      area: 'AREA|88cff55c-aaa4-e2e0'
    });

    if (err) {
      this.setState({ loading: false });
      return Toast.fail('获取租房推荐列表信息失败');
    }

    const baseURL = res.config.baseURL;
    const rentItems = res.data.body.map(rentItem => ({
      ...rentItem,
      imgSrc: baseURL + rentItem.imgSrc
    }));
    this.setState({ loading: false });
    this.setState({ rentItems });
  }

  componentDidMount() {
    this.renderRentItems();
  }

  render() {
    let recommendRentList = null;
    if (this.state.rentItems.length === 0 && !this.state.loading) {
      recommendRentList = <div className="recommend-rent--none">暂无数据</div>;
    } else if (this.state.loading) {
      recommendRentList = (
        <div className="recommend-rent--loading">
          <ActivityIndicator text="加载中..." />
        </div>
      );
    } else {
      recommendRentList = (
        <Flex className="recommend-rent-list" wrap="wrap">
          {this.state.rentItems.map(rentItem =>
            <div className="recommend-rent-list__item" key={rentItem.id}>
              <div className="desc">
                <h3>{rentItem.title}</h3>
                <p>{rentItem.desc}</p>
              </div>
              <img src={rentItem.imgSrc} alt="recom" />
            </div>
          )}
        </Flex>
      );
    }

    return (
      <div className="recommend-rent">
        <h2 className="recommend-rent-title">
          租房小组
          <span className="more">更多</span>
        </h2>
        {recommendRentList}
      </div>
    );
  }
}

class News extends Component {
  constructor() {
    super();
    this.state = {
      newsItems: [],
      loading: false
    };
  }

  async renderNewsItems() {
    this.setState({ loading: true });
    const [err, res] = await getNews({ area: 'AREA|88cff55c-aaa4-e2e0' });

    if (err) {
      Toast.fail('获取最新资讯信息失败');
      this.setState({ loading: false });
      return;
    }

    const baseURL = res.config.baseURL;
    const newsItems = res.data.body.map(newsItem => ({
      ...newsItem,
      imgSrc: baseURL + newsItem.imgSrc
    }));
    this.setState({ newsItems });
    this.setState({ loading: false });
  }

  componentDidMount() {
    this.renderNewsItems();
  }

  render() {
    let newsList = null;
    if (this.state.newsItems.length === 0 && !this.state.loading) {
      newsList = <div className="news-list--none">暂无数据</div>;
    } else if (this.state.loading) {
      newsList = (
        <div className="news-list--loading">
          <ActivityIndicator text="加载中..." />
        </div>
      );
    } else {
      newsList = (
        <div className="news-list">
          {this.state.newsItems.map(newsItem =>
            <Flex className="news-list__item" align="start" key={newsItem.id}>
              <img src={newsItem.imgSrc} alt="news-pic" />
              <div className="desc">
                <h3>{newsItem.title}</h3>
                <p>
                  <span>{newsItem.from}</span>
                  <span>{newsItem.date}</span>
                </p>
              </div>
            </Flex>
          )}
        </div>
      );
    }

    return (
      <div className="news">
        <h2 className="news-title">最新资讯</h2>
        {newsList}
      </div>
    );
  }
}

export default Home;
