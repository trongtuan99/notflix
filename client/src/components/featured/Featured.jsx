import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import "./featured.scss";

export default function Featured({ type }) {
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre">
            <option>Thể loại</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
          </select>
        </div>
      )}
      <img
        src="https://i.ytimg.com/vi/sKrrEfpAapI/maxresdefault.jpg"
        alt=""
      />
      <div className="info">
        <span className="desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
          adipisci repellendus eum quasi illo, velit numquam, maxime tempora
          sint deleniti, aliquid qui? Facilis, adipisci! Ratione hic repudiandae
          temporibus eum earum?
        </span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Phảt</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Thông tin</span>
          </button>
        </div>
      </div>
    </div>
  );
}