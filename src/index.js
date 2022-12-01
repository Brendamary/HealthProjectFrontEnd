import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Datatable from './components/Datatable';
import Datetimepicker from './components/Datetimepicker';
import TabsClass from './components/TabsClass';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BpReadings from './pages/BpReadings';
import Appointments from './pages/Appointments';
import DietTracker from './pages/DietTracker';
import ExerciseTracker from './pages/ExerciseTracker';
import TopNavBar from './components/TopNavBar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


