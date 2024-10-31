import { Route, Routes } from "react-router-dom";
import "./App.css"
import Home from "./components/pages/home/index/home";
import { Navbar } from "./components/pages/navbar/navbar";
import Login from "./components/pages/login/login";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/home" element={<Home></Home>} />
        <Route path="/login" element={<Login></Login>} /> 
      </Routes>
    </div>
  )
}



export default App;
