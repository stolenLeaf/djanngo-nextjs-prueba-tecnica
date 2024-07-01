import { useEffect, useState } from 'react';
import Logcard from './logCard';

async function loadlogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/deviceLogs/`)
  const data = await res.json()
  return data
}

const LogsList = async () => {
  const [deviceList, setDeviceList] = useState()
  const [error, setError] = useState(null);
  const data = await loadlogs()
  // const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/device`)
  // const data = await res.json()
  // console.log(data)


  return (
    <div className='bg-slate-700 p-4 w-full rounded-md'>
      <div className='flex justify-between item-center'>
        <h2>result</h2>
        <h2>device</h2>
        <h2>date</h2>
      </div>
      {data.map(log => (
        // <DeviceCard logs={device} key={device.id} />
        <Logcard logs={log} key={log.id} />
      ))}
    </div>

  )
}



export default LogsList
