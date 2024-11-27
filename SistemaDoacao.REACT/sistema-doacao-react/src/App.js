import { Route, Routes } from "react-router-dom";
import "./App.css"
import Home from "./components/pages/home/index/home";
import { Navbar } from "./components/pages/navbar/navbar";
import Login from "./components/pages/login/login";
import SobreNos from "./components/pages/sobre_nos/sobreNos";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/home" element={<Home></Home>} />
        <Route path="/login" element={<Login></Login>} /> 
        <Route path="/sobre_nos" element={<SobreNos></SobreNos>} />
      </Routes>
    </div>
  )
}



export default App;
