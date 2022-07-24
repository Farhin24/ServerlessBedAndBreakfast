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
import Notifications from "./user/Notifications";
import CeaserCipher from "./auth/CeaserCipher";
import Feedback from "./user/feedback";
import LexChat from "react-lex-plus";
import { useDispatch } from "react-redux";
import UserReport from "./admin/userreport";

function App() {
  const dispatch = useDispatch();

  if (localStorage.getItem("userid") !== null) {
    dispatch({
      type: "LOGGED_IN_USER",
      payload: localStorage.getItem("userid"),
    });
  }

  const loginBot = () => {
    return (
      // console.log(localStorage.getItem("userid"));
      <LexChat
        botName="HotelAssist"
        IdentityPoolId="us-east-1:53305051-7ef5-4bd4-9208-118b97c3e4a4"
        placeholder="Placeholder text"
        backgroundColor="#FFFFFF"
        height={430}
        region="us-east-1"
        headerText="Authorized Bot"
        sessionAttributes={{ userid: localStorage.getItem("userid") }}
        headerStyle={{ backgroundColor: "#ABD5D9", fontSize: "30px" }}
        greeting={
          "Hello, how can I help? You can say things like 'help' to get more info"
        }
      />
    );
  };

  const unauthorizedBot = () => {
    return (
      <LexChat
        botName="AssistHotelNotRegistered"
        IdentityPoolId="us-east-1:53305051-7ef5-4bd4-9208-118b97c3e4a4"
        placeholder="Placeholder text"
        backgroundColor="#FFFFFF"
        height={430}
        region="us-east-1"
        headerText="Unauth Bot"
        headerStyle={{ backgroundColor: "#ABD5D9", fontSize: "30px" }}
        sessionAttributes={{ userid: localStorage.getItem("userid") }}
        greeting={
          "Hello, how can I help? You can say things like 'help' to get more info"
        }
      />
    );
  };

  return (
    <>
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
          <Route exact path="/cipher" component={CeaserCipher} />
          <Route exact path="/admin/userreport" component={UserReport} />
          <Route exact path="/securityquestion" component={Securityquestion} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/notifications" component={Notifications} />
          <PrivateRoute exact path="/feedback" component={Feedback} />
          <Route exact path="/hotel/:hotelId" component={ViewHotel} />
        </Switch>
      </BrowserRouter>
      {localStorage.getItem("userid") && localStorage.getItem("userid")
        ? loginBot()
        : unauthorizedBot()}
    </>
  );
}

export default App;
