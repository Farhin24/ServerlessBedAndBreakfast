import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopNav from "./components/TopNav";
import PrivateRoute from "./components/PrivateRoute";
// components
import Home from "./booking/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./user/Dashboard";

import ViewHotel from "./hotels/ViewHotel";

import Menu from "./booking/Menu";
import Tour from "./booking/Tour";
import Securityquestion from "./auth/Securityquestion";
import Graph from "./Analytics/Graph";
import Cipher from "./auth/Cipher";

function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <ToastContainer position="top-center" />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/tours" component={Tour} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/graph" component={Graph} />
        <Route exact path="/cipher" component={Cipher} />
        <Route exact path="/securityquestion" component={Securityquestion} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />

        <Route exact path="/hotel/:hotelId" component={ViewHotel} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
