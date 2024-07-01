"use client"
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        username: username,
        password: password
      });

      print(response)
      const token = response.data.token;
      localStorage.setItem('token', token);

      // Redirigir o actualizar la interfaz de usuario
      // Ejemplo: redireccionar a la página principal
      window.location.href = '/'; // o usar useRouter() de Next.js
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='bg-slate-200 p-7 container w-1/2 rounded-md'>
        <h1 className='text-black text-center mb-4'>Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="text-center">
          <input
            className='bg-slate-400 rounded-md p-2 w-1/2 mb-2 placeholder-white block mx-auto'
            name='UserName'
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className='bg-slate-400 rounded-md p-2 w-1/2 mb-2 placeholder-white block mx-auto'
            name='Password'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='bg-slate-950 rounded-md p-2 mx-auto block' type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
