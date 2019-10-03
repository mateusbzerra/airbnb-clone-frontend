import React, { useState } from "react";
import api from "../../services/api";

// import { Container } from './styles';

export default function Login({ history }) {
  async function handleSubmit(e) {
    e.preventDefault();
    if (email.length > 10) {
      const response = await api.post("/sessions", { email });
      const { _id: id } = response.data;
      if (response.data._id) {
        localStorage.setItem("user", id);
        history.push("/dashboard");
      }
    }
  }
  const [email, setEmail] = useState("");
  return (
    <>
      <p>
        Ofereça <strong>spots</strong> para programadores e encontre
        <strong> talentos</strong> para sua empresa
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail *</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          id="email"
          placeholder="Seu melhor e-mail"
        />
        <button className="btn" type="submit">
          Entrar
        </button>
      </form>
    </>
  );
}
