import React from "react"
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Members from './pages/Members'
import UpdateMemberForm from './components/UpdateMemberForm'
import CreateMemberForm from './components/CreateMemberForm'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/member/:id" element={<UpdateMemberForm />} />
          <Route path="/member/" element={<Members />} />
          <Route path="/member/create-member" element={<CreateMemberForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
