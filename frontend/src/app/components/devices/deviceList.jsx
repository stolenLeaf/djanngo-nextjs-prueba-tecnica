import { useEffect, useState } from 'react';
import DeviceCard from './deviceCard';

async function loadDevices() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/device/`)
  const data = await res.json()
  return data
}

const DeviceList = async () => {
  const [deviceList, setDeviceList] = useState()
  const [error, setError] = useState(null);
  const data = await loadDevices()
  // const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/device`)
  // const data = await res.json()
  // console.log(data)


  return (
    <div className='bg-slate-700 p-4 w-full rounded-md'>
      <div>Device List</div>
      {data.map(device => (
        <DeviceCard device={device} key={device.id} />
      ))}
    </div>

  )
}



export default DeviceList
