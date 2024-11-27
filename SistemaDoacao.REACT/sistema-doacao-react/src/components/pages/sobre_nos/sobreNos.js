import React from 'react';
import './sobreNos.css'; 
import marco from './imagens/marco.jpg';
import lucas from './imagens/lucas.jpg';
import leonardo from './imagens/leonardo.jpg';
import eduarda from './imagens/eduarda.jpg';

export const SobreNos = () => {
  return (
    <main>
      <h2>Sobre Nós</h2>
      <div className="text-container">
        <p>
          O <b>Kindness Compass</b> nasceu da união de desenvolvedores apaixonados por tecnologia e com o incentivo de auxiliar na comunidade. Nossa missão é simples, mas impactante: temos o objetivo de facilitar a conexão entre pessoas que querem doar e os locais que recebem essas doações. Acreditamos que a generosidade pode transformar vidas e comunidades, e queremos tornar esse ato de bondade mais acessível e eficiente.
        </p>
        <p>
          O projeto consiste em um site onde os usuários poderão encontrar locais de doações próximos através do CEP inserido. Este projeto visa, através de tecnologias sustentáveis e colaboração comunitária, facilitar a busca e consequentemente, o acesso aos centros de doação para uma melhora informativa e nos índices de doações. As principais ideias incluem:
        </p>
        <p>• Inovação tecnológica acessível.</p>
        <p>• Fomento à inclusão social.</p>
        <p>• Parcerias com organizações locais.</p>
        <p>• Educação e conscientização da comunidade.</p>
        <p>
          Estamos comprometidos em criar uma rede que promova a solidariedade e faça com que as doações cheguem a quem mais precisa, de maneira rápida e segura. <b>Se você quer fazer a diferença, nós estamos aqui para mostrar o caminho.</b>
        </p>
      </div>
      <br />
      <h3>Membros da Equipe</h3>
      <div className="imagem">
        <figure>
          <img src={eduarda} alt="foto-duda" />
          <figcaption>Eduarda Bandeira de Souza</figcaption>
        </figure>
        <figure>
          <img src={leonardo} alt="foto-leo" />
          <figcaption>Leonardo Frizoni Lawall</figcaption>
        </figure>
        <figure>
          <img src={lucas} alt="foto-muller" />
          <figcaption>Lucas Arísio Müller</figcaption>
        </figure>
        <figure>
          <img src={marco} alt="foto-mark" />
          <figcaption>Marco Ryan Marassi Marques</figcaption>
        </figure>
      </div>
    </main>
  );
};

export default SobreNos;
