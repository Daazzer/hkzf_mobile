import { Component } from 'react';
import { NavBar, Carousel } from 'antd-mobile';
import HouseInfo from '../../components/Detail/HouseInfo';
import HouseMap from '../../components/Detail/HouseMap';
import './index.scss';

export class Detail extends Component {
  constructor() {
    super();
    this.state = {
      data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      imgHeight: 176,
    };
  }
  componentDidMount() {
    console.log('id: ' + this.props.match.params.id);
  }
  render() {
    return (
      <div className="house-detail">
        <NavBar
          mode="light"
          className="nav-header"
          leftContent={<i className="iconfont icon-back"></i>}
          rightContent={<i className="iconfont icon-share"></i>}
          onLeftClick={() => this.props.history.goBack()}
        >绿谷康都</NavBar>
        <Carousel
          autoplay={false}
          infinite
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
        >
          {this.state.data.map(val => (
            <a
              key={val}
              href="https://lianjia.com"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
        <HouseInfo />
        <HouseMap />
      </div>
    );
  }
}

export default Detail;
