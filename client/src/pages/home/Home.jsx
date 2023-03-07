import React, { useState, useEffect } from 'react'
import "./home.scss";
import Navbar from "../../components/navbar/Navbar.jsx";
import List from "../../components/list/List.jsx";
import Featured from "../../components/featured/Featured.jsx"
import axios from 'axios'

const Home = ({type}) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDFiNGJjMDI0YmNjNDAyYzk3ODYyYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3ODE1NTE2NSwiZXhwIjoxNjc4NTg3MTY1fQ.8Mm0mz4OvVSs_6QwHcJv5dqlSudgm1ehqeBGYYYfwRI",
            },
          }
        );
        setLists(res.data);
        console.log(lists);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type}/>
      {
        lists && lists.map((list) => {
          return <List key={list._id} list={list}/>
        })
      }
    </div>
  );
};

export default Home