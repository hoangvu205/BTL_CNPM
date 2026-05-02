import { useState } from 'react'
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom'
import Login from './page/Login'
import Register from './page/Register'
function App() {
  return <div>
    
    <BrowserRouter>
      <nav className='row'>
        <div className='col-1'>
          <Link to="/" >Home</Link>
        </div>
        <div className='col-10'></div>
        <div className='col-1'>
          <Link to='/login'>login</Link>{" "}
          <Link to='/register'>register</Link>{" "}
        </div>
      </nav>
      <Routes>
        <Route path='/' element={<div>Home</div>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />} ></Route>
      </Routes>
      
    </BrowserRouter>
  </div>
}

export default App
