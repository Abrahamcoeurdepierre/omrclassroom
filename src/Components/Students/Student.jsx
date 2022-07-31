import React, { useState, useEffect,useContext}  from 'react';
import { db} from '../../Firebase';
import {UserContext} from "../../UserContext"
import Papa from "papaparse";
import "firebase/compat/firestore";
import Students from './Students'
import { ArrowLeftCircle } from 'react-bootstrap-icons';
import {useParams, useNavigate} from "react-router-dom"


function Student() {
    const navigate = useNavigate();
    const  { classid } = useParams();
    const [addInput, setAddInput] = useState("");
    const currentUser = useContext(UserContext);
    const [students, setStudents] = useState([]);
    const [classe, setClasse] = useState([]);
    const [IdInput, setIdInput] = useState("");

    const [data, setData] = useState([]);


    const inputChangeHandler = (event) => {
        if (event.target.files[0]) {
            Papa.parse(event.target.files[0], {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    console.log(results)
                  results.data.map(student => {
                    setData(current => [...current, {StudentId: student.StudentId , Name: student.Name}]);
                  })
                },
              });
        }

        
        
      };

      const importBtn = () =>{
        if (data.length > 0 ) {
            data.map(student => {
                try {
                    db.collection('Users').doc(`${currentUser.uid}`).collection("Classes").doc(classid).collection("Students").add({
                        StudentId: student.StudentId,  
                        Name: student.Name,
                    }).then(()=>{
                        
                    })

                } catch (err) {
                   
                }
             
            })
            
        }
        else{
            window.alert("Please input a file or change the used id")
        }
        setData([]);
    }

    const getStudents = () =>{
        db.collection('Users').doc(`${currentUser.uid}`).collection("Classes").doc(classid).collection("Students").orderBy('StudentId' , "asc").onSnapshot(onSnapshot => {
            setStudents(onSnapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        })
        db.collection('Users').doc(`${currentUser.uid}`).collection("Classes").where("__name__" , "==", classid).onSnapshot(onSnapshot => {
            setClasse(onSnapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        })
    }

    useEffect(() => {
        getStudents();
    }, [currentUser]);


    const addAction = (e) => {
        e.preventDefault();
        setAddInput('')
        setIdInput("")
        db.collection('Users').doc(`${currentUser.uid}`).collection("Classes").doc(classid).collection("Students").add( {
            Name: addInput,
            StudentId: IdInput
        }).then(snaphot => {
           
        }).catch(error => {

        })
        
    }

    const backAction = () =>{
        navigate('/class')
    }

  return (
    <>     
        <form onSubmit={addAction} className="form">
        
        <div className="container">
            <div className='topBar dashboard'>
                    {classe.map((classe) =>{
                        return(
                    <div className="topbarName" key={classe.id}>
                        <ArrowLeftCircle color="#011936" size={20} className="arrowLeft" onClick={backAction}/> Class/{classe.Name}
                    </div>
                        )
                    })}
                    <div className="topbarInputs">
                        <div className="inputName">
                            <p> Full Name</p>
                            <input type="text" value={addInput} onChange={(e) => setAddInput(e.target.value)} required/>
                        </div>
                        <div className="inputId">
                            <p>Id</p>
                            <input type="number" value={IdInput} onChange={(e) => setIdInput(e.target.value)} required />
                        </div>
                        <button className='blue'  type='submit'>ADD NEW</button>
                    </div>
                    
                </div>

            <div className="importCSV">
                Import CSV: 
                <input
                type="file"
                name="file"
                accept=".csv"
                onChange={inputChangeHandler}
                className="inputFile"
                />
                <div className="btnImport">
                    <button type='button' className='yellow width' onClick={importBtn}> Import CSV </button>

                </div>
            </div>
                
            <div className="header">
                <p>Id</p>
                <p>Full Name</p>
                <p className='img'>Action</p>
            </div>
            <div className='table'>
                {students.map((student) =>{
                        return <Students key = {student.id}
                                        id = {student.id}
                                        Name = {student.Name}
                                        StudentId = {student.StudentId}
                                        ClassId = {classid}
                                />
                    })}
            </div>
        </div>
        </form>
    
    </>
  )
}

export default Student