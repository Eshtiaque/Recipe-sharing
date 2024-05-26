import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../Components/Home/Home'
import AddRecipes from '../Components/Pages/AddRecipes/AddRecipes'
import AllRecipes from '../Components/Pages/AllRecipes/AllRecipes'
import PrivateRoute from './PrivateRoute'
import RecipesDetails from '../Components/Pages/AllRecipes/RecipesDetails'
import Purchase from '../Components/Pages/Purchase/Purchase'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main/>,
    errorElement:"Error ! There is no Route , Sorry",
    children: [
      {
        path: '/',
        element: <Home/>
      },{
        path: '/addRecipes',
        element: <PrivateRoute><AddRecipes/></PrivateRoute>
      },{
        path: '/allRecipes',
        element: <AllRecipes/>
      },
      {
        path:"/allRecipes/:id",
        element: <PrivateRoute><RecipesDetails/></PrivateRoute>
      },{
        path: "/purchase-coins",
        element:<Purchase/>

      }
    ]
  },
])
