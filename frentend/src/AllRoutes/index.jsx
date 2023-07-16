 import { Routes,Route } from "react-router-dom";
import About from "../component/Pages/About/About";
import Home from "../component/Pages/Home/Home";
import Wellcome from "../component/Pages/Wellcome/Wellcome";

const AllRoute = () =>{

return(
    <>
        <Routes>
            <Route path ="/"  element={<Wellcome />} />
            <Route path ="/home"  element={<Home />} />
            <Route path ="/about"  element={<About />} />
        </Routes>
    </>
)
}
export default AllRoute;