import { Component } from 'react';
import { Carousel } from 'antd-mobile';

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

export default Home;
