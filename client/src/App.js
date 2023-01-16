import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import "./App.css";

const App = () => (
  <Router>
    <Navbar/>
    <Routes>
      <Route  path="/" element={<Landing />} />
    </Routes>
  </Router>
);

export default App;
