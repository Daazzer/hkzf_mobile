import { Flex } from 'antd-mobile';
import './index.scss';

function FilterTitle() {
  const filterItems = [
    '区域',
    '方式',
    '租金',
    '筛选'
  ];

  return (
    <Flex className="filter-title" align="center">
      {filterItems.map(filterItem =>
        <Flex.Item className="filter-title__item" key={filterItem}>
          {filterItem}
          <i className="iconfont icon-arrow"></i>
        </Flex.Item>
      )}
    </Flex>
  );
}

export default FilterTitle;
