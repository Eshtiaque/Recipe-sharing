import { Outlet } from "react-router-dom"
import Footer from "../Components/Shared/Footer"
import Nav from "../Components/Shared/Nav"

const Main = () => {
  return (
    <div>
      <Nav/>
     <Outlet/>
      <Footer/>
    </div>
  )
}

export default Main
