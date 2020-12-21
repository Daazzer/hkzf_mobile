import { withRouter } from 'react-router-dom';
import './index.scss';

function HouseInfoList(props) {
  const { houseInfoItems, history } = props;

  return (
    <ul className="house-info-list">
      {houseInfoItems.map(houseInfoItem => {
        const tags = houseInfoItem.tags;
        let infoContentTags = null

        if (tags.length > 0) {
          infoContentTags = (
            <div className="info-content__tags">
              {tags.map((tag, i) =>
                <span key={tag} className={`tag tag${i+1}`}>{tag}</span>
              )}
            </div>
          );
        }
        return (
          <li
            className="house-info-list__item"
            key={houseInfoItem.houseCode}
            onClick={() => history.push(`/detail/${houseInfoItem.houseCode}`)}
          >
            <img src={houseInfoItem.houseImg} alt="house info" />
            <div className="info-content">
              <h3>{houseInfoItem.title}</h3>
              <p className="info-content__desc">{houseInfoItem.desc}</p>
              {infoContentTags}
              <p className="info-content__price">
                <strong>{houseInfoItem.price}</strong>元/月
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

const HouseInfoListWithRouter = withRouter(HouseInfoList);

export default HouseInfoListWithRouter;
