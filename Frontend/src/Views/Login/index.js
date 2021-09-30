import React from "react";
import Cookies from "js-cookie";

import "../../Styles/Login/index.css";

// images
import img_login_hero from "../../Assets/Images/Login_Hero.png";

const Login = (props) => {
  const handleLogin = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const type = e.target.type.value;

    Cookies.set("UID", name ? name.length : 0);
    Cookies.set("name", name);
    Cookies.set("token", "jghjdhghdglkhdsjgh;sdhgdshgshdgkljhsdjlgkhsjdkh");
    Cookies.set("type", type);

    switch (type) {
      case "student":
        window.location.href = "/student";
        break;
      case "teacher":
        window.location.href = "/teacher";
        break;
      case "librarian":
        window.location.href = "/library";
        break;
      case "finance":
        window.location.href = "/finance";
        break;
      case "shop":
        window.location.href = "/shop";
        break;

      default:
        break;
    }
  };

  return (
    <div className="login-wrapper">
      <img src={img_login_hero} alt="" srcset="" />

      <h1>Log in</h1>
      <p>
        Create your login functionality and UI here <br /> once the login is
        success create the cookies with following values
        <br />
        <ul>
          <li>name = user's name</li>
          <li>token = user's auth token</li>
          <li>
            type = user's auth type (Eg: Student / Teacher / Librarian / Finance
            / Shop)
          </li>
        </ul>
        <br />
        you can change your login screen styles in /src/Styles/Login/index.css
        <br />
        if you need aditional css, you can add it to /src/Styles/Login folder
        and import in here
      </p>

      <form onSubmit={handleLogin}>
        <input placeholder="enter your name" type="text" name="name" />
        <select name="type">
          <option value="student">student</option>
          <option value="teacher">teacher</option>
          <option value="librarian">librarian</option>
          <option value="finance">finance</option>
          <option value="shop">shop</option>
        </select>
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default Login;
