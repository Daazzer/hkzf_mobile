import { Component } from 'react';
import FilterFooter from '../FilterFooter';
import './index.scss';

export class FilterMore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValues: props.defaultValue
    };
  }

  activeClass(value) {
    const selectedValues = this.state.selectedValues;
    return selectedValues.indexOf(value) !== -1 ? 'active' : '';
  }

  renderData(data) {
    if (data) {
      return data.map(item => {
        return (
          <span
            className={`filter-more__tag ${this.activeClass(item.value)}`}
            key={item.value}
            onClick={this.handleClick.bind(this, item.value)}
          >{item.label}</span>
        );
      });
    }
    return null;
  }

  handleClick(value) {
    const selectedValues = this.state.selectedValues;
    const selectedIndex = selectedValues.indexOf(value);

    if (selectedIndex === -1) {
      selectedValues.push(value);
    } else {
      selectedValues.splice(selectedIndex, 1);
    }

    this.setState({
      selectedValues
    });
  }

  render() {
    const { onClose, data, onConfirm } = this.props;
    const {
      roomType,
      oriented,
      floor,
      characteristic
    } = data;

    return (
      <div className="filter-more">
        <div className="filter-more__mask" onClick={onClose}></div>
        <dl className="filter-more__list">
          <dt>户型</dt>
          <dd>{this.renderData(roomType)}</dd>
          <dt>朝向</dt>
          <dd>{this.renderData(oriented)}</dd>
          <dt>楼层</dt>
          <dd>{this.renderData(floor)}</dd>
          <dt>房屋亮点</dt>
          <dd>{this.renderData(characteristic)}</dd>
        </dl>
        <FilterFooter
          className="filter-more__footer"
          onCancel={() => this.setState({ selectedValues: [] })}
          onConfirm={() => onConfirm(this.state.selectedValues)}
          cancelText="清除"
        />
      </div>
    );
  }
}

export default FilterMore;
