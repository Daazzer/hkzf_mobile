import { Component } from 'react';
import { NavBar, Carousel, Toast } from 'antd-mobile';
import HouseDetailInfo from '../../components/Detail/HouseDetailInfo';
import HouseMap from '../../components/Detail/HouseMap';
import HouseAbout from '../../components/Detail/HouseAbout';
import HouseProfile from '../../components/Detail/HouseProfile';
import HouseRecommend from '../../components/Detail/HouseRecommend';
import HouseDetailOption from '../../components/Detail/HouseDetailOption';
import api from '../../utils/api';
import './index.scss';

export class Detail extends Component {
  constructor() {
    super();
    this.state = {
      houseInfo: {
        houseImg: [],
        tags: [],
        oriented: [],
        coord: {},
        supporting: []
      }
    };
  }

  async renderHouseInfo(id) {
    const [err, res] = await api.getHousesById(id);

    if (err) {
      Toast.fail('获取租房详情信息失败');
      return;
    }

    const baseURL = res.config.baseURL;
    let houseInfo = res.data.body;
    houseInfo = {
      ...houseInfo,
      houseImg: houseInfo.houseImg.map(img => baseURL + img)
    };
    this.setState({ houseInfo });
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.renderHouseInfo(id);
  }
  render() {
    const {
      community,
      houseImg,
      title,
      tags,
      price,
      roomType,
      size,
      oriented,
      floor,
      coord,
      supporting,
      description
    } = this.state.houseInfo;
    return (
      <div className="house-detail">
        <NavBar
          mode="light"
          className="nav-header"
          leftContent={<i className="iconfont icon-back"></i>}
          rightContent={<i className="iconfont icon-share"></i>}
          onLeftClick={() => this.props.history.goBack()}
        >{community}</NavBar>
        <Carousel
          autoplay
          infinite
          style={{ height: 252 }}
        >
          {houseImg.map(img => (
            <a
              key={img}
              href="https://lianjia.com"
              style={{ display: 'inline-block', width: '100%' }}
            >
              <img
                src={img}
                alt="房屋照片"
                style={{ display: 'inline-block', width: '100%', height: 252 }}
                onLoad={() => {
                  window.dispatchEvent(new Event('resize'));
                }}
              />
            </a>
          ))}
        </Carousel>
        <HouseDetailInfo
          title={title}
          tags={tags}
          price={price}
          roomType={roomType}
          size={size}
          oriented={oriented}
          floor={floor}
        />
        <HouseMap
          community={community}
          coord={coord}
        />
        <HouseAbout supporting={supporting} />
        <HouseProfile description={description} />
        <HouseRecommend />
        <HouseDetailOption />
      </div>
    );
  }
}

export default Detail;
