import React from "react";
import { BrowserRouter as Router, Route, Link ,Routes} from "react-router-dom";
import DriverList from "./DriverList";
import DriverForm from "./DriverForm";

function Home() {
  return (
    <Router>
      
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Motoristas</Link>
            </li>
            <li>
              <Link to="/cadastrar-motoristas">+</Link>
            </li>
          </ul>
        </nav>
        <Routes>
        <Route path="/" element={<DriverList/>} />
        <Route path="/cadastrar-motoristas" element={<DriverForm/>} />
        
        </Routes>
      </div>
      
    </Router>
  );
}

export default Home;
