import React, { useState, useEffect,useContext}  from 'react';
import {Link} from "react-router-dom"
import deleteImg from "../../Styles/Images/delete.png"
import editImg from "../../Styles/Images/edit.png"
import { db} from '../../Firebase';
import {UserContext} from "../../UserContext"



function Subject(props) {

    const [toggleDelete, setToggleDelete] = useState("hidden");
    const [toggleEdit, setToggleEdit] = useState("hidden");
    const [editInput, setEditInput] = useState(props.Name);
    const [noInput , setNoInput] = useState("true");

    const currentUser = useContext(UserContext);


    const deleteAction = () => {
        setToggleDelete('hidden');
        db.collection('Users').doc(`${currentUser.uid}`).collection("Exams").doc(props.id).delete()
    }
    const cancelAction = () => {
        setToggleDelete('hidden')
        setToggleEdit('hidden')
        setEditInput(props.Name);
    }
    const editAction = () =>{
        db.collection('Users').doc(`${currentUser.uid}`).collection("Exams").doc(props.id).set({
            ExamName: editInput,
        }).then((snap) => {
            cancelAction();
        }).catch(()=>{
            cancelAction();
        })
        
    }
    const toggleDelAction = () =>{
        setToggleDelete("notHidden")
    }
    const toggleEditAction = () => {
        setToggleEdit("notHidden")
    }

    useEffect(() => {
        if (editInput != "") {
         setNoInput("false");
        }
        else{
         setNoInput("true");
        }
     }, [editInput]);

  return (
  <>
    <div className={`overlay ` + toggleDelete}>
        <div className="popupCard">
            <h3>DELETE {props.Name}?</h3>
            <h5>Are you sure you want to delete {props.Name}?</h5>
            <div className="buttons">
                <p onClick={cancelAction}>CANCEL</p>
                <button onClick={deleteAction}>DELETE</button>
            </div>
        </div>
    </div>

    <div className={`overlay ` + toggleEdit}>
        <div className="popupCard">
            <h3>EDIT {props.Name}?</h3>
            <input type="text"  value={editInput} onChange={(e) => setEditInput(e.target.value)} />
            <div className="buttons">
                <p onClick={cancelAction}>CANCEL</p>
                <button onClick={editAction} className={noInput}>EDIT</button>
            </div>
        </div>
    </div>


    <div className='subject'>
            <Link className='link empty' to={`/dashboard/exam/` + props.id}>
                <div className=''></div>
            </Link>   
            <div className="subjectOptions">
                <p>{props.Name}</p>
                <div className="subjectOptImages">
                    <img src={editImg} alt="" onClick={toggleEditAction}/>
                    <img src={deleteImg} alt=""  onClick={toggleDelAction}/>
                </div>
            </div>
    </div>
  </>
       
  )
}

export default Subject