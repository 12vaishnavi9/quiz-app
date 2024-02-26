import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
 import Register from "./Register";
import Login from "./Login";
import Main from "./Main";
import Quiz from "./Quiz";
import Result from "./Result";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkout from "./Checkout";

function App() {
  return (
    <div className="App">
    <Routes> 
    <Route path="/register" exact element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/" exact element={<Main/>}/>
    <Route path="/quiz" exact element={<Quiz/>}/>
    <Route path="/payment" exact element={<Checkout/>}/>
    <Route path="/payment/success" exact element={<Result/>}/>  
   </Routes>
   <ToastContainer /> 
    </div>
  );
}

export default App;
