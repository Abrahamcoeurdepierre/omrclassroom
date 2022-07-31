import React, { useState, useEffect,useContext}  from 'react';
import deleteImg from "../../Styles/Images/delete.png"
import editImg from "../../Styles/Images/edit.png"
import { db} from '../../Firebase';
import {UserContext} from "../../UserContext"




function Students(props) {
    const [toggleDelete, setToggleDelete] = useState("hidden");
    const [toggleEdit, setToggleEdit] = useState("hidden");
    const [editInput, setEditInput] = useState(props.Name);
    const [editId, setEditId] = useState(props.StudentId);
    const [noInput , setNoInput] = useState("true");

    const currentUser = useContext(UserContext);

    const deleteAction = () => {
        setToggleDelete('hidden');
        db.collection('Users').doc(`${currentUser.uid}`).collection("Classes").doc(props.ClassId).collection("Students").doc(props.id).delete()
    }
    const cancelAction = () => {
        setToggleDelete('hidden')
        setToggleEdit('hidden')
        setEditInput(props.Name);
        setEditId(props.StudentId);
    }
    const editAction = () =>{
        db.collection('Users').doc(`${currentUser.uid}`).collection("Classes").doc(props.ClassId).collection("Students").doc(props.id).set({
            Name: editInput,
            StudentId: editId
        })
        cancelAction();
    }
    const toggleDelAction = () =>{
        setToggleDelete("notHidden")
    }
    const toggleEditAction = () => {
        setToggleEdit("notHidden")
    }

    useEffect(() => {
        if (editInput == "" || editId == "") {
         setNoInput("true");
        }
        else{
         setNoInput("false");
        }
     }, [editInput , editId]);



  return (
    <>  
        <div className={`overlay ` + toggleDelete}>
            <div className="popupCard">
                <h3>DELETE {props.Name}?</h3>
                <h5>Are you sure you want to delete {props.Name}?</h5>
                <div className="buttons">
                    <p onClick={cancelAction}>CANCEL</p>
                    <button onClick={deleteAction} type="button">DELETE</button>
                </div>
            </div>
        </div>

        <div className={`overlay ` + toggleEdit}>
            <div className="popupCard">
                <div className="update">
                    Full Name
                    <input type="text"  value={editInput} onChange={(e) => setEditInput(e.target.value)} />
                </div>
                <div className="update">
                    ID
                    <input type="text"  value={editId} onChange={(e) => setEditId(e.target.value)} />
                </div>
                <div className="buttons">
                    <p onClick={cancelAction}>CANCEL</p>
                    <button onClick={editAction} className={noInput} type="button">UPDATE</button>
                </div>
            </div>
        </div>
        <div className='rowStudent'>
            <p>{props.StudentId}</p>
            <p>{props.Name}</p>
            <p className="rowStudent img">
                    <img src={editImg} alt="" onClick={toggleEditAction}/>
                    <img src={deleteImg} alt="" onClick={toggleDelAction}/>
            </p>
            
        </div>
    </>
   
  )
}

export default Students