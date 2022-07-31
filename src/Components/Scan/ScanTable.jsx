import React, { useState, useEffect,useContext}  from 'react';
import { db ,auth} from '../../Firebase';
import {UserContext} from "../../UserContext"
import "firebase/compat/firestore";
import {useParams, useNavigate} from "react-router-dom"
import ScanStudents from './ScanStudents';
import Papa from "papaparse";


function ScanTable() {
    const navigate = useNavigate();
    const currentUser = useContext(UserContext);
    const [students, setStudents] = useState([]);
    const  { classid } = useParams();
    const [exam, setExam] = useState([]);

    const [examName, setExamName] = useState("");

    const [errors, setErrors] = useState("hidden");


    const [q1, setQ1] = useState("A");
    const [q2, setQ2] = useState("A");
    const [q3, setQ3] = useState("A");
    const [q4, setQ4] = useState("A");
    const [q5, setQ5] = useState("A");
    const [q6, setQ6] = useState("A");
    const [q7, setQ7] = useState("A");
    const [q8, setQ8] = useState("A");
    const [q9, setQ9] = useState("A");
    const [q10, setQ10] = useState("A");

    const [p1, setP1] = useState(1);
    const [p2, setP2] = useState(1);
    const [p3, setP3] = useState(1);
    const [p4, setP4] = useState(1);
    const [p5, setP5] = useState(1);
    const [p6, setP6] = useState(1);
    const [p7, setP7] = useState(1);
    const [p8, setP8] = useState(1);
    const [p9, setP9] = useState(1);
    const [p10, setP10] = useState(1);
    




    // Grade Calculation:
    const calculateGrade = () =>{
        if(examName != ""){
            db.collection("Users").doc(auth.currentUser.uid).collection("Exams").add({
                ExamName: examName,
                ClassId: classid,
            }).then((docRef)=>{

                if(exam.length > 0){
                    exam.map((exam) =>{
                        let grade =  0
                        let quest1 = 0, quest2 = 0, quest3 = 0, quest4 = 0, quest5 = 0, quest6 = 0, quest7 = 0, quest8 = 0, quest9 = 0,
                        quest10 = 0;
                        let total = 0;
                        let array = [p1,p2,p3,p4,p5,p6,p7,p8,p9,p10];
                        for(let x = 0; x < 10;x++){
                            if(array[x]==""){
                                array[x] = 0;
                            }
                            else{
                                array[x] = parseInt(array[x]);
                                total = total + array[x]
                            }
                        }
                        
                        for(let x = 0; x < exam.results.length ; x++){
                            if (exam.results[x][1] == "Question 1"){
                                quest1 = quest1 + 1
                            }
                            else if (exam.results[x][1] == "Question 2"){
                                quest2 = quest2 + 1
                            }
                            else if (exam.results[x][1] == "Question 3"){
                                quest3 = quest3 + 1
                            }
                            else if (exam.results[x][1] == "Question 4"){
                                quest4 = quest4 + 1
                            }
                            else if (exam.results[x][1] == "Question 5"){
                                quest5 = quest5 + 1
                            }
                            else if (exam.results[x][1] == "Question 6"){
                                quest6 = quest6 + 1
                            }
                            else if (exam.results[x][1] == "Question 7"){
                                quest7 = quest7 + 1
                            }
                            else if (exam.results[x][1] == "Question 8"){
                                quest8 = quest8 + 1
                            }
                            else if (exam.results[x][1] == "Question 9"){
                                quest9 = quest9 + 1
                            }
                            else if (exam.results[x][1] == "Question 010"){
                                quest10 = quest10 + 1
                            }
        
                        }
                        
                        for(let x = 0; x < exam.results.length ; x++){
                                
                                // Question 1: 
                                if (exam.results[x][1] == "Question 1" && exam.results[x][0] == q1) {
                                    if (quest1 <=1) {
                                        grade = grade + parseInt(p1);
                                        quest1 = quest1 + 1;
                                    }  
                                }
                                // Question 2: 
                                else if(exam.results[x][1] == "Question 2" && exam.results[x][0] == q2){
                                    if (quest2 <=1) {
                                        grade = grade + parseInt(p2);
                                        quest2 = quest2 + 1;
                                    }  
                                    
                                }
                                // Question 3: 
                                else if(exam.results[x][1] == "Question 3" && exam.results[x][0] == q3){
                                    if (quest3 <= 1) {
                                        grade = grade + parseInt(p3);
                                        quest3 = quest3 + 1;
                                    }  
                                    
                                }
                                // Question 4: 
                                else if(exam.results[x][1] == "Question 4" && exam.results[x][0] == q4){
                                    if (quest4 <=1) {
                                        grade = grade + parseInt(p4);
                                        quest4 = quest4 + 1;
                                    }  
                                    
                                }
                                // Question 5: 
                                else if(exam.results[x][1] == "Question 5" && exam.results[x][0] == q5){
                                    if (quest5 <=1) {
                                        grade = grade + parseInt(p5);
                                        quest5 = quest5 + 1;
                                    }  
                                    
                                }
                                // Question 6: 
                                else if(exam.results[x][1] == "Question 6" && exam.results[x][0] == q6){
                                    if (quest6 <=1) {
                                        grade = grade + parseInt(p6);
                                        quest6 = quest6 + 1;
                                    }  
                                }
                                // Question 7: 
                                else if(exam.results[x][1] == "Question 7" && exam.results[x][0] == q7){
                                    if (quest7 <=1) {
                                        grade = grade + parseInt(p7);
                                        quest7 = quest7 + 1;
                                    }  
                                    
                                }
                                // Question 8: 
                                else if(exam.results[x][1] == "Question 8" && exam.results[x][0] == q8){
                                    if (quest8 <=1) {
                                        grade = grade + parseInt(p8);
                                        quest8 = quest8 + 1;
                                    }  
                                    
                                }
                                // Question 9: 
                                else if(exam.results[x][1] == "Question 9" && exam.results[x][0] == q9){
                                    if (quest9 <=1) {
                                        grade = grade + parseInt(p9);
                                        quest9 = quest9 + 1;
                                    }  
                                    
                                }
                                // Question 10: 
                                else if(exam.results[x][1] == "Question 010" && exam.results[x][0] == q10){
                                    if (quest10 <=1) {
                                        grade = grade + parseInt(p10);
                                        quest10 = quest10 + 1;
                                    }  
                                    
                                }
                            
                        }
        
                        exam.grade = `${grade}//${total}`;
                        
                    })
        
                    exam.map((exam) =>{
                       db.collection("Users").doc(auth.currentUser.uid).collection("Exams").doc(docRef.id).collection("Students").add({
                            StudentId: exam.id,
                            SudentName: exam.name,
                            StudentGrade: exam.grade,
                       })
                    })
                }
                navigate(`/dashboard/exam/` + docRef.id)

            })
        }
        else{
            setErrors("notHidden")
        }
        
        
    }

    const getData = (examData)=>{
        setExam(oldExam => [...oldExam, examData])
    }

    const getStudents = () =>{
        db.collection('Users').doc(`${currentUser.uid}`).collection("Classes").doc(classid).collection("Students").orderBy('StudentId' , "asc").onSnapshot(onSnapshot => {
            setStudents(onSnapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        })
    }

    useEffect(() => {
        getStudents();
    }, [currentUser]);

  return (
    <>  

        <div className={`overlay cursor ` + errors} onClick={()=>{setErrors("hidden")}}>
            <div className="popupCard">
                <h3>Please Input The Exam Name</h3>            
            </div>
        </div>


    <div className="container">
            <div className='topBar dashboard'>
                   SCAN
            </div>
            <div className="instructions">
                <p>Please choose the correct answer for each question from question 1 to 10. If the questions that you have provided to the students
                    are less than 10, please leave the score of that question empty. You can fill the score of each question in the input area provided below the
                    dropdown. 
                </p>

            </div>
            
            <div>
                <p className='examName'>
                    Exam name: <input type="text" placeholder='Please input the Exam Name' value={examName} onChange={(e) => setExamName(e.target.value)}/>
                </p>
                
                <div className="questionsAns">
                    <div className="rowAns">
                        <div className='columnInput'>Question 1: 
                        <select  value={q1} onChange={(e) => setQ1(e.target.value)}>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                        <input type="number" placeholder='POINTS' value={p1} onChange={(e) => setP1(e.target.value)}/></div>


                        <div className='columnInput'>Question 2: 
                            <select  value={q2} onChange={(e) => setQ2(e.target.value)}>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>
                        <input type="number" placeholder='POINTS' value={p2} onChange={(e) => setP2(e.target.value)}/></div>
                        <div className='columnInput'>Question 3: 
                            <select  value={q3} onChange={(e) => setQ3(e.target.value)}>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>
                        <input type="number" placeholder='POINTS' value={p3} onChange={(e) => setP3(e.target.value)}/></div>
                    </div>
                    <div className="rowAns">
                        <div className='columnInput'>Question 4: 
                            <select  value={q4} onChange={(e) => setQ4(e.target.value)}>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>
                            <input type="number" placeholder='POINTS' value={p4} onChange={(e) => setP4(e.target.value)}/></div>
                        <div className='columnInput'>Question 5: 
                            <select  value={q5} onChange={(e) => setQ5(e.target.value)}>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>
                        <input type="number" placeholder='POINTS' value={p5} onChange={(e) => setP5(e.target.value)}/></div>
                        <div className='columnInput'>Question 6: 
                        <select  value={q6} onChange={(e) => setQ6(e.target.value)}>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                        <input type="number" placeholder='POINTS' value={p6} onChange={(e) => setP6(e.target.value)}/></div>
                    </div>
                    <div className="rowAns">
                        <div className='columnInput'>Question 7: 
                        <select  value={q7} onChange={(e) => setQ7(e.target.value)}>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                        <input type="number" placeholder='POINTS' value={p7} onChange={(e) => setP7(e.target.value)}/></div>
                        <div className='columnInput'>Question 8: 
                        <select  value={q8} onChange={(e) => setQ8(e.target.value)}>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                        <input type="number" placeholder='POINTS' value={p8} onChange={(e) => setP8(e.target.value)}/></div>
                        <div className='columnInput'>Question 9: 
                        <select  value={q9} onChange={(e) => setQ9(e.target.value)}>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                        <input type="number" placeholder='POINTS' value={p9} onChange={(e) => setP9(e.target.value)}/></div>
                    </div>
                    <div className="rowAns">
                        <div className='columnInput'>Question 10: 
                        <select  value={q10} onChange={(e) => setQ10(e.target.value)}>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                        <input type="number" placeholder='POINTS' value={p10} onChange={(e) => setP10(e.target.value)}/></div>
                    </div>                    
                </div>
            </div>
            <div className="header">
                <p>Id</p>
                <p>Full Name</p>
                <p className='img'>JPG FILE</p>
            </div>
            <div className='table'>
                {students.map((student) =>{
                        return (
                        <ScanStudents key = {student.id}
                                        id = {student.id}
                                        Name = {student.Name}
                                        StudentId = {student.StudentId}
                                        ClassId = {classid}
                                        onSubmit={getData}
                                />
                        )
                    })}
            </div>
            <div className="btnDivScan">
                <button className="btnScan" onClick={calculateGrade}>Scan</button>
            </div>
           
        </div>
        </>
  )
}

export default ScanTable