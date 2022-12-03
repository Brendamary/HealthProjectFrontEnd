import React, { useState, useEffect, useMemo } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Navigate } from "react-router-dom";
import 'react-tabs/style/react-tabs.css';
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import DataTable from 'react-data-table-component';
import '../css/bpreadings.css';
import '../components/Dashboard.css';
import TopNavBar from '../components/TopNavBar';
import CustomDialog from '../components/CustomDialog';
import axios from 'axios';
import FilterComponent from '../components/FilterComponent';


function BpReadings() {
    const [dt, setDt] = useState(moment());
    const [bpreading, setBpreading] = useState(null);
    const [recordedBpReadings, setRecordedBpReadings] = useState([]);
    const [data, setdata] = useState({bpreading: '',  dt: ''});
    const loggedInUser = localStorage.getItem("user");
    const [Dialog, setDialog] = useState({
        Title: "",
        Message: "",
        isLoading: false
    });
    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
      false
    );

    //executed every time you render.
    useEffect(() => {
        getUserReadings();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getUserReadings = () => {
        axios.get('GetBpReadings/' + loggedInUser)
        .then(response => {
            console.log("Executes Correctly")
            console.log(response.data)
            let results = response.data;

            setRecordedBpReadings(results);
        }).catch( error => {

            console.log("Reaches Here11111");
            console.log(error.response);
            console.log(error.response.data);
        })
    }

    const submitBpDetails = (e) => {

        e.preventDefault(); //prevent page refresh
        let readingFor = {"username" : loggedInUser};
        let bpDate = dt._d.toLocaleDateString();
        const postData = { bpReading: bpreading, readingDate:bpDate, readingFor: readingFor };

        axios.post('/Create/BloodPressureReading', postData).then(response => {
            console.log(response.status);
            console.log(response.data);
            setDialog({
                Title: "Successful!!",
                Message:  "You have successfully saved the Blood Pressure Reading.",
                isLoading: true
            });
            e.target.reset();
            getUserReadings();

        }).catch(error => {

            if(error.response.status == 401) {
                setDialog({
                    Title: "UnSuccessful!!",
                    Message: error.response.data + " Try Again.",
                    isLoading: true
                });
        
                console.log("401111111111111111111");
                console.log(Dialog.isLoading);
              
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
    const filteredItems = recordedBpReadings.filter(
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
    const handleInputChange = (e) => {
        const {id , value} = e.target;
        setdata({ ...data, [e.target.id]: e.target.value }); 
    
        if(id === "bpreading"){
            setBpreading(value);
        }
    
    }

    const columns = [
        {
            name: 'Date',
            selector: 'readingDate',
            id: 'readingDate',
            sortable: true,
          },
        {
          name: 'Bp Reading',
          selector: 'bpReading',
          id: 'bpReading',
          sortable: true,
        },  
      ];  

    
    if(loggedInUser === null) {
    
    return <Navigate to={{ pathname: '/login' }} />
    }
    else {
    return (
        <>
          <TopNavBar />
        <div className="nav-md body allpages">
           
            <div className="main_container">
            <div className="right_col" role="main">
                <div className="x_content">
                    <div className role="tabpanel" data-example-id="togglable-tabs">
                    <Tabs >
                    <TabList>
                    <Tab>My Bp Readings</Tab>
                    <Tab>Add Bp Reading</Tab>
                    
                    </TabList>
            
                    <TabPanel>
                        <DataTable
                            title="BP Readings"
                            className='bpdatatable'
                            columns={columns}
                            data={filteredItems}
                            defaultSortField="readingDate"
                            striped
                            pagination
                            subHeader
                            subHeaderComponent={subHeaderComponent}
                        />
                    </TabPanel>
                    <TabPanel>
                        <div className="x_panel">
                            <form id="demo-form" onSubmit={(e) => submitBpDetails(e)} data-parsley-validate>
                                <div className="col-sm-4">
                                Date:
                                <div className="form-group">
                                    <div className="input-group date" id="myDatepicker">
                                        <DatePicker
                                        id="dateselected"
                                        inputProps={{
                                            style: { width: 430 }
                                        }}
                                        value={dt}
                                        dateFormat="DD-MM-YYYY"
                                        timeFormat="hh:mm A"
                                        onChange={val => setDt(val)}
                                        /> <br />
                                        {/* <div><b>Date:</b> {dt.format('LLL')}</div> */}
                                    </div>
                                </div>
                                BP Reading: 
                                <div className="form-group">
                                    <div>
                                    <input type="text"  onChange = {(e) => handleInputChange(e)} id="bpreading" className="form-control" />
                                    </div>
                                </div>
                                <div>

                                <div className="form-group" style={{marginTop: 20}}>
                                    <button type="submit" className="btn btn-success" >Submit</button>
                                </div>
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

export default BpReadings