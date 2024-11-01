// import React, { useEffect, useRef, useState } from 'react';
// import './home.css';
// import L from 'leaflet';
// import logo from './imagens/logo.png';
// import 'leaflet/dist/leaflet.css';
// import { useNavigate } from 'react-router-dom';
// import { GetLocalidadePorNome } from '../../../../services/serviceLocalidade';

// export const Home = () => {

//   // const mapRef = useRef(null); // referência para o mapa
  
//   // useEffect(() => {
//   //   if (!mapRef.current) { 
//   //     mapRef.current = L.map('map').setView([-22.418767095221828, -44.280479276712484], 16);

//   //     const layer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}', {
// 	// 	minZoom: 0,
// 	// 	maxZoom: 20,
// 	// 	ext: 'jpg'
//   //     });

//   //     layer.addTo(mapRef.current);

//   //     const marker = L.marker([-22.418767095221828, -44.280479276712484]);
//   //     marker.addTo(mapRef.current);
//   //   }
//   // }, []); 

//   const [name, setNome] = useState('');
//   const [coordenadas, setCoordenadas] = useState([0, 0]);
//   const mapRef = useState(null); // referência para o mapa
//   const markerRef = useState(null); // referência para o marker
  
//   useEffect(() => {

//     if (!mapRef.current) {
//       mapRef.current = L.map('map').setView(coordenadas, 16);

//       const layer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}', {
//         minZoom: 0,
//         maxZoom: 20,
//         ext: 'jpg'
//       });

//       layer.addTo(mapRef.current);
//     }

//     if (markerRef.current){
//       markerRef.current.setLatLng(coordenadas);
//     } else{
//       markerRef.current = L.marker(coordenadas).addTo(mapRef.current);
//     }
//     mapRef.current.setView(coordenadas, 16);

//   },[coordenadas]);

//   const handleSearch = async () => {
//     if (name){
//       try{
//         const response = await GetLocalidadePorNome(name);
//         if(response.data){
//           const coordsString = response.data;
//           const [latitude, longitude] = coordsString.split(',').map(Number);
//           setCoordenadas([latitude, longitude]);
//         } else {
//           console.error('loc nao encontrada');
//         }
//       } catch (error){
//         console.error('erro ao buscar loc', error)
//       } 
//     }
//   }

//   return (
//     <div>

//       <div className="home">
//         <div className="logo-grande">
// 			<img src={logo} alt="Logo" />
//         </div>

//         {/* <form>
//           <div className="search">
//             <span className="search-icon material-symbols-outlined">search</span>
//             <input className="search-input" type="search" placeholder="Search" />
//           </div>
//         </form> */}

//         <form onSubmit={handleSearch}>
//       <div className="search">
//         <input
//           className="search-input"
//           type="search"
//           placeholder="Search"
//           value={name}
//           onChange={(e) => setNome(e.target.value)} // Atualiza o estado do nome
//         />
//         <button type="submit" className="search-icon material-symbols-outlined" aria-label="Buscar">
//           search
//         </button>
//       </div>
//     </form>

//         {/* <div>
//             <input
//                 type="search"
//                 placeholder="Pesquisar local"
//                 value={name}
//                 onChange={(e) => setNome(e.target.value)} // Atualiza o estado do nome
//             />
//             <button onClick={handleSearch}>Buscar</button>
//             <div id="map" style={{ height: '400px', width: '100%' }}></div>
//         </div> */}



//         <div className="container">
//           <div id="map" style={{ height: '400px' }}></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;





// TESTE





// import React, { useEffect, useRef, useState } from 'react';
// import './home.css';
// import L from 'leaflet';
// import logo from './imagens/logo.png';
// import 'leaflet/dist/leaflet.css';
// import { GetLocalidadePorNome } from '../../../../services/serviceLocalidade';
// import { GetLocalidade } from '../../../../services/serviceLocalidade';

// export const Home = () => {
//   const [name, setNome] = useState('');
//   const [coordenadas, setCoordenadas] = useState([0, 0]);
//   const mapRef = useRef(null); // referência para o mapa
//   const markerRef = useRef(null); // referência para o marcador

