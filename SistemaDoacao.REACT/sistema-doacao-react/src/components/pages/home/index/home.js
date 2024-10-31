import React, { useEffect, useRef } from 'react';
import './home.css';
import L from 'leaflet';
import logo from './imagens/logo.jpeg';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';

export const Home = () => {

  const mapRef = useRef(null); // referência para o mapa
  
  useEffect(() => {
    if (!mapRef.current) { 
      mapRef.current = L.map('map').setView([-22.418767095221828, -44.280479276712484], 16);

      const layer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}', {
		minZoom: 0,
		maxZoom: 20,
		ext: 'jpg'
      });

      layer.addTo(mapRef.current);

      const marker = L.marker([-22.418767095221828, -44.280479276712484]);
      marker.addTo(mapRef.current);
    }
  }, []); 

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
          <div id="map" style={{ height: '400px' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Home;

