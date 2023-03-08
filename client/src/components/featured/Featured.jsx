import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import "./featured.scss";
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Featured({ type, setGenre }) {
  const [content, setContent] =  useState({})
  useEffect(() => {
    const getRandomMovie  = async () => {
      try{
        const res = await axios.get(
          `/movies/random?type=${type}`,
          {
            headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("userClient")).accessToken,
            },
          }
        );
        setContent(res.data[0])
      }catch(err){
        console.log(err);
      }
    }
    getRandomMovie()
  }, [type])
  return (
    <div className="featured">
    {type && (
      <div className="category">
        <span>{type === "movie" ? "Movies" : "Series"}</span>
        <select name="genre" id="genre" onChange={(e) => setGenre(e.target.value)}>
        <option>Thể loại</option>
        <option value="action">Hành Động</option>
        <option value="adventure">Khám phá</option>
        <option value="comedy">Hài</option>
        <option value="crime">Tội Phạm</option>
        <option value="fantasy">Fantasy</option>
        <option value="historical">Lịch sử</option>
        <option value="horror">Kinh dị</option>
        </select>
      </div>
    )}
    <img
      src={content?.image || "https://static2.vieon.vn/vieplay-image/thumbnail_v4/2022/09/28/bof5oooq_1920x1080-avatar.png"}
      alt={content?.imageTitle || "Tiêu đề"}
    />
    <div className="info">
      <span className="desc">
        {content?.desc || "Mô tả"}
      </span>
      <div className="buttons">
        <button className="play">
          <Link className="link" to={{pathname: "/watch", movie: content || ""}} style={{display: 'flex', alignItems: 'center'}}>
            <PlayArrow />
            <span>Phảt</span>
          </Link>
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