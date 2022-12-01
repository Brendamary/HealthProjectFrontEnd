import React, { useState, useEffect,useMemo } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from 'axios';
import Select from 'react-select';
import 'react-tabs/style/react-tabs.css';
import '../css/bootstrap.min.css';
import 'react-datetime/css/react-datetime.css';
import '../css/bpreadings.css';
import DatePicker from 'react-datetime';
import moment from 'moment';
import DataTable from 'react-data-table-component';
import TopNavBar from '../components/TopNavBar';
import CustomDialog from '../components/CustomDialog';
import FilterComponent from '../components/FilterComponent';
import { useNavigate } from "react-router-dom";

function ExerciseTracker() {

    const [dt, setDt] = useState(moment());
    const [selectedexercise, setSelectedExercise] = useState('');
    const [minutesspent, setMinutesSpent] = useState('');
    const [moreinformation, setMoreInformation] = useState('');
     const [Dialog, setDialog] = useState({
        Title: "",
        Message: "",
        isLoading: false
      });
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
    const [workoutsDone, setWorkOutsDone] = useState([]);
    const [monthlyWorkoutsDone, setMonthlyWorkoutDone] = useState([]);
    const loggedInUser = localStorage.getItem("user");
    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    let currentMonth = new Date().getMonth();
    const [selectedMonthToTrack, setSelectedMonthToTrack] = useState(Months[currentMonth].label);
    
     //executed every time you render. To stop endless loop of render add the empty square brackets as second variable in useEffect()
     useEffect(() => {
        getExerciseTracker();
        getMonthlyExercise();
      }, []);
 
    const getExerciseTracker = () => {
        axios.get('GetExerciseEntries/' + loggedInUser)
        .then(response => {
            setWorkOutsDone(response.data);
            
        }).catch( error => {

            console.log(error.response.data);
        })
    }

    const getMonthlyExercise = () => {
      
        const postData = { username: loggedInUser, month: selectedMonthToTrack }

        axios.post('/GetMonthlyExerciseEntries', postData).then(response => {
            setMonthlyWorkoutDone(response.data);
            
        }).catch( error => {

            console.log(error.response.data);
        })
    }

    let OnCloseDialog = (value) => {
    if(!value) {
        setDialog({
            isLoading: false
        })
    }
    
    return Dialog.isLoading;
    }

    const columns = [
        {
          name: 'Exercise Date',
          selector: 'exerciseDate',
          id: 'exerciseDate',
          sortable: true,
        },
        {
          name: 'Exercise Type',
          selector: 'exerciseType',
          id: 'exerciseType',
          sortable: true,
        },
        {
            name: 'Time Spent (Minutes)',
            selector: 'timeSpent',
            id: 'timeSpent',
            sortable: true,
        },
        {
            name: 'More Information',
            selector: 'moreInformation',
            id: 'moreInformation',
            sortable: true,
            grow: 3
        },

      ];  
    
      


    const submitWorkOutDetails = (e) => {
        e.preventDefault(); //prevent page refresh
        let workoutBy = {"username" : loggedInUser};
        let exercisedate = dt._d.toLocaleDateString();
        
        const postData = { exerciseDate: exercisedate, exerciseType:selectedexercise, timeSpent: minutesspent, moreInformation: moreinformation, exerciseBy:workoutBy };

        axios.post('/Add/ExerciseEntry', postData).then(response => {
          
            setDialog({
                Title: "Successful!!",
                Message:  "You have successfully saved your Work Out Entry.",
                isLoading: true
            });
            e.target.reset();
            getExerciseTracker();
            getMonthlyExercise();


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
    const filteredItems = workoutsDone.filter(
        item =>
          JSON.stringify(item)
            .toLowerCase()
            .indexOf(filterText.toLowerCase()) !== -1
      );
    
      const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
          if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText("");
          }
        };
    
        return (
          <FilterComponent
            onFilter={e => setFilterText(e.target.value)}
            onClear={handleClear}
            filterText={filterText}
          />
        );
      }, [filterText, resetPaginationToggle]);

      const handleInputChange = (e) => {
        const {id , value} = e.target;
    
       
        if(id === "selectedexercise") {
            setSelectedExercise(value);
        }
        if(id === "minutesspent") {
            setMinutesSpent(value);
        }
        if(id === "moreinformation") {
            setMoreInformation(value);
        }
      
    
       }
       const handleSelectInputChange = (e) => {
      
        setSelectedMonthToTrack(e.label);

       }

       const trackMethod = (e) => {
            e.preventDefault()
          
            getMonthlyExercise();
       }

    return (
        <>
          <TopNavBar />
        <div className="nav-md body allpages">
           
      <div className="main_container">
        <div className="right_col" role="main">
        <div className="x_content">
            <div className data-example-id="togglable-tabs">
            <Tabs >
            <TabList>
              <Tab>WorkOut Tracker</Tab>
              <Tab>Recommended Exercises</Tab>
              <Tab>Add WorkOut Entry</Tab>
              
            </TabList>

            <TabPanel>
                <div className="" style={{marginBottom: "50px"}}>
                    <div>
                    <DataTable
                            title="WorkOut sesions"
                            className='bpdatatable'
                            columns={columns}
                            data={filteredItems}
                            defaultSortField="exercise Date"
                            striped
                            pagination
                            subHeader
                            subHeaderComponent={subHeaderComponent}
                        />
                    </div>
                    <div style={{marginTop: "20px"}} className="x_panel">
                    <div className="x_title">
                        <h3>My Monthly Tracker:</h3>
                        <ul className="nav navbar-right panel_toolbox">
                            <div className="form-group">
                            <form id="demo-form" onSubmit={(e) => trackMethod(e)}>
                                <div className="nav navbar-left" style={{paddingBottom: "10px"}}>
                                <label className="control-label">Select Month:</label>
                                    <Select
                                        options={Months}
                                        defaultValue={Months[currentMonth]}
                                        onChange = {(e) => handleSelectInputChange(e)}
                                        name="selectedmonthtotrack"
                                     
                                    /> 
                                </div>
                                <div className="nav navbar-right" style={{marginTop: "25px", marginLeft: "20px"}}>
                                    <button type="submit" className="btn btn-info">View</button>
                                </div>
                            </form> 
                            </div> 
                        </ul>
                        <div className="clearfix" />
                        </div>
                        <div className="x_content">
                        <div className="widget_summary" style={{marginBottom: "20px"}}>
                                <div className="w_left w_25" style={{fontWeight: "bold"}}><p>Exercise Done</p></div>
                                <div className="w_center w_55"> </div>
                                <div className=" w_20" style={{marginLeft: "30px", fontWeight: "bold"}}><p>Minutes Spent</p></div>
                            </div>
                        {
                            monthlyWorkoutsDone.length > 0 ?
                            monthlyWorkoutsDone.map((workout, i) =>
                             <div id={i} className="widget_summary">
                             <div className="w_left w_25">
                             <p style={{color: "#000"}}>{workout.exerciseType}</p>
                             </div>
                             <div className="w_center w_55">
                             <div className="progress">
                                 <div className="progress-bar bg-green" role="progressbar" aria-valuenow={30} aria-valuemin={0} aria-valuemax={10000000} style={{width: (workout.timeSpentOnExercise) + '%'}}>
                                 <p className="sr-only">60% Complete</p>
                                 </div>
                             </div>
                             </div>
                             <div className="w_right w_20">
                             <p style={{color: "#000"}}>{workout.timeSpentOnExercise} Minutes</p>
                             </div>
                             <div className="clearfix" />
                         </div>
                        ) : 
                            <div style={{padding: 20, color: "#191970", fontSize: 14}}>You have no exercises to track for this month.</div>
                        }
                       
                        </div>
                    </div>
                </div>

            </TabPanel>
     
            <TabPanel>
                <div className="x_panel">
                <h2>Recommended Work Outs:</h2>
                <div style={{margintop: "30px", marginLeft: "30px"}}>
                    <p>Exercise, in general, can help manage your blood pressure.</p>
                    <br />
                    <p>It's recommended that you get 150 minutes of moderate-intensity exercise a week. But that 150 minutes can be broken up into more manageable chunks throughout the week.</p>
                    <br />
                    <p>Here are some forms of exercise that are great for helping lower your blood pressure:</p>
                    <ul style={{margintop: "30px", marginLeft: "30px"}}>
                    <li>
                        <label>Aerobic classes. </label><br />
                        <p>Sign up for classes like aqua aerobics, Zumba and a functional fitness class. When in doubt, ask your gym or rec center what classes they offer that fit your needs.</p>
                    </li>
                    <li>
                        <label>Brisk walking. </label><br />
                        <p>You'll have to walk faster than you normally walk to elevate your heart and breathing rate.</p>
                    </li>
                    <li>
                        <label>Cycling. </label><br />
                        <p>Riding your bike does count if it’s done for at least 10 minutes and you’re actively pedaling. A beginner cycling class could also be a great way to get a workout scheduled into your routine.</p>
                    </li>
                    <li>
                        <label>Dancing.</label><br />
                        <p>Dance classes like Zumba are a good workout. Any dancing counts if it incorporates full body movement and elevates the heart rate.</p>
                    </li>
                    <li>
                        <label>Gardening or other yardwork.</label><br />
                        <p> This can include mowing the lawn and raking leaves. Aim for 30 to 45 minutes of yardwork.</p>
                    </li>
                    <li>
                        <label>Hiking. </label><br />
                        <p>If you’re new to hiking, stay on beginner’s trails at first. Have a goal to work up to more difficult paths.</p>
                    </li>
                    <li>
                        <label>Running or jogging. </label><br />
                        <p>The talk test can be used for jogging or running to make sure you’re starting at a good pace. You can alternate jogging and running with walking, too. Start off at shorter distances and slower speeds and slowly work up to longer distances or faster speeds.</p>
                    </li>
                    <li>
                        <label>Swimming. </label><br />
                        <p> Most people are familiar with the freestyle stroke, so it might be the easiest stroke for beginner swimmers. If that stroke is too difficult, aqua jogging can be a good starting point for someone getting used to exercising in the pool.</p>
                    </li>
                    </ul>
                </div>
                </div>

            </TabPanel>
            <TabPanel>
                <div className="x_panel">
                <form id="demo-form" onSubmit={(e) => submitWorkOutDetails(e)} data-parsley-validate>
                    <div className="col-sm-4">
                    <label className="control-label">Select Date:</label>
                    <div className="form-group">
                        <div className="input-group date" id="myDatepicker">
                                        <DatePicker
                                        inputProps={{
                                            style: { width: 370 }
                                        }}
                                        value={dt}
                                        dateFormat="DD-MM-YYYY"
                                        timeFormat="hh:mm A"
                                        onChange={val => setDt(val)}
                                        /> <br />
                                        {/* <div><b>Date:</b> {dt.format('LLL')}</div> */}
                                    </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Select Exercise Type:</label>
                            <div>
                            <select className="form-control" id="selectedexercise" onChange = {(e) => handleInputChange(e)}>
                                <option>Aerobics</option>
                                <option>Brisk walking</option>
                                <option>Cycling</option>
                                <option>Dancing</option>
                                <option>Yardwork</option>
                                <option>Hiking</option>
                                <option>Running</option>
                                <option>Jogging</option>
                                <option>Swimming</option>
                            </select>
                            </div>
                        </div> 
                        <div className="form-group">
                            <label className="control-label">Minutes Spent on the Task:</label>
                            <div>
                            <input type="text" className="form-control" placeholder="Minutes..." id="minutesspent" onChange = {(e) => handleInputChange(e)} />
                            </div>
                        </div> 
                        <div className="form-group">
                            <label className="control-label">More Information (optional):</label>
                            <div>
                            <textarea className="form-control" rows={3} defaultValue={""} id="moreinformation" onChange = {(e) => handleInputChange(e)}/>
                            </div>
                        </div>
                        <div className="form-group" style={{marginTop: 20}}>
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

export default ExerciseTracker