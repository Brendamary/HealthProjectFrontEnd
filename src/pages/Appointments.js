import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useNavigate, Navigate } from "react-router-dom";
import 'react-tabs/style/react-tabs.css';
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import DataTable from 'react-data-table-component';
import '../components/Dashboard.css';
import TopNavBar from '../components/TopNavBar';
import CustomDialog from '../components/CustomDialog';
import axios from 'axios';
import { ClipLoader } from 'react-spinners/ClipLoader';


function Appointments() {

    const [dt, setDt] = useState(moment());
    const [appointmentdetails, setAppointmentDetails] = useState(null);
    const currentDate = new Date().toLocaleDateString();
    const [loadingInProgress, setLoading] = useState(true);
    const [Dialog, setDialog] = useState({
      Title: "",
      Message: "",
      isLoading: false
    });
    const [userAppointments, setUserAppointments] = useState([]);
    var monthNames = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];
    const loggedInUser = localStorage.getItem("user");
   

     //executed every time you render. To stop endless loop of render add the empty square brackets as second variable in useEffect()
     useEffect(() => {
    
       getUserAppointments();
     }, []);

      const getUserAppointments = () => {
          axios.get('/GetAppointments/' + loggedInUser)
          .then(response => {
             
              setUserAppointments(response.data);
              setLoading(false);

              
          }).catch( error => {

             
              console.log(error.response.data);
          })
      }

    const submitAppointmentDetails = (e) => {

        e.preventDefault(); //prevent page refresh
        let appointmentBy = {"username" : loggedInUser};
        let scheduleddate = dt._d.toLocaleDateString();
        
        const postData = { dateCreated: currentDate, scheduledDate:scheduleddate, appointmentDescription: appointmentdetails, appointmentBy: appointmentBy };

        axios.post('/Create/Appointment', postData).then(response => {
           
            setDialog({
                Title: "Successful!!",
                Message:  "You have successfully saved your Appointment.",
                isLoading: true
            });
            e.target.reset();
            getUserAppointments();


        }).catch(error => {

            if(error.response.status == 401) {
                setDialog({
                    Title: "UnSuccessful!!",
                    Message: error.response.data + " Try Again.",
                    isLoading: true
                });
        
               
              
              }
              else {
                  setDialog({
                      Title: "UnSuccessful!!",
                      Message: "The LogIn Process was Unsuccessful. Try Again.",
                      isLoading: true
                  });
              } 


        });
    }

    let OnCloseDialog = (value) => {
      if(!value) {
          setDialog({
              isLoading: false
          })
      }
      
      return Dialog.isLoading;
    }

    const handleInputChange = (e) => {
      const {id , value} = e.target;
  
      if(id === "appointmentdetails"){
        setAppointmentDetails(value);
        
      }
  
     }


  if(loggedInUser === null) {
    
  return <Navigate to={{ pathname: '/login' }} />
  }
  else {   
  return (
      
      
      <>
      { 
         
          console.log(userAppointments)}
          <TopNavBar />
      <div className="nav-md body allpages">
           
      <div className="main_container">
          <div className="right_col" role="main">
              <div className="x_content">
                  <div className="tabpanel" data-example-id="togglable-tabs">
                  <Tabs >
                  <TabList>
                    <Tab>My Upcoming Appointments</Tab>
                    <Tab>Add New Appointment</Tab>
                    
                  </TabList>
          
                  <TabPanel>
                      <div className="x_panel">
                        {
                             userAppointments === null ? (
                              <div className="loader-container"><ClipLoader color={'#000'} size={30} /></div>
                          ) :
                      
                        <div>
                        { userAppointments.length > 0 ?
                         userAppointments.map((appointment, i) => 
                        <article id={i} className="media event">
                            <a className="pull-left date" style={{width: "100px", backgroundColor: "#1a83ff"}}>
                            <p className="month">{monthNames[new Date(appointment.scheduledDate).getMonth()]}</p>
                            <p className="day">{new Date(appointment.scheduledDate).getDate()}</p>
                            </a>
                            <div className="media-body">
                            <a className="title"></a>
                            <p style={{marginTop: "20px"}} className="title">{appointment.appointmentDescription}</p>
                            </div>
                        </article>
                        
                        ) :
                         <div style={{padding: 20, color: "#191970", fontSize: 14}}>You have no upcoming Appointments</div>
                        
                        }
                        </div>
                      }
                       
                      
                      </div>

                  </TabPanel>
                  <TabPanel>
                      <div className="x_panel">
                          <form id="demo-form" onSubmit={(e) => submitAppointmentDetails(e)} data-parsley-validate>
                              <div className="col-sm-4">
                              Appointment Date:
                              <div className="form-group">
                                  <div className="input-group date" id="myDatepicker">
                                      <DatePicker
                                      inputProps={{
                                          style: { width: 460 }
                                      }}
                                      value={dt}
                                      dateFormat="DD-MM-YYYY"
                                      timeFormat="hh:mm A"
                                      onChange={val => setDt(val)}
                                      /> <br />
                                      
                                  </div>
                              </div>
                              Appointment Details: 
                              <div className="form-group">
                                <div>
                                  <textarea className="form-control" rows="3" onChange = {(e) => handleInputChange(e)} id="appointmentdetails"></textarea>
                                </div>
                              </div>
                              <div className="form-group">
                                <button type="submit" className="btn btn-success">Submit</button>
                              </div>
                              </div>
                          </form>
                      </div>

                  </TabPanel>
                
                </Tabs>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  { Dialog.isLoading && <CustomDialog DialogStatus={OnCloseDialog} Title={Dialog.Title} Message={Dialog.Message} />}
  </>
    );
 }
}

export default Appointments