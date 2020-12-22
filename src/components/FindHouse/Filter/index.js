import { Component } from 'react';
import FilterTitle from '../FilterTitle';
import FilterPicker from '../FilterPicker';
import FilterFooter from '../FilterFooter';
import './index.scss';

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      activeType: ''
    };
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onOpen(activeType) {
    this.setState({ activeType });
    document.body.classList.add('body-fixed');
  }

  onClose() {
    this.setState({ activeType: '' });
    document.body.classList.remove('body-fixed');
  }

  render() {
    const activeType = this.state.activeType;
    const isActiveComponent = ['area', 'mode', 'price'].indexOf(activeType) !== -1;

    return (
      <div className="filter">
        {isActiveComponent ? <div className="filter-mask" onClick={this.onClose}></div> : null}
        <div className="filter-content">
          <FilterTitle
            onOpen={this.onOpen}
            activeType={activeType}
          />
          {isActiveComponent ? <FilterPicker /> : null}
          {isActiveComponent ? <FilterFooter /> : null}
        </div>
      </div>
    );
  }
}

export default Filter;
