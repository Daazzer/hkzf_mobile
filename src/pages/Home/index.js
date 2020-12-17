import { Component } from 'react';
import { Carousel, Flex } from 'antd-mobile';
import './index.scss';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      imgHeight: 176,
    }
  }
  render() {
    return (
      <div className="home">
        <Flex className="search-bar">
          <Flex.Item className="search-bar__search">
            <Flex>
              <div className="city">
                <span>广州</span>
                <i className="iconfont icon-arrow"></i>
              </div>
              <div className="address">
                <i className="iconfont icon-seach"></i>
                <span>请输入小区或地址</span>
              </div>
            </Flex>
          </Flex.Item>
          <i className="search-bar__map iconfont icon-map"></i>
        </Flex>

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
      </div>
    );
  }
}

export default Home;
