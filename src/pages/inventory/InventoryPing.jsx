import React, { useEffect, useState } from "react";
import { TextInput, Textarea } from "flowbite-react";
import { Button } from "flowbite-react";
import axios from "axios";
import { urlEnv } from "../../api/inventory.api";

const InventoryPing = () => {
  const [ipAddress, setIpAddress] = useState("");
  const [pingResult, setPingResult] = useState("");

  const handlePing = async () => {
    try {
      const response = await axios.post(`${urlEnv}/api/inventories/ping`, {
        ipAddress,
      });
      setPingResult([...pingResult, response.data.output]);
    } catch (error) {
      setPingResult(`Ping failed: ${error.message}`);
    }
  };

  useEffect(() => {
    if (ipAddress) {
      const interval = setInterval(() => {
        handlePing();
        console.log("try ping");
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className="container mx-auto p-4 bg-white flex flex-col gap-8">
      <TextInput
        placeholder="Enter IP address"
        value={ipAddress}
        onChange={(e) => setIpAddress(e.target.value)}
      />
      <Button onClick={handlePing}>Ping</Button>
      <Textarea value={pingResult} readOnly />
    </div>
  );
};

export default InventoryPing;
