import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import "./featured.scss";
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Featured({ type }) {
  const [content, setContent] =  useState({})
  useEffect(() => {
    const getRandomMovie  = async () => {
      try{
        const res = await axios.get(
          `/movies/random?type=${type}`,
          {
            headers: {
              token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDFiNGJjMDI0YmNjNDAyYzk3ODYyYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3ODE1NTE2NSwiZXhwIjoxNjc4NTg3MTY1fQ.8Mm0mz4OvVSs_6QwHcJv5dqlSudgm1ehqeBGYYYfwRI",
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
        src={content.image}
        alt={content.imageTitle}
      />
      <div className="info">
        <span className="desc">
          {content.desc}
        </span>
        <div className="buttons">
          <button className="play">
            <Link className="link" to={{pathname: "/watch", movie: content}} style={{display: 'flex', alignItems: 'center'}}>
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