import React from "react";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as GiIcons from 'react-icons/gi';
import * as MdIcons from 'react-icons/md';

export const SidebarData = [
    {
        title: 'Dashboard',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'BP Readings',
        path: '/bpreadings',
        icon: <GiIcons.GiNotebook />,
        cName: 'nav-text'
    },
    {
        title: 'Appointments',
        path: '/appointments',
        icon: <AiIcons.AiFillCalendar />,
        cName: 'nav-text'
    },
    {
        title: 'Exercise Tracker',
        path: '/exercisetracker',
        icon: <FaIcons.FaRunning />,
        cName: 'nav-text'
    },
    {
        title: 'Diet Tracker',
        path: '/diettracker',
        icon: <MdIcons.MdFoodBank />,
        cName: 'nav-text'
    }
    

]