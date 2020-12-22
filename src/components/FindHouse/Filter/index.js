import { Component } from 'react';
import { Toast } from 'antd-mobile';
import FilterTitle from '../FilterTitle';
import FilterPicker from '../FilterPicker';
import FilterFooter from '../FilterFooter';
import api from '../../../utils/api';
import './index.scss';

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      activeType: '',
      conditionsData: null
    };
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  onOpen(activeType) {
    this.setState({ activeType });
    document.body.classList.add('body-fixed');
  }

  onClose() {
    this.closePicker();
  }

  onCancel() {
    this.closePicker();
  }

  onConfirm() {
    this.closePicker();
  }

  closePicker() {
    this.setState({ activeType: '' });
    document.body.classList.remove('body-fixed');
  }

  async renderConditionsData(id) {
    const [err, res] = await api.getHousesCondition({ id });

    if (err) {
      Toast.fail('获取房屋查询信息失败');
      return;
    }

    this.setState({ conditionsData: res.data.body });
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.renderConditionsData(this.props.id);
    }
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
          {isActiveComponent ? <FilterFooter onCancel={this.onCancel} onConfirm={this.onConfirm} /> : null}
        </div>
      </div>
    );
  }
}

export default Filter;
