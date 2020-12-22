import { Component } from 'react';
import { PickerView } from 'antd-mobile';

const seasons = [
  {
    label: '春',
    value: '春',
  },
  {
    label: '夏',
    value: '夏',
  },
];
class FilterPicker extends Component {
  constructor() {
    super();
    this.state = {
      value: null,
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    console.log(value, 'change');
    this.setState({
      value,
    });
  }

  onScrollChange(value) {
    console.log(value);
  }

  render() {
    return (
      <div className="filter-picker">
        <PickerView
          onChange={this.onChange}
          onScrollChange={this.onScrollChange}
          value={this.state.value}
          data={seasons}
          cascade={false}
        />
      </div>
    );
  }
}

export default FilterPicker;
