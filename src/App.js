import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landingpage'
function App() {



  return (
    <Router>
    <div className='App'>
      <Routes>
        <Route path='/' element={<Landing/>}/>
      </Routes>
    </div>
    </Router>

  )
}

export default App