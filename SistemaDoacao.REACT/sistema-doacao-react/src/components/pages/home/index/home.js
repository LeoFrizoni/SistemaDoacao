import React, { useEffect, useRef, useState } from 'react';
import './home.css';
import L from 'leaflet';
import logo from './imagens/logo.png';
import 'leaflet/dist/leaflet.css';
import { GetLocalidadeByCEP } from '../../../../services/serviceLocalidade';

export const Home = () => {
  const [cep, setCep] = useState(''); // Armazena o CEP digitado
  const mapRef = useRef(null); // Referência ao mapa
  const markerRef = useRef([]); // Referência aos marcadores (agora uma lista)

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([-22.48237164267948, -44.473069690478276], 16); // Valores iniciais

      const layer = L.tileLayer(
        'https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}',
        {
          minZoom: 10,
          maxZoom: 20,
          ext: 'jpg',
        }
      );

      layer.addTo(mapRef.current);
    }
  }, []);

  const formatarCEP = (valor) => {
    return valor.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2').slice(0, 9);
  };

  const handleInputChange = (e) => {
    const valorFormatado = formatarCEP(e.target.value);
    setCep(valorFormatado);
  };

  const handleSearch = async (e) => {
    e.preventDefault(); 

    const cepRegex = /^\d{5}-\d{3}$/;
    if (!cepRegex.test(cep)) {
      console.error('Formato de CEP inválido. Use o formato 00000-000.');
      return;
    }

    try {
      const response = await GetLocalidadeByCEP(cep);

      if (response && response.data && response.data.length > 0) {
        console.log('Resposta da API:', response.data);

        const locais = response.data;

        const { locLatitude, locLongitude } = locais[0];
        if (locLatitude && locLongitude) {
          atualizarMapa(locLatitude, locLongitude, locais);
        }
      } else {
        console.error('Nenhum dado encontrado para o CEP informado.');
      }
    } catch (error) {
      console.error('Erro ao buscar os dados do serviço:', error);
    }
  };

  const atualizarMapa = (latitude, longitude, locais) => {
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (mapRef.current) {
      mapRef.current.setView([lat, lng], 16);
    }

    markerRef.current.forEach((marker) => mapRef.current.removeLayer(marker));
    markerRef.current = [];

    locais.forEach((local) => {
      const markerLat = parseFloat(local.locLatitude);
      const markerLng = parseFloat(local.locLongitude);

      if (!isNaN(markerLat) && !isNaN(markerLng)) {
        const marker = L.marker([markerLat, markerLng]).addTo(mapRef.current);

        marker.bindPopup(`
          <div>
            <strong>${local.locNome}</strong>
            <br />
            ${local.locDescricao}
          </div>
        `);

        markerRef.current.push(marker);
      }
    });

    const bounds = L.latLngBounds(locais.map(local => [local.locLatitude, local.locLongitude]));
    mapRef.current.fitBounds(bounds);
  };

  return (
    <div>
      <div className="home">
        <div className="logo-grande">
          <img src={logo} alt="Logo" />
        </div>

        <form onSubmit={handleSearch}>
          <div className="search">
            <button type="submit" className="search-button" aria-label="Buscar">
              <span className="material-symbols-outlined">search</span>
            </button>
            <input
              className="search-input"
              type="text"
              placeholder="Digite o CEP"
              value={cep}
              onChange={handleInputChange}
            />
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
