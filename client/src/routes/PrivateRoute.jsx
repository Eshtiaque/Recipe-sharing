import { useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider'
import { Navigate, useLocation } from 'react-router'
import Swal from 'sweetalert2'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
  const location = useLocation()

  // if (!user) {
  //   Swal.fire({
  //     icon: 'warning',
  //     title: 'Not Authorized',
  //     text: 'You must be logged in to access this page.',
  //     timer: 2000,
  //     timerProgressBar: true,
  //   });
  //   return <Navigate to="/" replace />;
  // }

  if (loading) {
    return <p>Loading.....</p>
  }

  if (user) {
    return children
  }
  return <Navigate to='/login' state={{ from: location }} replace></Navigate>
}

export default PrivateRoute
