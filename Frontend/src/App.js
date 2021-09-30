import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

// components
import ProtectedRoute from "./ProtectedRoute";

// main pages
import Home from "./Views/Home";
import Login from "./Views/Login";
import Student from "./Views/Student";
import Teacher from "./Views/Teacher";
import Library from "./Views/Library";
import Shop from "./Views/Shop";
import Finance from "./Views/Finance";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            strict
            render={(props) => <Home {...props} />}
          />
          <Route
            path="/login"
            exact
            strict
            render={(props) => <Login {...props} />}
          />
          <ProtectedRoute path="/student" strict component={Student} />
          <ProtectedRoute path="/teacher" strict component={Teacher} />
          <ProtectedRoute path="/library" strict component={Library} />
          <ProtectedRoute path="/shop" strict component={Shop} />
          <ProtectedRoute path="/finance" strict component={Finance} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
