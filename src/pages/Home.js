import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container-body">
      <div className="welcome-container">
        <div className="welcome-message">
          <h2>Bem-vindo ao ClinicalTrials Market Analytics!</h2>
          <p>Descubra e analise o panorama completo dos ensaios clínicos em todo o Brasil com o ClinicalTrials Market Analytics. </p>
        </div>
      </div>

      <div className="app-container">
        <div className="button-container">
          <Link className="green-button btn-tabela" to="/tabela">
            Tabela
          </Link>
          <p className="subtitle sub1">
            Na tabela disponível, você terá acesso a uma visão abrangente e organizada dos ensaios clínicos no Brasil. Utilize as funcionalidades fornecidas para filtrar, ordenar e explorar os dados de maneira eficiente.
            Antes de pesquisar na tabela, é preciso cadastrar as clínicas e as variações dos seus nomes no Buscador ao lado para ter uma abrangência maior dos estudos. 
          </p>
        </div>
        <div className="button-container">
          <Link className="green-button" to="/buscador">
            Buscador
          </Link>
          <p className="subtitle">
            O Buscador é uma ferramenta essencial para encontrar todos os estudos associados a uma clínica, por causa das variações nos nomes cadastrados no ClinicalTrials. Ele simplifica o processo de associação, permitindo que você escolha um hospital e pesquise as diversas formas de nomes cadastrados para aquele local. Esta etapa é crucial para garantir que todos os estudos relacionados a uma determinada clínica sejam identificados de forma abrangente.
          </p>
        </div>
        <div className="button-container">
          <Link className="green-button" to="/Dashboard">
            Dashboard
          </Link>
          <p className="subtitle">
           
Com o Dashboard, é possível visualizar alguns dados pre-processados. É uma ferramenta que auxilia na obtenção de insights valiosos, proporcionando uma análise abrangente e intuitiva do cenário dos ensaios clínicos no Brasil.
             </p>
        </div>
      </div>

    </div>
  );
}

export default Home;
