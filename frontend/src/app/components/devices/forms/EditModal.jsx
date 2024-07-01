import { useState } from 'react';

const EditModal = ({ device, isOpen, onClose, onSubmit }) => {
  const [editDeviceName, setEditDeviceName] = useState(device.name);
  const [editDeviceIp, setEditDeviceIp] = useState(device.ip);
  const [editDeviceStatus, setEditDeviceStatus] = useState(device.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías realizar validaciones adicionales si es necesario
    onSubmit({
      id: device.id,
      name: editDeviceName,
      ip: editDeviceIp,
      status: editDeviceStatus,
    });
  };

  return (
    isOpen && (
      <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50'>
        <div className='bg-white p-4 rounded-md'>
          <button onClick={onClose} className='absolute top-0 right-0 m-2 text-gray-500'>
            Close
          </button>
          <h2 className='text-xl font-bold mb-4'>Edit Device</h2>
          <form onSubmit={handleSubmit}>
            <input
              value={editDeviceName}
              onChange={(e) => setEditDeviceName(e.target.value)}
              className='bg-slate-400 text-slate-900 rounded-md p-2 w-full mb-2 block placeholder-white'
              type='text'
              name='name'
              placeholder='Name'
            />
            <input
              value={editDeviceIp}
              onChange={(e) => setEditDeviceIp(e.target.value)}
              className='bg-slate-400 text-slate-900 rounded-md p-2 w-full mb-2 block placeholder-white'
              type='text'
              name='ip'
              placeholder='IP'
            />
            <label>
              <input
                type='checkbox'
                name='status'
                checked={editDeviceStatus}
                onChange={(e) => setEditDeviceStatus(e.target.checked)}
              />
              <span className='ml-2 text-black'>Status</span>
            </label>
            <button className='bg-indigo-500 w-full rounded-md p-2 block mt-4' type='submit'>
              Save Changes
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default EditModal;
