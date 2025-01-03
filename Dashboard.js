import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaFolderOpen, FaEye, FaPlus, FaCalendarAlt, FaAddressBook } from "react-icons/fa";
import CadastrarServicos from "./CadastrarServicos";
import CadastrarCliente from "./CadastrarCliente";
import CadastrarOS from "./CadastrarOS";
import VisualizarOS from "./VisualizarOS";

function Dashboard() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [activePage, setActivePage] = useState("home");
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarExpanded((prev) => !prev);
  };

  const handleLogout = () => {
    // Limpar dados de autenticação (se houver)
    localStorage.removeItem("authToken");  // Se estiver usando localStorage para armazenar o token de autenticação
    sessionStorage.removeItem("authToken"); // Se usar sessionStorage
    navigate("/login");  // Redireciona para a página de login
  };

  const MenuItem = ({ page, icon, label }) => (
    <li
      onClick={() => setActivePage(page)}
      className={activePage === page ? "active" : ""}
      aria-label={`Ir para ${label}`}
    >
      {icon}
      {isSidebarExpanded && <span>{label}</span>}
    </li>
  );

  const renderContent = () => {
    switch (activePage) {
      case "cadastrar-servicos":
        return <CadastrarServicos />;
      case "visualizar-os":
        return <VisualizarOS />;
      case "cadastrar-cliente":
        return <CadastrarCliente />;
      case "cadastrar-os":
        return <CadastrarOS />;
      case "calendario":
        return (
          <div>
            <h1>Calendário</h1>
          </div>
        );
      default:
        return (
          <div>
            <h1>Bem-vindo ao Dashboard</h1>
            <p>Selecione uma opção no menu para continuar.</p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      {/* Cabeçalho com logo e logout */}
      <header className="dashboard-header">
        <div className="logo">
          <img src="/novo.png" alt="Logo" className="logo-img" />
        </div>
        <button onClick={handleLogout} className="logout-btn">Sair</button>
      </header>

      <aside className={`sidebar ${isSidebarExpanded ? "expanded" : "collapsed"}`}>
        <div className="sidebar-header">
          <button className="toggle-button" onClick={toggleSidebar}>
            <FaBars />
          </button>
          {isSidebarExpanded && <h2>Menu</h2>}
        </div>
        <ul>
          <MenuItem
            page="cadastrar-os"
            icon={<FaFolderOpen className="menu-icon" />}
            label=" Cadastrar OS"
          />
         
          <MenuItem
            page="cadastrar-servicos"
            icon={<FaPlus className="menu-icon" />}
            label=" Cadastrar Serviços"
          />
           <MenuItem
            page="cadastrar-cliente"
            icon={<FaAddressBook className="menu-icon" />}
            label=" Clientes"
          />
          <MenuItem
            page="visualizar-os"
            icon={<FaEye className="menu-icon" />}
            label=" Visualizar OS"
          />
          
          <MenuItem
            page="calendario"
            icon={<FaCalendarAlt className="menu-icon" />}
            label=" Calendário"
          />
        </ul>
      </aside>
      <main className="main-content">{renderContent()}</main>
    </div>
  );
}

export default Dashboard;
