// import React from "react";
// import './navbar.css'
// import logo from './imagens/logo.jpeg'
// import { Link } from "react-router-dom";

// export const Navbar = () => {
//     return (
//         <header>
          
//           <div className="logo">
// 			      <img src={logo} alt="Logo" />
//           </div>

//           <div className="title">
//               <p>Kindness Compass</p>
//           </div>

//           <ul className="menu">
//             <Link to="/home">Home</Link>
//             <Link to="/sobre nos">Sobre Nós</Link>
//           </ul>

//           <Link to="/login">
//             <button type="button" class="btn btn-primary btn-sm" to="/login">Login</button>
//           </Link>
        
//       </header>
//     );
// };

import React from "react";
import './navbar.css'
import logo from './imagens/logo.png'
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <header>
            <div className="logo-title">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="title">
                    <p>Kindness Compass</p>
                </div>
            </div>

            <ul className="menu">
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/sobre nos">Sobre Nós</Link>
                </li>
            </ul>

            <div className="login">
                <Link to="/login">
                    <button type="button" className="btn btn-primary btn-sm">Login</button>
                </Link>
            </div>
        </header>
        
    );
};
