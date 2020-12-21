import { Flex } from 'antd-mobile';
import './index.scss';

function Filter() {
  const filterItems = [
    '区域',
    '方式',
    '租金',
    '筛选'
  ];

  return (
    <Flex className="filter" align="center">
      {filterItems.map(filterItem =>
        <Flex.Item className="filter__item" key={filterItem}>
          {filterItem}
          <i className="iconfont icon-arrow"></i>
        </Flex.Item>
      )}
    </Flex>
  );
}

export default Filter;
