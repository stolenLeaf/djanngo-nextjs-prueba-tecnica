"use client"
import React from 'react';
import DeviceList from '../components/devices/deviceList';
import Create from '../components/devices/forms/create';

const AdminPage = () => {
  return (
    <div className='container mx-auto'>
      <h1>Admin Dashboard</h1>
      <div className='flex gap-x-10'>
        <Create />
        <DeviceList />
      </div>
    </div>
  );
};

export default AdminPage;
