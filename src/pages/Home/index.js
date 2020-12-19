import { Component } from 'react';
import {
  Carousel,
  Flex,
  Toast,
  ActivityIndicator,
  Grid
} from 'antd-mobile';
import {
  getSwiper,
  getGroups,
  getNews,
  getAreaInfo
} from '../../utils/api';
import map from '../../utils/map';
import './index.scss';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      city: {
        name: '上海',
        area: 'AREA|dbf46d32-7e76-1196'
      },
      rentItems: [],
      newsItems: [],
      loading: false
    };
  }

  async renderCityInfo() {
    const location = await map.location();
    const name = location.name;
    const [err, res] = await getAreaInfo({ name });

    if (err) {
      Toast.fail('获取城市信息失败');
      return;
    }

    const { label, value } = res.data.body;

    const city = {
      name: label,
      area: value
    };

    this.setState({ city });
  }

  async renderRentItems() {
    const area = this.state.city.area;
    this.setState({ loading: true });
    const [err, res] = await getGroups({
      area
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

  async renderNewsItems() {
    const area = this.state.city.area;
    this.setState({ loading: true });
    const [err, res] = await getNews({ area });

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

  async componentDidMount() {
    await this.renderCityInfo();
    this.renderRentItems();
    this.renderNewsItems();
  }

  render() {
    return (
      <div className="home">
        <SearchBar cityName={this.state.city.name} />
        <Swiper />
        <CateNav />
        <RecommendRent
          rentItems={this.state.rentItems}
          loading={this.state.loading}
        />
        <News
          newsItems={this.state.newsItems}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

class SearchBar extends Component {
  render() {
    const cityName = this.props.cityName;

    return (
      <Flex className="search-bar">
        <Flex  className="search-bar__search">
          <div className="city">
            <span>{cityName}</span>
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
}

class Swiper extends Component {
  constructor() {
    super();
    this.state = {
      carouselItems: []
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
  render() {
    const rentItems = this.props.rentItems;
    const loading = this.props.loading;
    let recommendRentList = null;

    if (rentItems.length === 0 && !loading) {
      recommendRentList = <div className="recommend-rent--none">暂无数据</div>;
    } else if (loading) {
      recommendRentList = (
        <div className="recommend-rent--loading">
          <ActivityIndicator text="加载中..." />
        </div>
      );
    } else {
      recommendRentList = (
        <Grid
          className="recommend-rent-list"
          data={rentItems}
          square={false}
          hasLine={false}
          columnNum={2}
          renderItem={rentItem =>
            <div className="recommend-rent-list__item" key={rentItem.id}>
              <div className="desc">
                <h3>{rentItem.title}</h3>
                <p>{rentItem.desc}</p>
              </div>
              <img src={rentItem.imgSrc} alt="recom" />
            </div>
          }
        />
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
  render() {
    const newsItems = this.props.newsItems;
    const loading = this.props.loading;
    let newsList = null;

    if (newsItems.length === 0 && !loading) {
      newsList = <div className="news-list--none">暂无数据</div>;
    } else if (loading) {
      newsList = (
        <div className="news-list--loading">
          <ActivityIndicator text="加载中..." />
        </div>
      );
    } else {
      newsList = (
        <div className="news-list">
          {newsItems.map(newsItem =>
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
