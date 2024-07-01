"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import LogsList from '../components/logs/logsList';

const AdminPage = () => {

  const router = useRouter()


  const handleLogs = () => {
    router.push('/dashboard')
  }
  return (
    <div className='container mx-auto'>
      <h1>Logs</h1>
      <div className='flex gap-x-10'>
        <LogsList />
      </div>
      <button className='bg-yellow-500 w-full rounded-md m-2 p-2 block' onClick={() => handleLogs()}>Admin Dashboard</button>
    </div>
  );
};

export default AdminPage;
