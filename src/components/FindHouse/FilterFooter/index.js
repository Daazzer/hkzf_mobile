import { Flex } from 'antd-mobile';
import './index.scss';

function FilterFooter(props) {
  const { onCancel, onConfirm } = props;

  return (
    <Flex className="filter-footer">
      <button className="filter-footer__btn filter-footer__btn--cancel" onClick={onCancel}>取消</button>
      <button className="filter-footer__btn filter-footer__btn--confirm" onClick={onConfirm}>确定</button>
    </Flex>
  );
}

export default FilterFooter;
