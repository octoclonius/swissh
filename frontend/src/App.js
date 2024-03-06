import WISSHTerminal from './WISSHTerminal';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar"
import Machine from "./Pages/navbar/machine"
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/machine' exact component={Machine} />
        </Routes>
      </Router>
      <WISSHTerminal />
    </div>
  );
}

export default App;