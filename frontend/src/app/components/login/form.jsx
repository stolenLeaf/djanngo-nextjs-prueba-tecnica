"use client"

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Asegúrate de importar useRouter desde 'next/router'
// import Edit from '../devices/forms/edit';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        username: username,
        password: password
      });

      const token = response.data.token;
      localStorage.setItem('token', token);

      alert("login correcto, seras redirigido al crud")

      // Redirigir a la página de admin después del inicio de sesión exitoso
      router.push('/dashboard');

    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='bg-slate-200 p-7 container w-1/2 rounded-md'>
        <h1 className='text-black text-center mb-4'>Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="text-center">
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
          <button className='bg-slate-950 rounded-md p-2 mx-auto block' onClick={handleSubmit}>Login</button>
        </form>
        {/* <Edit */}
        {/*   isOpen={isModalOpen} */}
        {/*   closeModal={() => setIsModalOpen(!isModalOpen)} */}


        {/* /> */}
      </div>
    </div>
  );
};

export default Login;

