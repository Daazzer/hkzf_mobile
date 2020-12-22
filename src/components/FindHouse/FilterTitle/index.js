import { Flex } from 'antd-mobile';
import './index.scss';

function FilterTitle() {
  const curIndex = 0;
  const filterItems = [
    {
      title: '区域',
    },
    {
      title: '方式',
    },
    {
      title: '租金',
    },
    {
      title: '筛选',
    }
  ];

  const activeClass = i => i === curIndex ? 'active' : '';

  return (
    <Flex className="filter-title" align="center">
      {filterItems.map((filterItem, index) =>
        <Flex.Item className={`filter-title__item ${activeClass(index)}`} key={filterItem.title}>
          {filterItem.title}
          <i className="iconfont icon-arrow"></i>
        </Flex.Item>
      )}
    </Flex>
  );
}

export default FilterTitle;
