import React from 'react'
import '../home/html css/home.css'

const Home = () => {
	const map = L.map('map').setView([-22.95199282859533, -43.21107744478464], 16)

	const layer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
		minZoom: 0,
		maxZoom: 16,
		// attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		ext: 'png'
	});

	layer.addTo(map)


	const marker = L.marker([-22.95199282859533, -43.21107744478464])
	marker.addTo(map)


	return(
		<body>
			<header>
				<div className='logo'>
					<img src='./components/pages/home/html css/Imagens/logo.jpeg'/>
				</div>
				<ul className='menu'>
					<li>Home</li>
					<li>Sobre Nós</li>
					<li></li>
				</ul>
			</header>
		</body>
	);

}

