import React, { useState, useEffect,useContext}  from 'react';
import deleteImg from "../../Styles/Images/delete.png"
import editImg from "../../Styles/Images/edit.png"
import { db} from '../../Firebase';
import {UserContext} from "../../UserContext"
import axios from 'axios';

function ScanStudents(props) {
    const [image, setImage] = useState();
    const [read, setRead] = useState("");

    
    const fileSelectedHandler = (event) =>{
        setImage(event.target.files[0])
              
    }
    useEffect(() => {
        if(image){
            
            const fd = new FormData();
            fd.append('image', image,image.name);
            axios.post("http://127.0.0.1:5000/test",fd).then(res =>{
                props.onSubmit({results: res.data.data, id: props.StudentId,   name: props.Name})
                setRead("hidden")
            }).catch(()=>{
                setRead("hidden")
            }) 
        }
    }, [image]);
    
  return (
    <div className='rowStudent'>
        <p>{props.StudentId}</p>
        <p>{props.Name}</p>
        <p className="rowStudent img">
               <input type="file" className={read} onChange={fileSelectedHandler} accept="image/*"/>
        </p>

    </div>
  )
}

export default ScanStudents