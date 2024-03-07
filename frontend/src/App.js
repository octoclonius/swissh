import WISSHTerminal from "./WISSHTerminal";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Machine from "./Pages/navbar/machine";
//import File from "./components/File/file"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="machine" element={<Machine />} />
            <Route path="*" element={<></>} />
          </Route>
        </Routes>
      </Router>
      <WISSHTerminal />
    </div>
  );
}

export default App;