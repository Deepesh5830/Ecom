import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import MainLayout from "../../../layout/MainLayout/MainLayout";

const Wellcome = () =>{
 return (
    <MainLayout>
    <div className="grid grid-cols-1  text-center  h-screen bg-cover bg-scroll" style={{backgroundImage: `url("image/EcomarceDas.jpeg")` }}>
          <div className="text-blue-600 text-7xl font-style: italic font-bold" style={{margin:"auto"}}> WELLCOME PAGE </div>
        <div>  
         <NavLink to={"/home"}>
         <Button variant="outlined"  className = "text-5xl underline-offset-4 text-red-600"><b><i>Get Strated</i></b></Button>
         </NavLink>
         </div>
    </div>
    </MainLayout>
 )
}
export default Wellcome;