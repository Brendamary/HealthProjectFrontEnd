import React, {useState} from 'react';
import axios from 'axios';
 import '../css/bootstrap.min.css';
import '../css/custom.css';
import '../css/custom.min.css';
import '../css/login.css';
import { Link } from "react-router-dom";
import CustomDialog from '../components/CustomDialog';
import { useNavigate } from "react-router-dom";
import { BsBookHalf } from 'react-icons/bs'; 

function Register() {

    const [username, setUsername] = useState(null);
    const [fullnames, setFullNames] = useState(null);
    const [email, setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [data, setdata] = useState({username: '', fullnames: '', email: '', password: '', confirmPassword:'' });

    const [Dialog, setDialog] = useState({
        Title: "",
        Message: "",
        isLoading: false
    });

    const navigate = useNavigate();


    let submit = (e) => {
        e.preventDefault(); //prevent page refresh
        if(data.password !== data.confirmPassword) {
            console.log("Validate");
            setDialog({
                Title: "Password Error",
                Message: "Your Passwords do not Match. Try Again.",
                isLoading: true
            });
        }
        else {
            console.log("Passwords are correct");
            let defRole = {"rolename" : "Patient"};
            const postData = { username: username, fullNames: fullnames, email: email, password: password, role: defRole }; 
            axios.post('/Create/User', postData).then(response => {
                console.log("Reaches Here");
                console.log(response.status);
                console.log(response.data);

                setDialog({
                    Title: "Success!!",
                    Message: "You have successfully Created your Account. Now Log In.",
                    isLoading: true
                });

                navigate("/login");
                
                
            }).catch( error => {
                console.log("Reaches Here11111");
                console.log(error.response.status);
                console.log(error.response.data);
                if(error.response.status === 401) {
                    setDialog({
                        Title: "UnSuccessful!!",
                        Message: error.response.data + " Try Again.",
                        isLoading: true
                    });

                    console.log("401111111111111111111");
                    console.log(Dialog.isLoading);
                    if(!Dialog.isLoading) {
                        e.target.reset();
                        navigate("/login");
                    }
                }
                else {
                    setDialog({
                        Title: "UnSuccessful!!",
                        Message: "The Registration Process was Unsuccessful. Try Again.",
                        isLoading: true
                    });
                }         
                
            })           
        }

       
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
        if(id === "fullnames"){
            setFullNames(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setConfirmPassword(value);
        }
        console.log("Data:");
        console.log(data);

       
        


    }

    return (
        <>
        <div className='login'>
                <div  style={{textAlign: "center", paddingTop: "80px"}}>
                  <BsBookHalf style={{fontSize: "30px", color: "#191970", padding: "5px 6px", border: "1px solid #191970", borderRadius: "50%"}}/>
                  <span style={{color: "#191970", fontSize: 22}}>My HealthDiary!</span>
              </div>
             <div className="login_wrapper" style={{marginTop: 0}}>
            <div id="register">
                <section className="login_content">
                  <form onSubmit={(e) => submit(e)}>
                    <h1>Create Account</h1>
                    <div>
                        <input type="text" className="form-control" onChange = {(e) => handleInputChange(e)} id="username" placeholder="Username" required />
                    </div>
                    <div>
                        <input type="text" className="form-control" onChange = {(e) => handleInputChange(e)} id="fullnames" placeholder="Full Names" required />
                    </div>
                    <div>
                        <input type="email" className="form-control" onChange = {(e) => handleInputChange(e)} id="email" placeholder="Email" required />
                    </div>
                    <div>
                        <input type="password" className="form-control" onChange = {(e) => handleInputChange(e)} id="password" placeholder="Password" required />
                    </div>
                    <div>
                        <input type="password" className="form-control" onChange = {(e) => handleInputChange(e)} id="confirmPassword" placeholder="Confirm Password" required />
                    </div>
                    <div>
                        <button style={{backgroundColor: '#191970', color: 'white'}} className="btn btn-default submit" >Submit</button>
                    </div>
                    <div className="clearfix" />
                    <div className="separator">
                        <p className="change_link">Already have an account ?
                        <Link to='/login' style={{marginLeft: "10px", fontSize: 14, textDecoration: "underline"}}>Log in</Link>
                        </p>
                        <div className="clearfix" />
                        <br />
                    </div>
                    </form>
                </section>
            </div>
            </div>
           <div>
        </div>
        </div>
        { Dialog.isLoading && <CustomDialog DialogStatus={OnCloseDialog} Title={Dialog.Title} Message={Dialog.Message} />}
        
    </>
    );
}

export default Register