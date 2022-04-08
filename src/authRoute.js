import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

function AuthRoute({ children, type, ...props }) {
  const isAuthorized = useSelector((state) => state.auth.isAuthorize);

  if (type === "guest") {
    return (
      <Route {...props}>
        {!isAuthorized ? children : <Redirect to="/create-playlists" />}
      </Route>
    );
  }

  return (
    <Route {...props}>{isAuthorized ? children : <Redirect to="/" />}</Route>
  );
}

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["guest", "private"]).isRequired,
};

export default AuthRoute;
