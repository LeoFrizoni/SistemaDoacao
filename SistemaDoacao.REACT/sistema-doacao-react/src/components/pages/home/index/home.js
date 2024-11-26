import React, { useEffect, useRef, useState } from 'react';
import './home.css';
import L from 'leaflet';
import logo from './imagens/logo.png';
import 'leaflet/dist/leaflet.css';
import { GetLocalidadePorNome } from '../../../../services/serviceLocalidade';

export const Home = () => {
  const [coordenadas, setCoordenadas] = useState([0, 0]);
  const mapRef = useRef(null); // referência para o mapa
  const markerRef = useRef(null); // referência para o marcador

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
            <input 
              className="search-input" 
              type="search" 
              placeholder="Search" 
            />
            {/* <button type="submit" className="search-button" aria-label="Buscar">
              <span className="material-symbols-outlined">search</span>
            </button> */}
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
