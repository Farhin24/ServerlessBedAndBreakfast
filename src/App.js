import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import { Register } from "./pages/Register.js";
import Register  from './pages/Register.js';
import Login  from './pages/Login.js';
import Securityquestion  from './pages/Securityquestion.js';
import Nextpage  from './pages/Nextpage.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/securityquestion" element={<Securityquestion />}></Route>
          <Route path="/nextpage" element={<Nextpage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
