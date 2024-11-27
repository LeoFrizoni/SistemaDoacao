import React, { useEffect, useRef, useState } from 'react';
import './home.css';
import L from 'leaflet';
import logo from './imagens/logo.png';
import 'leaflet/dist/leaflet.css';
import { GetLocalidadeByCEP } from '../../../../services/serviceLocalidade';
import { GetEndereco } from '../../../../services/serviceEndereco';
import { GetLocalidade } from '../../../../services/serviceLocalidade';

export const Home = () => {
  const [cep, setCep] = useState('');
  const [cacheEnderecos, setCacheEnderecos] = useState([]);
  const [cacheLocalidades, setCacheLocalidades] = useState([]);
  const [enderecosFiltrados, setEnderecosFiltrados] = useState([]);
  const mapRef = useRef(null);
  const markerRef = useRef([]);

  useEffect(() => {
    carregarCacheEnderecos();
    carregarCacheLocalidades();
    
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([-22.48237164267948, -44.473069690478276], 16);

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

  const carregarCacheEnderecos = async () => {
    try {
      const response = await GetEndereco();
      if (response && response.data && response.data.length > 0) {
        setCacheEnderecos(response.data);
        console.log('Cache de Endereços carregado:', response.data);
      } else {
        console.warn('Nenhum registro encontrado na tabela Endereco.');
      }
    } catch (error) {
      console.error('Erro ao carregar o cache de Endereços:', error);
    }
  };

  const carregarCacheLocalidades = async () => {
    try {
      const response = await GetLocalidade();
      if (response && response.data && response.data.length > 0) {
        setCacheLocalidades(response.data);
        console.log('Cache de Localidades carregado:', response.data);
      } else {
        console.warn('Nenhum registro encontrado na tabela Localidade.');
      }
    } catch (error) {
      console.error('Erro ao carregar o cache de Localidades:', error);
    }
  };

  const formatarCEP = (valor) => {
    return valor.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2').slice(0, 9);
  };

  const handleInputChange = (e) => {
    const valorFormatado = formatarCEP(e.target.value);
    setCep(valorFormatado);
  };

  // busca de Localidade e carregar os dados
  const handleSearch = async (e) => {
    e.preventDefault();
    const cepRegex = /^\d{5}-\d{3}$/;
    if (!cepRegex.test(cep)) {
      console.error('Formato de CEP inválido. Use o formato 00000-000.');
      return;
    }

    try {
      // busca de Localidade pelo CEP
      const localidadeResponse = await GetLocalidadeByCEP(cep);
      if (localidadeResponse && localidadeResponse.data && localidadeResponse.data.length > 0) {
        const locais = localidadeResponse.data;
        const { locLatitude, locLongitude } = locais[0];
        
        if (locLatitude && locLongitude) {
          atualizarMapa(locLatitude, locLongitude, locais);
        }

        const localidadesEncontradas = locais.map((local) => local.locCodigo);
        const enderecosFiltrados = cacheEnderecos.filter((endereco) =>
          localidadesEncontradas.includes(endereco.endCodigoLocalidade)
        );
        setEnderecosFiltrados(enderecosFiltrados);
      } else {
        console.error('Nenhum dado encontrado para o CEP informado.');
        setEnderecosFiltrados([]); 
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
        const enderecoRelacionado = cacheEnderecos.find((endereco) => endereco.endCodigoLocalidade === local.locCodigo);

        const popupContent = `
          <div>
            <strong>${local.locNome}</strong><br />
            <em>${local.locDescricao}</em><br />
            ${enderecoRelacionado ? `${enderecoRelacionado.endLogradouro}, ${enderecoRelacionado.endBairro}, ${enderecoRelacionado.endNumero}` : 'Endereço não disponível'}
          </div>
        `;

        const marker = L.marker([markerLat, markerLng]).addTo(mapRef.current);
        marker.bindPopup(popupContent);
        markerRef.current.push(marker);
      }
    });

    const bounds = L.latLngBounds(locais.map(local => [local.locLatitude, local.locLongitude]));
    mapRef.current.fitBounds(bounds);
  };

  return (
    <div className="main-container">
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
          <div id="map" className="map-container"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
