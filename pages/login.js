import { useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '@/utils/api';
import { useAuth } from '../context/Authcontext';


const LoginPage = () => {
  const { login: setAuthToken, isAuth } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  if (isAuth) {
    router.push('/admin');
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await login(form);
      setAuthToken(response.token);
      router.push('/admin');
    } catch (err) {
      setError('Email ou mot de passe invalide');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '80px' }}>
      <div className="card">
        <h1>Connexion</h1>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {error && <p style={{ color: 'red', marginBottom: '12px' }}>{error}</p>}

          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
