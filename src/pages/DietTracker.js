import React, { useState, useEffect, useMemo } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Navigate } from "react-router-dom";
import ClipLoader from 'react-spinners/ClipLoader';
import 'react-tabs/style/react-tabs.css';
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import DataTable from 'react-data-table-component';
import '../css/datatable.css';
import TopNavBar from '../components/TopNavBar';
import CustomDialog from '../components/CustomDialog';
import axios from 'axios';
import { Chart } from "react-google-charts";
import FilterComponent from '../components/FilterComponent';
import Select from 'react-select';


function DietTracker() {

    const [dt, setDt] = useState(moment());
    const [selectedmealtime, setSelectedMealTime] = useState('');
    const [selectedmealcategory, setSelectedMealCategory] = useState('');
    const [moreinformation, setMoreInformation] = useState('');
     const [Dialog, setDialog] = useState({
        Title: "",
        Message: "",
        isLoading: false
      });
    const [mealsTaken, setMealsTaken] = useState([]);
    const[monthlyMeals, setMonthlyMeals] = useState([]);
 
    let testdata1 = [];
    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const loggedInUser = localStorage.getItem("user");
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
    let currentMonth = new Date().getMonth();
    const [selectedMonthToTrack, setSelectedMonthToTrack] = useState(Months[currentMonth].label);

     //executed every time you render. To stop endless loop of render add the empty square brackets as second variable in useEffect()
     useEffect(() => {
        getDietTaken();
        getMonthyMealsTaken();
       
      }, []);
 
    const getDietTaken = () => {
        
        axios.get('GetDietEntries/' + loggedInUser)
        .then(response => {
            setMealsTaken(response.data)
            
            
        }).catch( error => {

            console.log(error.response.data);
        })
    }

    const getMonthyMealsTaken = () => {
        const postData = { username: loggedInUser, month: selectedMonthToTrack };
       

        axios.post('/GetMonthlyDietEntries', postData).then(response => {
            setMonthlyMeals(response.data);
            
        }).catch( error => {
            console.log(error.response.data);
        });
       
        monthlyMeals.map((element, index) => {
           
            testdata1[index] = [element.mealTaken, element.noOfServings];

        });

     
    }

      const submitDietDetails = (e) => {
        e.preventDefault(); //prevent page refresh
        let mealBy = {"username" : loggedInUser};
        let mealDate = dt._d.toLocaleDateString();

      
        
        const postData = { mealDate: mealDate, mealTime:selectedmealtime, mealSelected: selectedmealcategory, moreInformation: moreinformation, mealBy:mealBy };

        axios.post('/Add/DietEntry', postData).then(response => {
          
            setDialog({
                Title: "Successful!!",
                Message:  "You have successfully saved your Diet Entry.",
                isLoading: true
            });
            e.target.reset();
            getDietTaken();
            getMonthyMealsTaken();

        }).catch(error => {

            if(error.response.status == 401) {
                console.log(error.response.data);
                setDialog({
                    Title: "UnSuccessful!!",
                    Message: error.response.data + " Try Again.",
                    isLoading: true
                });
            
            }
            else {
                console.log(error.response.data);
                setDialog({
                    Title: "UnSuccessful!!",
                    Message: "The Saving Process was Unsuccessful. Try Again.",
                    isLoading: true
                });
            } 


        });
    }

    
   
    const filteredItems = mealsTaken.filter(
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
          name: 'Meal Date',
          selector: 'mealDate',
          id: 'mealDate',
          sortable: true,
         
        },
        {
          name: 'Meal Time',
          selector: 'mealTime',
          id: 'mealTime',
          sortable: true,
        },
        {
            name: 'Meal',
            selector: 'mealSelected',
            id: 'mealTime',
            sortable: true,
        },
        {
            name: 'More Information',
            selector: 'moreInformation',
            id: 'moreInformation',
            sortable: true,
            grow: 3,
        },

    ];  


    const handleSelectInputChange = (e) => {
       
        setSelectedMonthToTrack(e.label);

    }

    const trackMethod = (e) => {
        e.preventDefault()
       
        getMonthyMealsTaken();
    }


    const handleInputChange = (e) => {
        const {id , value} = e.target;
    
       
        if(id === "selectedmealtime") {
            setSelectedMealTime(value);
        }
        if(id === "selectedmealcategory") {
            setSelectedMealCategory(value);
        }
       
        if(id === "moreinformation") {
            setMoreInformation(value);
        }

     
    
    }


    if(loggedInUser === null) {
    
    return <Navigate to={{ pathname: '/login' }} />
    }
    else {
        console.log("Meals");
        console.log(monthlyMeals);
       
    return (
        <>
          <TopNavBar />
        <div className="nav-md body allpages">
           
      <div className="main_container">
        <div className="right_col" role="main">
        <div className="x_content">
            <div className ="tabpanel" data-example-id="togglable-tabs">
            <Tabs >
            <TabList>
              <Tab>Diet Tracker</Tab>
              <Tab>Dash Diet Plan</Tab>
              <Tab>Add Meal Today</Tab>       
            </TabList>

            <TabPanel>
                    <div className="" style={{marginBottom: "50px"}}>
                        <DataTable
                            title="My Diet"
                            className='bpdatatable'
                            columns={columns}
                            data={filteredItems}
                            defaultSortField="mealDate"
                            striped
                            pagination
                            subHeader
                            subHeaderComponent={subHeaderComponent}

                        />
                    
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
                                <div className="w_left w_25" style={{fontWeight: "bold"}}><p>Food Taken</p></div>
                                <div className="w_center w_55"> </div>
                                <div className=" w_20" style={{marginLeft: "30px", fontWeight: "bold"}}><p>No. Of Servings</p></div>
                            </div>
                                
                            {
                                
                                monthlyMeals === null ? <div className="loader-container"><ClipLoader color={'#000'} size={30} /></div> :
                                monthlyMeals.length > 0 ?

                                monthlyMeals.map((monthlymeal, i) =>
                                <div id={i} className="widget_summary">
                                <div className="w_left w_25">
                                     <p style={{color: "#000"}}>{monthlymeal.mealTaken}</p>
                                </div>
                                <div className="w_center w_55">
                                    <div className="progress">
                                        <div className="progress-bar bg-green" role="progressbar" aria-valuenow={30} aria-valuemin={0} aria-valuemax={10000000} style={{width: (monthlymeal.noOfServings) + '%'}}>
                                            
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="w_20" style={{marginLeft: "30px"}}>
                                    <p style={{color: "#000", paddingLeft: "20px"}}>{monthlymeal.noOfServings} </p>
                                </div>
                                <div className="clearfix" />
                            </div>
                            )
                            :
                            <div style={{padding: 20, color: "#191970", fontSize: 14}}>You have no diet entries to track for this month.</div>
                        }
                        </div>
                    </div>  
                    </div>

            </TabPanel>
            <TabPanel>
                <div className='xpanel' style={{backgroundColor: "#fff", paddingLeft: "40px", paddingTop: "20px"}}>
                    <h2>DASH Diet Meal Plan:</h2>
                    <div>
                    
                      <p>DASH stands for Dietary Approaches to Stop Hypertension. The DASH diet is a healthy-eating plan designed to help treat or prevent high blood pressure (hypertension).</p>
                     
                      <p>It includes foods that are rich in:</p>
                      <ul>
                        <li>Fruits</li>
                        <li>Vegetables</li>
                        <li>Whole grains</li>
                        <li>Fat-free or low-fat dairy products</li>
                        <li>Fish</li>
                        <li>Poultry</li>
                      </ul>
                      <p>When following DASH, it is important to choose foods that are:</p>
                      <ul>
                        <li>Rich in potassium, calcium, magnesium, fiber and protein</li>
                        <li>Low in saturated fat</li>
                        <li>Low in sodium</li>
                      </ul>
                    </div>
               
                    <h4 style={{marginTop: "30px"}}>DASH diet: Recommended servings:</h4>
                    <div style={{backgroundColor: "#FFFFFF", width: "50%"}}>
                        <table className="table table-striped">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Food Group</th>
                            <th>Daily Servings</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">1</th>
                        <td> <p>Grains</p> </td>
                        <td> <p>6–8</p> </td>
                        </tr>
                        <tr>
                        <th scope="row">2</th>
                        <td><p>Meats, poultry, and fish</p></td>
                        <td><p>6 or less</p></td>
                        </tr>
                        <tr>
                        <th scope="row">3</th>
                        <td> <p>Vegetables</p></td>
                        <td><p>4–5</p></td>
                        </tr>
                        <tr>
                        <th scope="row">4</th>
                        <td><p>Fruit</p></td>
                        <td><p>4–5</p></td>
                        </tr>
                        <tr>
                        <th scope="row">5</th>
                        <td><p>Low-fat or fat-free dairy products</p></td>
                        <td><p>2–3</p></td>
                        </tr>
                        <tr>
                        <th scope="row">6</th>
                        <td><p>Fats and oils</p></td>
                        <td><p>2–3</p></td>
                        </tr>
                        <tr>
                        <th scope="row">7</th>
                        <td><p>Sodium</p></td>
                        <td><p>2,300 mg*</p></td>
                        </tr>
                        <tr>
                        <th scope="row" />
                        <td><p /></td>
                        <th><p>Weekly Servings</p></th>
                        </tr>
                        <tr>
                        <th scope="row">8</th>
                        <td><p>Nuts, seeds, dry beans, and peas</p></td>
                        <td><p>4–5</p></td>
                        </tr>
                        <tr>
                        <th scope="row">9</th>
                        <td><p>Sweets</p></td>
                        <td><p>5 or less</p></td>
                        </tr>
                    </tbody>
                    </table>
                </div>
               
                </div>

            </TabPanel>
            <TabPanel>
                
                <div className="x_panel">
                    <form id="demo-form" onSubmit={(e) => submitDietDetails(e)} data-parsley-validate>
                    <div className="col-sm-4">
                        <label className="control-label">Select Date:</label>
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
                                {/* <div><b>Date:</b> {dt.format('LLL')}</div> */}
                            </div>
                        
                        </div>
                        <div className="form-group">
                            <label className="control-label">Select Meal Time:</label>
                            <div>
                                <select className="form-control" id="selectedmealtime" onChange = {(e) => handleInputChange(e)}>
                                <option>---select---</option>
                                <option>Dinner</option>
                                <option>Lunch</option>
                                <option>BreakFast</option>
                                <option>Snack</option>
                                </select>
                            </div>
                        </div> 
                        <div className="form-group">
                        <label className="control-label">Select Food Group:</label>
                        <div>
                            <select className="form-control" id="selectedmealcategory" onChange = {(e) => handleInputChange(e)}>
                                <option>Cereals</option>
                                <option>Meats</option>
                                <option>Vegetables</option>
                                <option>Fruit</option>
                                <option>Beverage</option>
                                <option>Drinks</option>
                                <option>Dairy Products</option>
                                <option>SeaFood</option>
                                <option>Grains</option>
                                <option>Sweets</option>
                                <option>Eggs</option>
                                <option>Fish</option>
                            </select>
                        </div>
                        </div> 
                       
                        <div className="form-group">
                            <label className="control-label">More Information (optional):</label>
                            <div>
                                <textarea className="form-control" rows={3} defaultValue={""} id="moreinformation" onChange = {(e) => handleInputChange(e)} />
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
}

export default DietTracker