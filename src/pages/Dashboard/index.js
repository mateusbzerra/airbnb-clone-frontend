import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./styles.css";

export default function Dashboard() {
  useEffect(() => {
    async function loadSpots() {
      const userid = localStorage.getItem("user");
      const { data } = await api.get("/dashboard", {
        headers: { userid }
      });
      console.log(data);
      setSpots(data);
    }
    loadSpots();
  }, []);
  const [spots, setSpots] = useState([]);
  return (
    <>
      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header
              style={{ backgroundImage: `url(${spot.thumbnail_url})` }}
            ></header>
            <strong>{spot.company}</strong>
            <span> {spot.price ? `R$ ${spot.price}/dia` : "Gratuito"} </span>
          </li>
        ))}
      </ul>
      <Link to="/New">
        <button className="btn">Cadastrar novo spot</button>
      </Link>
    </>
  );
}
