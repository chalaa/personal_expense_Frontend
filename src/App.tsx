import React from "react"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import LandingPage from './MainComponents/LandingPage'
import Login from './MainComponents/Login'
import SignUp from "./MainComponents/SignUp"
import Dashboard from "./MainComponents/Dashboard"
import Income from "./MainComponents/Income"
import Expense from "./MainComponents/Expense"

const App:React.FC = () => {
  return (
    <div className="bg-slate-100">
      <Router>
          <Routes>
              <Route path="/" element={<LandingPage />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/signup" element={<SignUp />}/>
              <Route path="/dashboard" element={<Dashboard />}/>
              <Route path="/income" element = {<Income/>} />
              <Route path="/expense" element = {<Expense/>} />
          </Routes>
      </Router>
    </div>
  )
}

export default App
