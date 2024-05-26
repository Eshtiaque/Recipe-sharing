import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';



const Nav = () => {



  const auth = getAuth();
  const { user, logOut } = useContext(AuthContext);

  const googleProvider = new GoogleAuthProvider;



  const [userState, setUserState] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.email) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`https://recipe-server-psi.vercel.app/users/${user.email}`);
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const userData = await response.json();
          setUserState(userData);
        } catch (error) {
          setError(error.message);
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [user]);




  //google sign in 
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email }
        fetch('https://recipe-server-psi.vercel.app/users', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(saveUser)
        })
          .then(res => res.json())
          .then(data => {
            if (data.message === 'User already exists') {
              Swal.fire({
                icon: 'info',
                title: 'Welcome back!',
                text: 'You are already signed in.',
                timer: 1500,
              });
            } else {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Signed in successfully',
                showConfirmButton: false,
                timer: 1500,
              });
            }
            navigate('/', { replace: true }); // Adjust the navigate target as necessary
          });
      })
      .catch(error => {
        console.error('Error signing in with Google: ', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      });
  };

  //logout

  const handleLogOut = () => {
    logOut(auth)
      .then(result => {
        localStorage.removeItem('set-token-for-user');
        result;
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className='bg-slate-200 '>
      <div className="navbar  max-w-7xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-bold">
              <li><a href='/'>Home</a></li>
              <li>

                <Link to={"/allRecipes"}>Recipes</Link>
              </li>

              <li>
                <Link to={"/addRecipes"}>Add Recipes</Link>
              </li>


              <li>
                <button onClick={handleGoogleSignIn} className="  " type='submit' value="Login">Google Login<span className="mr-2 bg-white rounded-full p-1"><FcGoogle /></span> </button>
              </li>
            </ul>
          </div>
          <a href='/' className=" btn-ghost  text-orange-600 font-bold text-4xl">Recipe <span className='text-sm text-black'>Share</span></a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-bold ">
            <li><a href='/'>Home</a></li>
            <li>

              <Link to={"/allRecipes"}>Recipes</Link>
            </li>

            <li>
              <Link to={"/addRecipes"}>Add Recipes</Link>
            </li>
            <li>
              <button onClick={handleGoogleSignIn} className="  " type='submit' value="Login">Google Login<span className="mr-2 bg-white rounded-full p-1"><FcGoogle /></span> </button>
            </li>
          </ul>
        </div>
        {user ?

          <div className="navbar-end gap-4">
            <span className="badge border border-1 border-orange-600 text-black">{userState?.coins} $</span>
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
              </div>
            </div>

            <Link onClick={handleLogOut} className="btn btn-sm text-white bg-orange-600   ">Logout</Link>
          </div>
          :

          <></>


        }


      </div>

    </div>
  );
};

export default Nav;