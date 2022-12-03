import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import LoadingDialog from '../components/LoadingDialog';
 import '../css/bootstrap.min.css';
import '../css/custom.css';
import '../css/custom.min.css';
import '../css/login.css';
import {  Link } from "react-router-dom";
import CustomDialog from '../components/CustomDialog';
import axios from 'axios';
import * as BsIcons from 'react-icons/bs';


function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState(null);
  const [password,setPassword] = useState(null);
  const [data, setdata] = useState({username: '',  password: '' });
  const [cliploader, setClipLoader] = useState(false);
  const [Dialog, setDialog] = useState({
      Title: "",
      Message: "",
      isLoading: false
  });

  const getUserDetails = () => {
    

    axios.get('/User/GetDetails/' + username)
    .then(response => {
       
       
        localStorage.setItem('user', username);
        localStorage.setItem('name', response.data.fullNames);
        localStorage.setItem('isLoggedIn', true);

       
        if(localStorage.getItem('user') !== null) {
          setClipLoader(false);
           navigate("/dashboard");
        }
        
        
    }).catch( error => {

       
        console.log(error.response);
        console.log(error.response.data);
    })


  }
  const submitLogInDetails = (e) => {

    e.preventDefault(); //prevent page refresh
    const postData = { username: username, password: password };
    axios.post('/User/Login', postData).then(response => {
      setClipLoader(true);
      getUserDetails();
      

    }).catch( error => {
      if(error.response.status === 401) {
        setDialog({
            Title: "UnSuccessful!!",
            Message: error.response.data + " Try Again.",
            isLoading: true
        });

        
        if(!Dialog.isLoading) {
            e.target.reset();
            navigate("/login");
        }
      }
      else {
          setDialog({
              Title: "UnSuccessful!!",
              Message: "The LogIn Process was Unsuccessful. Try Again.",
              isLoading: true
          });
          e.target.reset();
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
    setdata({ ...data, [e.target.id]: e.target.value }); 

    if(id === "username"){
        setUsername(value);
    }

    if(id === "password"){
        setPassword(value);
    }

  }

    return(
      <>
      
      <div style={{backgroundColor: "#F7F7F7"}} className="login">
              
            <div  style={{textAlign: "center", paddingTop: "80px"}}>
                  <BsIcons.BsBookHalf style={{fontSize: "30px", color: "#191970", padding: "5px 6px", border: "1px solid #191970", borderRadius: "50%"}}/>
                  <span style={{color: "#191970", fontSize: 22}}>My HealthDiary!</span>
              </div>
        <div className="login_wrapper" style={{marginTop: 0}}>
              
          
          <div className="animate form login_form">
            
            <section className="login_content">
              
              <form onSubmit={(e) => submitLogInDetails(e)}>
                <h1>Login Form</h1>
                <div>
                  <input type="text" className="form-control" onChange = {(e) => handleInputChange(e)} id="username" placeholder="Username" required />
                </div>
                <div>
                  <input type="password" className="form-control" onChange = {(e) => handleInputChange(e)} id="password" placeholder="Password" required />
                </div>
                <div>
                  <button style={{backgroundColor: '#191970', color: 'white'}} className="btn btn-default submit">Log in</button>
                </div>
                <div className="clearfix" />
                <div className="separator">
                  <p className="change_link">New to this site?
                    <Link to="/register" style={{marginLeft: "10px", fontSize: 14, textDecoration: "underline"}}>Create Account </Link>
                  </p>
                  <div className="clearfix" />
                  <br />
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
     {cliploader && <LoadingDialog />}
      { Dialog.isLoading && <CustomDialog DialogStatus={OnCloseDialog} Title={Dialog.Title} Message={Dialog.Message} />}
      </>
 );

}
export default Login