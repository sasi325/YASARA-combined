import React from "react";
import Cookies from "js-cookie";
import {
  NavLink,
  Redirect,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";

import "../../Styles/Common/Dashboard.css";

// images
import img_User from "../../Assets/Images/userPlaceholder.jpeg";

const Dashboard = (props) => {
  const match = useRouteMatch();

  const handleLogOut = () => {
    Cookies.remove("name");
    Cookies.remove("token");
    Cookies.remove("type");
    window.location.reload();
  };

  return (
    <div className="dashboard-wrapper">
      <div className="sidebar">
        <div className="profile">
          <img src={img_User} />
          <h2>Hello {Cookies.get("name")}</h2>
        </div>
        <div className="nav">
          {props.config
            ? Array.isArray(props.config)
              ? props.config.map((item, i) => {
                  return (
                    <NavLink
                      activeClassName="active"
                      key={i}
                      to={`${match.url}/${item.path}`}
                    >
                      {item.name}
                    </NavLink>
                  );
                })
              : null
            : null}

          <button onClick={handleLogOut}>Log out</button>
        </div>
      </div>
      <div className="content">
        <Switch>
          {props.config
            ? Array.isArray(props.config)
              ? props.config.map((item, i) => {
                  return (
                    <Route
                      path={`${match.url}/${item.path}`}
                      render={(props) => (
                        <item.component {...props} {...item.props} />
                      )}
                    />
                  );
                })
              : null
            : null}

          {/* =============== */}
          {/* Default Route */}
          {/* =============== */}
          {props.config ? (
            Array.isArray(props.config) ? (
              props.config.length > 0 ? (
                <Route
                  path={`${match.url}`}
                  render={() => (
                    <Redirect to={`${match.url}/${props.config[0].path}`} />
                  )}
                />
              ) : null
            ) : null
          ) : null}
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
