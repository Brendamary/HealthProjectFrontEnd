import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import { SidebarData } from "./SideBarData.js";
import './NavBar.css';
import {IconContext} from 'react-icons';

function NavBar() {

    const [sidebar, setSidebar] = useState(true);
    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
        <IconContext.Provider value={{ color: '#fff' }}>
          <div className='navbar'>
            <Link to='#' className='menu-bars'>
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
            {/* <div className="navprofile">
                    <MdIcons.MdAccountCircle />
                    <span className="navuseraccount">Brenda Njeri</span>
            </div> */}
            <div className="profile clearfix">
                <div className="profile_pic">
                    <MdIcons.MdAccountCircle />
                </div>
                <div className="profile_info">
                    <span>Welcome,</span>
                    <h4>John Doe</h4>
                </div>
             </div>
          </div>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' >
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <AiIcons.AiOutlineClose onClick={showSidebar}/>
                </Link>
              </li>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </IconContext.Provider>
      </>
    );
}

export default NavBar