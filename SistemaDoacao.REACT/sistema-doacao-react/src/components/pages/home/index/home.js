import React, { useEffect, useRef, useState } from 'react';
import './home.css';
import L from 'leaflet';
import logo from './imagens/logo.png';
import 'leaflet/dist/leaflet.css';
import { GetLocalidadeByCEP } from '../../../../services/serviceLocalidade';

export const Home = () => {
  const [cep, setCep] = useState(''); // Armazena o CEP digitado
  const mapRef = useRef(null); // Referência ao mapa
  const markerRef = useRef(null); // Referência ao marcador

  useEffect(() => {
    // Inicializa o mapa na primeira renderização
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

    // Adiciona o marcador inicial
    if (!markerRef.current) {
      markerRef.current = L.marker([-22.48237164267948, -44.473069690478276]).addTo(mapRef.current);
    }
  }, []);

  // Formata o CEP para o formato 00000-000
  const formatarCEP = (valor) => {
    return valor.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2').slice(0, 9);
  };

  // Atualiza o estado do CEP enquanto o usuário digita
  const handleInputChange = (e) => {
    const valorFormatado = formatarCEP(e.target.value);
    setCep(valorFormatado);
  };

  // Busca os dados da localidade com base no CEP
  const handleSearch = async (e) => {
    e.preventDefault(); // Previne o recarregamento da página

    const cepRegex = /^\d{5}-\d{3}$/;
    if (!cepRegex.test(cep)) {
      console.error('Formato de CEP inválido. Use o formato 00000-000.');
      return;
    }

    try {
      const response = await GetLocalidadeByCEP(cep);

      if (response && response.data && response.data.length > 0) {
        console.log('Resposta da API:', response.data);

        const { locLatitude, locLongitude } = response.data[0];

        if (locLatitude && locLongitude) {
          console.log('Atualizando o mapa para:', locLatitude, locLongitude);
          atualizarMapa(locLatitude, locLongitude);
        } else {
          console.error('Coordenadas não encontradas na resposta da API.');
        }
      } else {
        console.error('Nenhum dado encontrado para o CEP informado.');
      }
    } catch (error) {
      console.error('Erro ao buscar os dados do serviço:', error);
    }
  };

  // Atualiza a posição do marcador e do mapa
  const atualizarMapa = (latitude, longitude) => {
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (markerRef.current) {
      markerRef.current.setLatLng([lat, lng]);
    }

    if (mapRef.current) {
      mapRef.current.setView([lat, lng], 16);
    }
  };

  return (
    <div>
      <div className="home">
        {/* Adicionando a logo corretamente */}
        <div className="logo-grande">
          <img src={logo} alt="Logo" />
        </div>

        {/* Formulário de busca */}
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

        {/* Container do mapa */}
        <div className="container">
          <div id="map" style={{ height: '400px', width: '100%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
