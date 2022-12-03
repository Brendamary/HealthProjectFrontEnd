
import React, {useState, useEffect} from 'react';
import axios from "axios";
import '../components/Dashboard.css';
import * as BiIcons from 'react-icons/bi';
import * as BsIcons from 'react-icons/bs';
import {IconContext} from 'react-icons';
import { Navigate } from "react-router-dom";
import TopNavBar from '../components/TopNavBar';
import { ClipLoader } from 'react-spinners/ClipLoader';

function Dashboard() {

    const loggedInUser = localStorage.getItem("user");
    const [appointmentCount, setAppointmentCount] = useState(null);
    const [totalTimeExerciseSpent, setTimeSpentOnExercise] = useState(null);
    const [latestbpreading, setLatestBpReading] = useState(null);
    let currentMonth = new Date().getMonth();
    const Months = [
        { label: "January", value: 1 },
        { label: "February", value: 2 },
        { label: "March", value: 3 },
        { label: "April", value: 4 },
        { label: "May", value: 5 },
        { label: "June", value: 6 },
        { label: "July", value: 7 },
        { label: "August", value: 8 },
        { label: "September", value: 9 },
        { label: "October", value: 10 },
        { label: "November", value: 11 },
        { label: "December", value: 12 }
        ];
   
    useEffect(() => {
        getUserAppointments();
        getTimeSpentOnExercise();
        getUserBpReadings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    const getUserAppointments = () => {
        axios.get('/GetAppointments/' + loggedInUser)
        .then(response => {
            setAppointmentCount(response.data);

            
        }).catch( error => {
            console.log(error.response.data);
        })
    }
    const getTimeSpentOnExercise = () => {

        let selectedMonth = Months[currentMonth].label;

        const postData = { username: loggedInUser, month: selectedMonth }

        axios.post('/GetTimeSpendOnLastMonth', postData).then(response => {
            setTimeSpentOnExercise(response.data);
            
        }).catch( error => {
            console.log(error.response.data);
        })
    }
    const getUserBpReadings = () => {
        axios.get('GetLatestUserBpReading/' + loggedInUser)
        .then(response => {
           setLatestBpReading(response.data);
        }).catch( error => {
            console.log(error.response.data);
        })
    }

    if(loggedInUser === null) {
       
        return <Navigate to={{ pathname: '/login' }} />
    }
    else {
       
    return (

        <>
          <TopNavBar />
            <div className="nav-md container body allpages">
           
            <div className="main_container">
                          
            {/* page content */}
            <div className="right_col" role="main" style={{marginLeft: "270px"}}>
            <IconContext.Provider value={{ color: '#000' }}>
            <div className="x_content">
                <div className="row top_tiles">
                <div className="animated flipInY col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <div className="tile-stats">
                    <div className="icon"><BsIcons.BsCalendarEvent style={{fontSize: "60px", color: "#191970"}} /></div>
                    <div className="count">{appointmentCount  == null ? <div className="loader-container"><ClipLoader color={'#000'} size={30} /></div> : appointmentCount.length}</div>
                    <h3>Upcoming Appointments</h3>
                    <p>Scheduled Appontments.</p>
                    </div>
                </div>
                <div className="animated flipInY col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <div className="tile-stats">
                    <div className="icon"><BiIcons.BiTime style={{fontSize: "60px", color: "#191970"}}/></div>
                    <div className="count">{totalTimeExerciseSpent == null ? <div className="loader-container"><ClipLoader color={'#000'} size={30} /></div> : totalTimeExerciseSpent}</div>
                    <h3>Time Spent on Exercise</h3>
                    <p>In current month in Minutes.</p>
                    </div>
                </div>
                <div className="animated flipInY col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <div className="tile-stats">
                    <div className="icon"><BsIcons.BsFillCalculatorFill style={{fontSize: "60px", color: "#191970"}}/></div>
                    <div className="count">{latestbpreading == null ? <div className="loader-container"><ClipLoader color={'#000'} size={30} /></div> : latestbpreading === 0 ? latestbpreading : latestbpreading + " mmHg" }</div>
                    <h3>Latest Reading</h3>
                    <p>Most recent reading</p>
                    </div>
                </div>
                </div>
                <div className="row">
                <div className="col-md-12">
                    <div className="x_panel">
                    <div className="x_title">
                        <h2 style={{color: "#191970"}}>Information about Hypertension.</h2>
                        <div className="clearfix" />
                    </div>
                    <div className="x_content">
                        <div style={{marginTop: 10, fontSize: 14}}>
                        Hypertension also known as High Blood Pressure, is a condition where ones blood pressure is higher than normal.
                        </div>
                        <div style={{marginTop: 20, fontSize: 14}}>
                        Blood pressure is measured using two values: One is the systolic blood pressure, which measures the pressure in your arteries when your heart beats. The other is diastolic blood pressure, which measures the pressure in your arteries when your heart rests between beats. If the measurement reads 120 systolic and 80 diastolic, you would say, “120 over 8
                        </div>
                        <div style={{marginTop: 20, fontSize: 14}}>
                        There are no signs or symptoms of hypertension and the only way you know you have it is to be tested. You can measure your blood pressure at home with a home blood pressure monitor, or you can visit your doctor or nurse to have your blood pressure checked.
                        </div>
                        <div>
                        <h3>Important Links to learn More about Hypertension:</h3>
                        </div>
                        <div style={{marginTop: 20, fontSize: 16}}>
                        1. CDC – Center for Disease Control and prevention page on High Blood Pressure. 
                        <br />
                        <a href="https://www.cdc.gov/bloodpressure/index.htm">https://www.cdc.gov/bloodpressure/index.htm</a>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </IconContext.Provider>
            </div>
            {/* /page content */}
            
        </div>
        </div>
        
        </>
        
    
    );
    }
}

export default Dashboard