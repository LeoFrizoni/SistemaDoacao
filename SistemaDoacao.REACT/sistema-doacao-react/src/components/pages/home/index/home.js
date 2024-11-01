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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetLocalidade();
        
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
