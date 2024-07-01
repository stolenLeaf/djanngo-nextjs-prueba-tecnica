"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Asegúrate de importar useRouter desde 'next/router'

// Asegúrate de ajustar la ruta correcta

const Logcard = ({ logs }) => {

  return (
    <>
      <div className='bg-slate-500 px-4 py-3 mb-2 flex justify-between item-center rounded-md' key={logs.id}>
        <h2>{logs.test_result ? "pass" : "failed"}</h2>
        <div>
          <p>{logs.device_tenant}</p>
        </div>
        <div>          <p>{logs.created_at}</p></div>
      </div>


    </>
  );
};

export default Logcard;
