import { Flex } from 'antd-mobile';
import './index.scss';

function FilterFooter() {
  return (
    <Flex className="filter-footer">
      <button className="filter-footer__btn filter-footer__btn--cancel">取消</button>
      <button className="filter-footer__btn filter-footer__btn--confirm">确定</button>
    </Flex>
  );
}

export default FilterFooter;
