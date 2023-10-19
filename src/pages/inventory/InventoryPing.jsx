import React, { useEffect, useState } from "react";
import { Label, TextInput, Textarea } from "flowbite-react";
import { Button } from "flowbite-react";
import axios from "axios";
import { urlEnv } from "../../api/inventory.api";
import { RiSignalTowerLine } from "react-icons/ri";

const InventoryPing = () => {
  const [ipAddress, setIpAddress] = useState("10.219.0.14");
  const [pingResults, setPingResults] = useState([]);
  const [pingInterval, setPingInterval] = useState(null);
  const [pingSummary, setPingSummary] = useState(null);
  const [localIPAddress, setLocalIPAddress] = useState(""); // Nuevo estado para la IP local

  // Función para obtener la IP local
  const getLocalIPAddress = async () => {
    try {
      const response = await axios.get("https://api64.ipify.org?format=json");
      setLocalIPAddress(response.data.ip);
    } catch (error) {
      console.error("Error al obtener la IP local:", error);
    }
  };

  useEffect(() => {
    getLocalIPAddress(); // Obtén la IP local cuando se monta el componente
  }, []);

  const handlePing = async () => {
    try {
      const response = await axios.post(`${urlEnv}/api/inventories/ping`, {
        ipAddress,
      });
      if (response.data.alive == true) {
        if (response.data.output.includes("Respuesta desde")) {
          const match = response.data.output.match(
            /Respuesta desde .*: .* tiempo=.* TTL=.*/
          );
          if (match) {
            const pingDetail = match[0];
            setPingResults((prevResults) => [...prevResults, pingDetail]);
          }
        } else if (response.data.output.includes("bytes of data.")) {
          const match = response.data.output.match(
            /bytes from .*: icmp_seq=.* ttl=.* time=.* ms/
          );
          if (match) {
            const pingDetail = match[0];
            setPingResults((prevResults) => [...prevResults, pingDetail]);
          }
        }
      } else {
        setPingResults((prevResults) => [
          ...prevResults,
          "Respuesta no recibida.",
        ]);
      }
    } catch (error) {
      setPingResults((prevResults) => [
        ...prevResults,
        `Ping failed: ${error.message}`,
      ]);
    }
  };

  const startAutoPing = () => {
    if (!pingInterval) {
      setPingResults([]);
      setPingSummary(null);
      const interval = setInterval(() => {
        handlePing();
        console.log("try ping");
      }, 1000);
      setPingInterval(interval);
    }
  };

  const stopAutoPing = () => {
    if (pingInterval) {
      clearInterval(pingInterval);
      setPingInterval(null);
      // Calcula el resumen del ping
      const sentPackets = pingResults.length;
      const receivedPackets = pingResults.filter((result) =>
        result.includes("Respuesta desde")
      ).length;
      const lostPackets = sentPackets - receivedPackets;
      const receivedPercentage = (
        (receivedPackets / sentPackets) *
        100
      ).toFixed(2);
      const lostPercentage = (100 - receivedPercentage).toFixed(2);
      const summary = `Ping realizado desde la IP ${localIPAddress}\nEstadísticas de ping para ${ipAddress}:\n  Paquetes: enviados = ${sentPackets}, recibidos = ${receivedPackets}, perdidos = ${lostPackets}\n  (${receivedPercentage}% recibidos, ${lostPercentage}% perdidos)`;
      setPingSummary(summary);
    }
  };

  const handleIpAddressChange = (e) => {
    setIpAddress(e.target.value);
  };

  return (
    <div className="p-4 bg-white flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-0">
        <h1 className="text-2xl font-semibold">Ping</h1>
        <p className="text-sm">
          Ingresa la dirección IP a la que deseas hacer ping.
        </p>
      </div>
      <div className="flex flex-col gap-0">
        <Label htmlFor="ipAddress">IP Address</Label>
        <TextInput
          id="ipAddress"
          name="ipAddress"
          placeholder="Enter IP address"
          value={ipAddress}
          onChange={handleIpAddressChange}
        />
      </div>
      <div className="w-full flex flex-wrap gap-4">
        <Button
          className="flex-grow flex-shrink"
          type="submit"
          onClick={startAutoPing}
        >
          Iniciar Ping Automático
        </Button>
        <Button
          className="flex-grow flex-shrink"
          type="submit"
          onClick={stopAutoPing}
        >
          Detener Ping Automático
        </Button>
        <Button
          className="flex-grow flex-shrink"
          type="submit"
          onClick={handlePing}
        >
          Manual Ping
        </Button>
        <Button
          className="flex-grow flex-shrink"
          type="submit"
          onClick={() => setPingResults([])}
        >
          Limpiar
        </Button>
      </div>
      <div className="w-full h-full flex flex-col md:flex-row gap-4 text-xs">
        <div className="w-full md:w-1/2">
          <p className="text-sm font-semibold pb-2">Estadisticas del ping</p>
          <div className="w-full h-full border border-gray-200">
            {pingSummary ?? (
              <div className="flex justify-center items-center w-full h-full text-6xl">
                <RiSignalTowerLine className="text-neutral-200" />
              </div>
            )}
          </div>
        </div>
        <div className="w-full h-full overflow-y-auto md:w-1/2">
          <p className="text-sm font-semibold pb-2">Resultados del ping</p>
          <div className="min-h-[30vh] w-full flex flex-col bg-neutral-100 p-2">
            {pingResults?.map((result, index) => (
              <div key={index}>{result}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPing;
