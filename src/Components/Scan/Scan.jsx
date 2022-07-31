import React, { useState, useEffect,useContext}  from 'react';
import { db} from '../../Firebase';
import {UserContext} from "../../UserContext"
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import ScanClass from './ScanClass';

function Scan() {
    const [classes, setClasses] = useState([]);
    const currentUser = useContext(UserContext);

    const getSubjects = () =>{
        db.collection('Users').doc(`${currentUser.uid}`).collection("Classes").orderBy("CreatedAt" , "desc").onSnapshot(onSnapshot => {
            setClasses(onSnapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        })
    }
    useEffect(() => {
        getSubjects();
    }, []);
  return (
    <div className='container'>
        <div className='topBar dashboard'>
            SCAN
        </div>
        <div className="subjectsDash">
                   {classes.map((sub) =>{
                    return <ScanClass key = {sub.id}
                                    id = {sub.id}
                                    Name = {sub.Name}
                                    CreatedAt = {sub.CreatedAt}
                            />
                   })}
            </div>
    </div>
  )
}

export default Scan