import React, { useState } from "react";

import QrReader from "react-qr-reader";
import { AiOutlineTool } from "react-icons/ai";
import { Modal } from "flowbite-react";

const HelperButton = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [qrData, setQrData] = useState("");

  const handleScanQR = (data) => {
    if (data) {
      setQrData(data);
    }
  };

  const handleErrorQR = (err) => {
    console.error(err);
  };

  return (
    <div>
      <button
        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center"
        onClick={() => setModalIsOpen(true)}
      >
        <AiOutlineTool className="mr-2" /> Abrir Herramientas
      </button>

      <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Herramientas</h2>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => setQrData("")}
        >
          Limpiar QR Data
        </button>
        <QrReader
          delay={300}
          onError={handleErrorQR}
          onScan={handleScanQR}
          style={{ width: "100%" }}
        />
        <p>{qrData}</p>
      </Modal>
    </div>
  );
};

export default HelperButton;
