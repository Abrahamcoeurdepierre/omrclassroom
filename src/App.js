import React from 'react'
import "./Styles/Styles.css"
import Signup from './Components/Authentifications/Signup'
import Signin from './Components/Authentifications/Signin'
import Sidebar from './Components/NavBar/Sidebar'
import { UserContext } from './UserContext';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth,db} from "./Firebase.js";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Dashboard from './Components/Dashboard/Dashboard'
import Class from './Components/Class/Class'
import Student from './Components/Students/Student'
import CreateExam from './Components/CreateExam/CreateExam'
import Scan from './Components/Scan/Scan'
import ScanTable from './Components/Scan/ScanTable'
import Results from './Components/Dashboard/Results'
import ForgotPassword from './Components/Authentifications/ForgotPassword'

function App() {
  const [user,loading] = useAuthState(auth);

  if (loading) {
    return(
      <div>Loading</div>
    )
  } else {
    if(user){
      return(
        <Router>
          <UserContext.Provider value={user}>
            <div className='mainFrame'>
            <Sidebar/>
            
            <Routes>
              <Route path='/' element={<Dashboard/>}/>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/login' element={<Dashboard/>}/>
              <Route path='/class' element={<Class/>}/>
              <Route path='/dashboard/exam/:examid' element={<Results/>}/>
              <Route path='/class/:classid' element={<Student/>}/>
              <Route path='/createexam' element={<CreateExam/>}/>
              <Route path='/scan' element={<Scan/>}/>
              <Route path='/scan/scantable/:classid' element={<ScanTable/>}/>
            </Routes>
          </div>
          </UserContext.Provider>
        </Router>
      )
    }
    else{
      return (
        <Router>
          <UserContext.Provider value={user}>
            <Routes>
              <Route path='*' element={<Signup/>}/>
              <Route path='/login' element={<Signin/>}/>
              <Route path='/forgotpass' element={<ForgotPassword/>}/>
            </Routes>
          </UserContext.Provider>
        </Router>
        
        
      )
    }
  }
  
}

export default App
