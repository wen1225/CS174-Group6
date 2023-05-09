import React from "react"
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Members from './pages/Members'
import UpdateMemberForm from './components/UpdateMemberForm'
import CreateMemberForm from './components/CreateMemberForm'
import Cases from './pages/Cases'
import CreateCaseForm from './components/CreateCaseForm'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/member/:id" element={<UpdateMemberForm />} />
          <Route path="/member/" element={<Members />} />
          <Route path="/member/create-member" element={<CreateMemberForm />} />
          <Route path="/case/" element={<Cases />}></Route>
          <Route path="/case/create-case" element={<CreateCaseForm />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
