import { Component } from 'react';
import { PickerView } from 'antd-mobile';

class FilterPicker extends Component {
  constructor() {
    super();
    this.state = {
      value: null,
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.setState({ value });
  }

  render() {
    const { data, cols } = this.props;
    return (
      <div className="filter-picker">
        <PickerView
          onChange={this.onChange}
          value={this.state.value}
          cols={cols}
          data={data}
        />
      </div>
    );
  }
}

export default FilterPicker;
