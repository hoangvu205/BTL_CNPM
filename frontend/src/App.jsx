import { useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom'
import Login from './page/Login'
import Register from './page/Register'
import ResetPassword from './page/ResetPassword'
import { ProtectedRoute, AdminRoute, useAuth } from './components/ProtectedRoute'
import axios from 'axios'

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <div className="card">
        <div className="card-body">
          <h5>Welcome, Admin {user?.name}!</h5>
          <p>Email: {user?.email}</p>
          <p>Role: {user?.role}</p>
          <div className="mt-3">
            <Link to="/admin/users" className="btn btn-primary me-2">Manage Users</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserList = () => {
  const { user, logout } = useAuth();
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/admin/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(res => setUserList(res.data.userList))
  }, []);
  return (
    <div className="container mt-5">
      <h2>Admin - User Management</h2>
      <div className="card">
        <div className="card-body">
          <h5>Admin Panel: {user?.name}</h5>
          <table className='table table-hover'>
            <thead>
              <tr>
                <td>username</td>
                <td>email</td>
                <td>role</td>
                <td>function</td>
              </tr>
            </thead>
            <tbody>
              {userList.map(val => <tr key={val.id}>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>{val.role}</td>
                <td><button className="btn btn-sm btn-danger">Delete</button> <button className='btn btn-sm btn-danger'>update</button></td>
              </tr>)}
            </tbody>
          </table>
          <Link to="/admin" className="btn btn-secondary me-2">Back to Admin Dashboard</Link>
          <button className="btn btn-danger" onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

const Navigation = () => {
  const { user, logout } = useAuth();

  return (
    <nav className='row'>
      <div className='col-1'>
        <Link to="/" >Home</Link>
      </div>
      <div className='col-8'>
        {user && (
          <span className="me-3">
            Welcome, {user.name} ({user.role})
          </span>
        )}
      </div>
      <div className='col-3 text-end'>
        {!user ? (
          <>
            <Link to='/login' className="me-2">login</Link>{" "}
            <Link to='/register'>register</Link>{" "}
          </>
        ) : (
          <>
            {user.role === 'admin' && (
              <Link to='/admin' className="me-2">Admin</Link>
            )}
            <button className="btn btn-sm btn-outline-danger ms-2" onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

function App() {
  return <div>

    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path='/' element={<div className="container mt-5"><h1>Home Page</h1><p>Public content for everyone</p></div>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />} ></Route>
        <Route path='/forgot-password' element={<ResetPassword />} ></Route>

        {/* Admin only routes */}
        <Route path='admin' element={<AdminRoute />}>
          <Route index element={<AdminDashboard />} ></Route>
          <Route path='users' element={<UserList />} ></Route>
        </Route>

        <Route path='/auth' element={<ProtectedRoute />} >

        </Route>
      </Routes>

    </BrowserRouter>
  </div>
}

export default App

