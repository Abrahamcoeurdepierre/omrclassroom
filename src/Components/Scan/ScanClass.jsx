import React, { useState, useEffect,useContext}  from 'react';
import {Link} from "react-router-dom"
import deleteImg from "../../Styles/Images/delete.png"
import editImg from "../../Styles/Images/edit.png"
import { db} from '../../Firebase';
import {UserContext} from "../../UserContext"

function ScanClass(props) {
    const currentUser = useContext(UserContext);
  return (
    <div className='subject'>
            <Link className='link empty' to={`/scan/scantable/` + props.id}>
                <div className=''></div>
            </Link>   
            <div className="subjectOptions">
                <p>{props.Name}</p>
            </div>
    </div>
  )
}

export default ScanClass