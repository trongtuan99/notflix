import { useContext, useEffect, useState } from "react";
import "./newList.css";
import storage from "../../firebase";
import { createMovie, getMovies } from "../../context/movieContext/apiCall.jsx";
import { MovieContext } from "../../context/movieContext/MovieContext.jsx";
import { ListContext } from "../../context/listContext/ListContext.jsx";
import { createList } from "../../context/listContext/apiCall.jsx";
import { useHistory } from "react-router-dom";

export default function NewList() {
  const [list, setList] = useState(null);
  const history = useHistory()

  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);

  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  const handleChange = (e) => {
    const value = e.target.value;
    console.log(value);
    setList({ ...list, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createList(list, dispatch);
    history.push("/lists")
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New List</h1>
      <form className="addProductForm">
        <div className="formLeft">
          <div className="addProductItem">
            <label>Title</label>
            <input
              type="text"
              placeholder="Popular Movies"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Thể loại</label>
            <select name="genre" onChange={handleChange}>
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
          <div className="addProductItem">
            <label>Type</label>
            <select name="type" onChange={handleChange}>
              <option>Type</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
        </div>
        <div className="formRight">
          <div className="addProductItem">
            <label>Content</label>
            <select
              multiple
              name="content"
              onChange={handleSelect}
              style={{ height: "280px" }}
            >
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="addProductButton" onClick={handleSubmit}>
          Create
        </button>
      </form>
    </div>
  );
}