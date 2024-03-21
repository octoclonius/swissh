import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import AddMachine from './Pages/AddMachine';
import WISSHMain from './Components/WISSHMain/WISSHMain';
import './App.css';

const App = () => {
  return (
    <div className='app'>

      <Router>
        <Routes>
          <Route path='/' element={<Navbar />}>
            <Route path='add-machine' element={<AddMachine />} />
          </Route>
        </Routes>
      </Router>

      <WISSHMain />
      
    </div>
  );
}

export default App;