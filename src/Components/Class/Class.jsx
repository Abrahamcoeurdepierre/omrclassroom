import React, { useState, useEffect,useContext}  from 'react';
import { db} from '../../Firebase';
import {UserContext} from "../../UserContext"
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import Classes from './Classes';

function Class() {
    const [toggleAdd, setToggleAdd] = useState("hidden");
    const [addInput, setAddInput] = useState("");
    const [noInput , setNoInput] = useState("true");

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

    const cancelAction = () => {
        setToggleAdd('hidden')
        setAddInput('')
    }
    const toggleAddAction = () =>{
        setToggleAdd("notHidden")
    }

    const addAction = () => {
        db.collection('Users').doc(`${currentUser.uid}`).collection("Classes").add( {
            Name: addInput,
            CreatedAt: firebase.firestore.FieldValue.serverTimestamp()

        }).then(snaphot => {
            setAddInput('')
            setToggleAdd("hidden")
        }).catch(error => {

        })
        
    }

    useEffect(() => {
       if (addInput != "") {
        setNoInput("false");
       }
       else{
        setNoInput("true");
       }
    }, [addInput]);

  return (
    <>  
        <div className={`overlay ` + toggleAdd}>
            <div className="popupCard">
                <h3>NEW CLASS</h3>
                <input type="text"  value={addInput} onChange={(e) => setAddInput(e.target.value)} />
                <div className="buttons">
                    <p onClick={cancelAction}>CANCEL</p>
                    <button className={noInput} onClick={addAction}>ADD</button>
                </div>
            </div>
        </div>


        <div className='container'>
            <div className='topBar dashboard'>
                CLASS
                <button className='yellow' onClick={toggleAddAction}>ADD NEW</button>
            </div>

            <div className="subjectsDash">
                   {classes.map((sub) =>{
                    return <Classes key = {sub.id}
                                    id = {sub.id}
                                    Name = {sub.Name}
                                    CreatedAt = {sub.CreatedAt}
                            />
                   })}
            </div>
        </div>
    </>
  )
}

export default Class