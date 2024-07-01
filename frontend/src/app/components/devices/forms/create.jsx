"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Create = () => {
  const [deviceName, setDeviceName] = useState('')
  const [deviceIp, setDeviceIp] = useState('')
  const [deviceStatus, setDeviceStatus] = useState(false)
  const router = useRouter()

  const handleSubmit = async e => {
    e.preventDefault();


    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/device/`, {
      method: "POST",
      body: JSON.stringify({ name: deviceName, ip: deviceIp, status: deviceStatus }),
      headers: {
        "Content-type": "application/json"
      }
    })

    const dataRes = await res.json()
    router.refresh()
  }

  const handleCheck = () => {
    setDeviceStatus(!deviceStatus)
  }

  return (
    <div className='bg-slate-200 p-10 rounded-md'>
      <h1 className='text-black font-bold'>Create Device</h1>
      <form onSubmit={handleSubmit}>
        <input onChange={e => setDeviceName(e.target.value)} className='bg-slate-400 text-slate-900 rounded-md p-2 w-full mb-2 block placeholder-white' type="text" name="name" placeholder=' name' />
        <input onChange={e => setDeviceIp(e.target.value)} className='bg-slate-400 text-slate-900 rounded-md p-2 w-full mb-2 block placeholder-white' type="text" name="ip" placeholder='ip' />
        <label>
          <input type='checkbox' name='status' onChange={handleCheck} checked={deviceStatus} />
          <span className='ml-2 text-black'> Status</span>
        </label>
        <button className='bg-indigo-500 w-full rounded-md p-2 block'>Create</button>
      </form>
    </div>
  )
}
export default Create
