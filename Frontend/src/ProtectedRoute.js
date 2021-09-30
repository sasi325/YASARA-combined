import Cookies from "js-cookie";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const validate_login = () => {
    // Write your login validation function here
    // if authentication successfull return True
    // else return false

    if (
      Cookies.get("name") === undefined ||
      Cookies.get("token") === undefined ||
      Cookies.get("type") === undefined
    ) {
      return false;
    }

    return true;
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        if (validate_login()) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
