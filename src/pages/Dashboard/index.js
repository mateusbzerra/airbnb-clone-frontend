import React, { useState, useEffect, useMemo } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';
import './styles.css';

export default function Dashboard() {
  const [spots, setSpots] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const userid = localStorage.getItem('user');
      const { data } = await api.get('/dashboard', {
        headers: { userid },
      });
      console.log(data);
      setSpots(data);
    }
    loadSpots();
  }, []);

  const userid = localStorage.getItem('user');
  const socket = useMemo(
    () =>
      socketio('http://localhost:3333', {
        query: { userid },
      }),
    [userid]
  );
  useEffect(() => {
    socket.on('booking_request', data => {
      const date = new Date(data.date);
      const formatedDate = `${date.getDate()}/${date.getMonth()}`;
      data.date = formatedDate;
      setRequests([...requests, data]);
    });
  }, [requests, socket]);
  async function handleAccept(id) {
    await api.post(`/bookings/${id}/approvals`);
    setRequests(requests.filter(request => request._id !== id));
  }
  async function handleReject(id) {
    await api.post(`/bookings/${id}/rejections`);
    setRequests(requests.filter(request => request._id !== id));
  }
  return (
    <>
      <ul className="notifications">
        {requests.map(request => (
          <li key={request._id}>
            <p>
              <strong>{request.user.email}</strong> está solicitando uma reserva
              em <strong>{request.spot.company} </strong> para a data:
              <strong> {request.date}</strong>
            </p>
            <button
              onClick={() => handleAccept(request._id)}
              className="accept"
            >
              Aceitar
            </button>
            <button
              onClick={() => handleReject(request._id)}
              className="reject"
            >
              Rejeitar
            </button>
          </li>
        ))}
      </ul>
      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header
              style={{ backgroundImage: `url(${spot.thumbnail_url})` }}
            ></header>
            <strong>{spot.company}</strong>
            <span> {spot.price ? `R$ ${spot.price}/dia` : 'Gratuito'} </span>
          </li>
        ))}
      </ul>
      <Link to="/New">
        <button className="btn">Cadastrar novo spot</button>
      </Link>
    </>
  );
}
