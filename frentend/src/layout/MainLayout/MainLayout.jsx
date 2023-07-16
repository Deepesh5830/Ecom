import Navbar from "../../component/Navbar/Navbar/navBar";
import Footer from "../../component/Footer/Footer"

const MainLayout = ({children,show=true}) =>{
 
     return(
        <div>
            <Navbar className={show?'d-flex':'d-none'} />
            {children}
            <Footer />
        </div>
     )

}
export default MainLayout;