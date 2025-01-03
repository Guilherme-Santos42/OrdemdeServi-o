
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format } from "date-fns";
import axios from "axios";

// Localizer necessário para o react-big-calendar
const localizer = momentLocalizer();

function Calendario() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Requisição para pegar as OS com as datas
    const fetchOS = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/os");
        const osList = response.data;

        // Formatar os compromissos para o formato que o react-big-calendar entende
        const events = osList.map((os) => ({
          title: `OS para ${os.cliente} - ${os.servicos.join(", ")}`,
          start: new Date(os.data), // Usando a data da OS
          end: new Date(new Date(os.data).getTime() + 60 * 60 * 1000), // Durando 1 hora como exemplo
          allDay: false,
        }));

        setEvents(events);
      } catch (error) {
        console.error("Erro ao carregar ordens de serviço:", error);
      }
    };

    fetchOS();
  }, []);

  return (
    <div className="calendario-container">
      <h1>Calendário de Compromissos</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}

export default Calendario;