//   useEffect(() => {
//     if (!mapRef.current) {
//       mapRef.current = L.map('map').setView(coordenadas, 16);

//       const layer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}', {
//         minZoom: 0,
//         maxZoom: 20,
//         ext: 'jpg'
//       });

//       layer.addTo(mapRef.current);
//     }

//     if (markerRef.current) {
//       markerRef.current.setLatLng(coordenadas);
//     } else {
//       markerRef.current = L.marker(coordenadas).addTo(mapRef.current);
//     }
//     mapRef.current.setView(coordenadas, 16);
//   }, [coordenadas]);

//   const handleSearch = async (e) => {
//     e.preventDefault(); // Evita o reload da página
  
//     if (name) {
//       try {
//         console.log("Buscando por:", name); // Para verificar o valor buscado
//         const response = await GetLocalidadePorNome(name);
  
//         // Verifica se o campo locCoordenada existe na resposta
//         if (response.data && response.data.locCoordenada) {
//           const coordsString = response.data.locCoordenada;
//           const [latitude, longitude] = coordsString.split(',').map(coord => parseFloat(coord.trim()));
//           setCoordenadas([latitude, longitude]);
//           console.log("Coordenadas encontradas:", [latitude, longitude]); // Para ver as coordenadas no console
//         } else {
//           console.error('Localidade não encontrada ou locCoordenada ausente');
//         }
//       } catch (error) {
//         console.error('Erro ao buscar localidade:', error);
//       }
//     }
//   };
  

//   return (
//     <div>
//       <div className="home">
//         <div className="logo-grande">
//           <img src={logo} alt="Logo" />
//         </div>

//         <form onSubmit={handleSearch}>
//           <div className="search">
//             <input
//               className="search-input"
//               type="search"
//               placeholder="Search"
//               value={name}
//               onChange={(e) => setNome(e.target.value)}
//             />
//             <button type="submit" className="search-icon material-symbols-outlined" aria-label="Buscar">
//               search
//             </button>
//           </div>
//         </form>

//         <div className="container">
//           <div id="map" style={{ height: '400px', width: '100%' }}></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;








import React, { useEffect, useRef, useState } from 'react';
import './home.css';
import L from 'leaflet';
import logo from './imagens/logo.png';
import 'leaflet/dist/leaflet.css';
import { GetLocalidade } from '../../../../services/serviceLocalidade';

export const Home = () => {
  const [coordenadas, setCoordenadas] = useState([0, 0]);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // Carrega os dados e armazena no cache ao montar o componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetLocalidade();
        
        // Armazena os dados no cache da sessão
        sessionStorage.setItem('localidadeData', JSON.stringify(response.data));
        
        // Exibe os dados carregados no console
        console.log("Dados carregados e armazenados no cache:", response.data);
        
        if (response.data && response.data.locCoordenada) {
          const coordsString = response.data.locCoordenada;
          const [latitude, longitude] = coordsString.split(',').map(coord => parseFloat(coord.trim()));
          setCoordenadas([latitude, longitude]);
        }
      } catch (error) {
        console.error("Erro ao buscar dados de localidade:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView(coordenadas, 16);

      const layer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}', {
        minZoom: 0,
        maxZoom: 20,
        ext: 'jpg'
      });

      layer.addTo(mapRef.current);
    }

    if (markerRef.current) {
      markerRef.current.setLatLng(coordenadas);
    } else {
      markerRef.current = L.marker(coordenadas).addTo(mapRef.current);
    }
    mapRef.current.setView(coordenadas, 16);
  }, [coordenadas]);

  return (
    <div>
      <div className="home">
        <div className="logo-grande">
          <img src={logo} alt="Logo" />
        </div>

        <form>
          <div className="search">
            <span className="search-icon material-symbols-outlined">search</span>
            <input className="search-input" type="search" placeholder="Search" />
          </div>
        </form>

        <div className="container">
          <div id="map" style={{ height: '400px', width: '100%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
