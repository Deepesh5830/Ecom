import './App.css';
import {BrowserRouter} from "react-router-dom"
import AllRoute from './AllRoutes';
function App() {
  return  <BrowserRouter>
      <AllRoute  />
   </BrowserRouter>
  
}

export default App;
