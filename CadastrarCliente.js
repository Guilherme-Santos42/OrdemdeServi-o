import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";

function CadastrarCliente() {
  const [formData, setFormData] = useState({
    nome: "",
    telefoneCelular: "",
    telefoneFixo: "",
    bairro: "",
    rua: "",
    numeroResidencia: "",
  });

  const [clientes, setClientes] = useState([]);
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [editingCliente, setEditingCliente] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/clientes");
      setClientes(response.data);
      setFilteredClientes(response.data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCliente) {
        await axios.put(`http://localhost:5000/api/clientes/${editingCliente._id}`, formData);
        alert("Cliente atualizado com sucesso!");
        setEditingCliente(null);
      } else {
        await axios.post("http://localhost:5000/api/clientes", formData);
        alert("Cliente cadastrado com sucesso!");
      }
      setFormData({
        nome: "",
        telefoneCelular: "",
        telefoneFixo: "",
        bairro: "",
        rua: "",
        numeroResidencia: "",
      });
      fetchClientes();
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
      alert("Erro ao salvar cliente.");
    }
  };

  const handleEdit = (cliente) => {
    setEditingCliente(cliente);
    setFormData({
      nome: cliente.nome,
      telefoneCelular: cliente.telefoneCelular,
      telefoneFixo: cliente.telefoneFixo,
      bairro: cliente.bairro,
      rua: cliente.rua,
      numeroResidencia: cliente.numeroResidencia,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      try {
        await axios.delete(`http://localhost:5000/api/clientes/${id}`);
        alert("Cliente excluído com sucesso!");
        fetchClientes();
      } catch (error) {
        console.error("Erro ao excluir cliente:", error);
        alert("Erro ao excluir cliente.");
      }
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = clientes.filter((cliente) =>
      Object.values(cliente).some((value) =>
        value.toString().toLowerCase().includes(term)
      )
    );
    setFilteredClientes(filtered);
  };

  return (
    <div className="cadastrar-cliente">
      {/* Título principal */}
      <h2 className="cliente-list-title">Clientes Cadastrados</h2>

      {/* Botão e Barra de Pesquisa */}
      <div className="actions-container">
        <button onClick={() => setShowModal(true)} className="btn-add">
          <FaPlus /> Cadastrar Cliente
        </button>
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Pesquisar clientes..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
      </div>

      {/* Modal para o Formulário */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editingCliente ? "Editar Cliente" : "Cadastrar Cliente"}</h2>
            <form onSubmit={handleSubmit} className="cliente-form">
              <div className="form-group">
                <label htmlFor="nome">Nome:</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Digite o nome do cliente"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="telefoneCelular">Telefone Celular:</label>
                <input
                  type="text"
                  id="telefoneCelular"
                  name="telefoneCelular"
                  value={formData.telefoneCelular}
                  onChange={handleChange}
                  placeholder="Digite o telefone celular"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="telefoneFixo">Telefone Fixo:</label>
                <input
                  type="text"
                  id="telefoneFixo"
                  name="telefoneFixo"
                  value={formData.telefoneFixo}
                  onChange={handleChange}
                  placeholder="Digite o telefone fixo"
                />
              </div>
              <div className="form-group">
                <label htmlFor="bairro">Bairro:</label>
                <input
                  type="text"
                  id="bairro"
                  name="bairro"
                  value={formData.bairro}
                  onChange={handleChange}
                  placeholder="Digite o bairro"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="rua">Rua:</label>
                <input
                  type="text"
                  id="rua"
                  name="rua"
                  value={formData.rua}
                  onChange={handleChange}
                  placeholder="Digite a rua"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="numeroResidencia">Nº da Residência:</label>
                <input
                  type="text"
                  id="numeroResidencia"
                  name="numeroResidencia"
                  value={formData.numeroResidencia}
                  onChange={handleChange}
                  placeholder="Digite o número da residência"
                  required
                />
              </div>
              <button type="submit" className="btn-submit">
                {editingCliente ? "Atualizar Cliente" : "Cadastrar"}
              </button>
              <button onClick={() => setShowModal(false)} className="btn-cancel">
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tabela de Clientes */}
      <table className="cliente-table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Telefone Celular</th>
            <th>Telefone Fixo</th>
            <th>Bairro</th>
            <th>Rua</th>
            <th>Nº</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredClientes.map((cliente) => (
            <tr key={cliente._id}>
              <td>{cliente.nome}</td>
              <td>{cliente.telefoneCelular}</td>
              <td>{cliente.telefoneFixo}</td>
              <td>{cliente.bairro}</td>
              <td>{cliente.rua}</td>
              <td>{cliente.numeroResidencia}</td>
              <td>
                <button onClick={() => handleEdit(cliente)} className="btn-icon">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(cliente._id)} className="btn-icon">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CadastrarCliente;
