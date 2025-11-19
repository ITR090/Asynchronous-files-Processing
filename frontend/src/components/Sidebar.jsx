import React from 'react';
import { Link } from 'react-router-dom'; 

const Sidebar = () => {   
    return (
        <>
           <li><Link to={'landmark-detection'}>landmark-detection</Link></li>
           <li><Link to={'document-translator'}>document-translator</Link></li>
        </>
    )
}

export default Sidebar;