
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import BpReadings from './pages/BpReadings';
import DietTracker from './pages/DietTracker';
import ExerciseTracker from './pages/ExerciseTracker';
import Login from './pages/Login';
import Register from './pages/Register';
import TopNavBar from './components/TopNavBar';

function App() {
  return (
    
    <Router>
        
      <div className='maincontent'>
      <Routes>
        <Route path='/dashboard' exact element={<Dashboard />}/>
        <Route path='/appointments' element={<Appointments />}/>
        <Route path='/bpreadings' element={<BpReadings />}/>
        <Route path='/diettracker' element={<DietTracker />}/>
        <Route path='/exercisetracker' element={<ExerciseTracker />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      </div>
     
    </Router>
      
    
  );
}

export default App;
