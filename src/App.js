import { BrowserRouter, Switch } from "react-router-dom";
import Auth from "./Pages/Auth";
import AuthRoute from "./authRoute";
import Home from "./Pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthRoute path="/create-playlists" type="private" exact>
          <Home />
        </AuthRoute>
        <AuthRoute path="/" type="guest" exact>
          <Auth />
        </AuthRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
