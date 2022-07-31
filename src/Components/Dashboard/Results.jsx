import React, { useState, useEffect,useContext}  from 'react';
import { db, auth} from '../../Firebase';
import {UserContext} from "../../UserContext"
import { CSVLink } from 'react-csv';
import "firebase/compat/firestore";
import Result from './Result';
import { ArrowLeftCircle } from 'react-bootstrap-icons';
import {useParams, useNavigate} from "react-router-dom"


function Results() {
    const [students, setStudents] = useState([]);
    const currentUser = useContext(UserContext);
    const  { examid } = useParams();

    const headers = [
        {label: "Student ID" , key: "StudentId"},
        {label: "Full Name" , key: "SudentName"},
        {label: "Grade" , key: "StudentGrade"},

    ];

    const csvFile = {
        filename: "ExamCSV",
        headers: headers,
        data: students
    }

    const getStudents = () =>{
        db.collection('Users').doc(`${currentUser.uid}`).collection("Exams").doc(examid).collection("Students").orderBy('StudentId' , "asc").get().then(onSnapshot => {
            setStudents(onSnapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        })
    }
    console.log(students)
    useEffect(() => {
        getStudents();
    }, [currentUser]);

  return (
    <div className='container'>
            <div className='topBar dashboard'>
                EXAMS
                <CSVLink {...csvFile}><button className='yellow'>EXPORT CSV</button></CSVLink>
                
            </div>
            <div className="header">
                <p>Id</p>
                <p>Full Name</p>
                <p className='img'>Grade</p>
            </div>
            <div className='table'>
                {students.map((student) =>{
                        return <Result key = {student.id}
                                        id = {student.StudentId}
                                        name = {student.SudentName}
                                        grade = {student.StudentGrade}
                                />
                    })}
            </div>
    </div>
  )
}

export default Results