import React from "react"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import LandingPage from './components/LandingPage'
import Login from './components/Login'
import SignUp from "./components/SignUp"

const App:React.FC = () => {
  return (
    <div className="bg-slate-100">
      <Router>
          <Routes>
              <Route path="/" element={<LandingPage />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/signup" element={<SignUp />}/>
          </Routes>
      </Router>
    </div>
  )
}

export default App
