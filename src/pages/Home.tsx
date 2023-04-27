import React from "react";
import { BrowserRouter as Router, Route, Link ,Routes} from "react-router-dom";
import UserList from "./UserList";
import UserForm from "./UserForm";

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
        <Route path="/" element={<UserList/>} />
        <Route path="/cadastrar-motoristas" element={<UserForm/>} />
        
        </Routes>
      </div>
      
    </Router>
  );
}

export default Home;
