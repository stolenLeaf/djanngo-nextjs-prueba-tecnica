"use client"
import { useState } from 'react';
import EditModal from './forms/EditModal';
import { useRouter } from 'next/navigation'; // Asegúrate de importar useRouter desde 'next/router'

// Asegúrate de ajustar la ruta correcta

const DeviceCard = ({ device }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const router = useRouter();

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const submitEdit = async (editedDeviceData) => {
    // Aquí podrías enviar la solicitud de edición al backend
    console.log('Submitting edited data:', editedDeviceData);

    if (window.confirm("Do you want to edit this device data?")) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/device/${editedDeviceData.id}/`, {
        method: "PUT",
        body: JSON.stringify({ name: editedDeviceData.name, ip: editedDeviceData.ip, status: editedDeviceData.status }),
        headers: {
          "Content-type": "application/json"
        }
      })
      if (res.status === 200) {
        router.refresh()
      }
    }

    closeEditModal();
  };

  const handlePing = async (id, statuDevice) => {
    console.log("ping: ", statuDevice)
    if (window.confirm("Do you want to start a ping test for this device?")) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/device/${id}/ping/`, {
        method: "POST",
      })
      if (res.status === 200 && statuDevice) {
        alert("the ping test was successfull!!")
        router.refresh()
      } else {
        alert("the ping test has failed")

      }
    }

  }

  const handleDelete = async (id) => {
    console.log(id)
    if (window.confirm("Do you want to delete this device?")) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/device/${id}/`, {
        method: "DELETE",
      })
      if (res.status === 204) {
        router.refresh()
      }
    }

  }

  return (
    <>
      <div className='bg-slate-500 px-4 py-3 mb-2 flex justify-between item-center rounded-md' key={device.id}>
        <h2>{device.name}</h2>
        <div>
          <p>{device.ip}</p>
        </div>
        <div className='flex justify-between gap-x-2'>
          <button className='bg-red-500 rounded-md p-2' onClick={() => handleDelete(device.id)}>
            Delete
          </button>
          <button className='bg-indigo-500 p-2 rounded-md' onClick={openEditModal}>
            Edit
          </button>
          <button className='bg-green-500 p-2 rounded-md' onClick={() => handlePing(device.id, device.status)}>
            Ping
          </button>
        </div>
      </div>

      {/* Modal de Edición */}
      <EditModal
        device={device}
        isOpen={editModalOpen}
        onClose={closeEditModal}
        onSubmit={submitEdit}
      />
    </>
  );
};

export default DeviceCard;
