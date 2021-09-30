import React from "react";
import { Link } from "react-router-dom";

import "../../Styles/Home/index.css";

// images
import img_home_hero from "../../Assets/Images/Home_Hero2.png";

const Home = (props) => {
  return (
    <div className="home-wrapper">
      <img src={img_home_hero} alt="" srcset="" />

      <h1>Welcome to Yasara</h1>

      <Link to="/login">Sign in</Link>
    </div>
  );
};

export default Home;
