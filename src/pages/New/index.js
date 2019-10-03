import React, { useState, useMemo } from 'react';
import camera from '../../assets/camera.svg';
import api from '../../services/api';
import './styles.css';

export default function New({ history }) {
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(e) {
    e.preventDefault();
    const userid = localStorage.getItem('user');
    const form = new FormData();
    form.append('thumbnail', thumbnail);
    form.append('company', company);
    form.append('techs', techs);
    form.append('price', price);

    await api.post('/spots', form, {
      headers: { userid },
    });
    history.push('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        className={thumbnail ? 'has-thumbnail' : ''}
        style={{ backgroundImage: `url(${preview})` }}
      >
        <input type="file" onChange={e => setThumbnail(e.target.files[0])} />
        <img src={camera} alt="camera_alt" />
      </label>
      <label htmlFor="company">Empresa *</label>
      <input
        type="text"
        id="company"
        placeholder="Sua empresa incrível"
        value={company}
        onChange={e => setCompany(e.target.value)}
      />
      <label htmlFor="techs">
        Tecnologias * <span>(Separadas por vírgula)</span>
      </label>
      <input
        type="text"
        id="techs"
        placeholder="Quais tecnologias usam?"
        value={techs}
        onChange={e => setTechs(e.target.value)}
      />
      T
      <label htmlFor="price">
        Valor da diária * <span>(Deixe em branco para gratuito)</span>
      </label>
      <input
        type="text"
        id="price"
        placeholder="Valor cobrado por dia"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />
      <button className="btn" type="submit">
        Cadastrar
      </button>
    </form>
  );
}
