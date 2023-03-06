import React from 'react'
import "./home.scss";
import Navbar from "../../components/navbar/Navbar.jsx";
import List from "../../components/list/List.jsx";
import Featured from "../../components/featured/Featured.jsx"

const Home = ({type}) => {
  return (
    <div className="home">
      <Navbar />
      <Featured type={type}/>
      <List/>
      <List/>
      <List/>
      <List/>
    </div>
  );
};

export default Home