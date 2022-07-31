import React, { useState, useEffect,useContext}  from 'react';
import { db, auth} from '../../Firebase';
import {UserContext} from "../../UserContext"
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { ArrowLeftCircle } from 'react-bootstrap-icons';
import {useParams, useNavigate} from "react-router-dom"



function Result(props) {

    const currentUser = useContext(UserContext);



  return (
    <>  
        <div className='rowStudent'>
            <p>{props.id}</p>
            <p>{props.name}</p>
            <p className="rowStudent img">
                    {props.grade}
            </p>
            
        </div>
    </>
   
  )
}

export default Result