import React, { useState, useEffect,useContext}  from 'react';
import Subject from './Subject'
import { db} from '../../Firebase';
import {UserContext} from "../../UserContext"
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import {useParams, useNavigate} from "react-router-dom"

function Dashboard() {
    const [toggleAdd, setToggleAdd] = useState("hidden");
    const [addInput, setAddInput] = useState("");
    const [noInput , setNoInput] = useState("true");

    const [subjects, setSubjects] = useState([]);
    const currentUser = useContext(UserContext);
    const getSubjects = () =>{
        db.collection('Users').doc(`${currentUser.uid}`).collection("Exams").onSnapshot(onSnapshot => {
            setSubjects(onSnapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
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

    // const addAction = () => {
    //     db.collection('Users').doc(`${currentUser.uid}`).collection("Subjects").add( {
    //         Name: addInput,
    //         CreatedAt: firebase.firestore.FieldValue.serverTimestamp()

    //     }).then(snaphot => {
    //         setAddInput('')
    //         setToggleAdd("hidden")
    //     }).catch(error => {

    //     })
        
    // }

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
        {/* <div className={`overlay ` + toggleAdd}>
            <div className="popupCard">
                <h3>NEW SUBJECT</h3>
                <input type="text"  value={addInput} onChange={(e) => setAddInput(e.target.value)} />
                <div className="buttons">
                    <p onClick={cancelAction}>CANCEL</p>
                    <button className={noInput} onClick={addAction}>ADD</button>
                </div>
            </div>
        </div> */}


        <div className='container'>
            <div className='topBar dashboard'>
                EXAMS
            </div>

            <div className="subjectsDash">
                   {subjects.map((sub) =>{
                    return <Subject key = {sub.id}
                                    id = {sub.id}
                                    Name = {sub.ExamName}
                            />
                   })}
            </div>
        </div>
    </>
  )
}

export default Dashboard