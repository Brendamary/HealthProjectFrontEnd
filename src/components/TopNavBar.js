import React, { useState } from "react";
import './NavBar.css';
import { Link, useNavigate  } from "react-router-dom";
import {IconContext} from 'react-icons';
import {Nav, NavDropdown, Navbar} from 'react-bootstrap';
import { SidebarData } from "./SideBarData.js";
import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md';
import * as BsIcons from 'react-icons/bs';
import '../css/bootstrap.min.css';
import '../css/custom.min.css';
import '../css/custom.css';


function TopNavBar() {
    const [sidebar, setSidebar] = useState(true);
    const showSidebar = () => setSidebar(!sidebar);
    const loggedInUser = localStorage.getItem("name");
    const navigate = useNavigate();


    const invalidateSession =() => {
        console.log("Invalidate");
         localStorage.clear();
         navigate("/login");

    }

    return (
        <>
        <IconContext.Provider value={{ color: '#fff' }}>
        <div className='topnavbar'>
           <Navbar className="nav navbar-right"><IoIcons.IoMdArrowDropdown style={{color: "#191970", marginTop: "25px", marginRight: "20px"}} />
                <Nav className="toprightnav">
                    <NavDropdown title={loggedInUser}>
                        <NavDropdown.Item className="toprightlogout" onClick={invalidateSession}>Log Out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
              
            </Navbar>
          </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <div className="sidebartitle">
                <BsIcons.BsBookHalf style={{fontSize: "30px", padding: "5px 6px", border: "1px solid #EAEAEA", borderRadius: "50%"}}/>
                <span style={{color: "#fff"}}>My HealthDiary!</span>
            </div>
            <div className="profile clearfix">
                <div className="profile_pic">
                    <MdIcons.MdAccountCircle style={{fontSize: "70px", marginTop: "20px", marginLeft:"10px" }}/>
                </div>
                <div className="profile_info" style={{marginTop: "15px"}}>
                    <span style={{color: "#fff", margin: 0}}>Welcome,</span>
                    <br />
                    <span style={{color: "#fff", margin: 0, fontSize: 16}}>{loggedInUser}</span>
                </div>
            </div>


            <br />
          <div style={{marginTop: "20px"}}>
            <ul className='nav-menu-items' >
                {/* <li className='navbar-toggle'>
                    <Link to='#' className='menu-bars'>
                    <AiIcons.AiOutlineClose onClick={showSidebar}/>
                    </Link>
                </li> */}
                {SidebarData.map((item, index) => {
                    return (
                        <div>
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                            </Link>
                        </li>
                    </div>
                    );
                })}

                </ul>
          </div>
           
          </nav>
        </IconContext.Provider>
      </>

            
        

    );
}

export default TopNavBar