import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import AddMachineView from './Pages/AddMachineView';
import WISSHMain from './Components/WISSHMain/WISSHMain';
import './App.css';

const App = () => {
  return (
    <div className='app'>

      <Router>
        <Routes>
          <Route path='/' element={<Navbar />}>
            <Route path='add-machine' element={<AddMachineView />} />
          </Route>
        </Routes>
      </Router>

      <WISSHMain />
      
    </div>
  );
}

export default App;