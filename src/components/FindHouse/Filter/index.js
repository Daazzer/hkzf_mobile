import FilterTitle from '../FilterTitle';
import FilterPicker from '../FilterPicker';
import FilterFooter from '../FilterFooter';
import './index.scss';

function Filter() {
  return (
    <div className="filter">
      <div className="filter-mask"></div>
      <div className="filter-content">
        <FilterTitle />
        <FilterPicker />
        <FilterFooter />
      </div>
    </div>
  );
}

export default Filter;
