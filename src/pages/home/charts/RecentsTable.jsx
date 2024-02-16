import React, { lazy } from "react";
import CustomeTable from "../../../components/table/CustomeTable";
import { AppUrl } from "../../../api/inventory.api";
import toast from "react-hot-toast";
const RecentsTable = ({ inventories = [], page }) => {
  const successNotify = (message) => toast.success(message);
  const handleToCopyToClipboard = (id) => {
    let inventory = inventories.find(
      (inventory) => inventory?.id?.value === id
    );

    const stringToCopy = `Tipo: ${inventory?.tipo.value}\nMarca: ${
      inventory?.marca.value
    }\nModelo: ${inventory?.modelo.value}\nSN: ${
      inventory?.sn.value
    }\nActivo: ${inventory?.activo.value}\nStatus: ${
      inventory?.status.value === 1
        ? "Alta"
        : inventory?.status.value === 2
        ? "Propuesta de Baja"
        : "Baja"
    }\nCreado: ${inventory?.creacion.value}\n
    }\n\n${AppUrl}/inventario/ver/${id}`;
    navigator.clipboard.writeText(stringToCopy);
    successNotify("Inventario copiado al portapapeles");
  };
  return (
    <CustomeTable
      data={inventories}
      onShare={handleToCopyToClipboard}
      onShow={"/inventario/ver/"}
      onEdit={"/inventario/editar/"}
      quantityResults={5}
      totalEntries={5}
      totalPages={1}
      showFooterControls={false}
    />
  );
};

export default RecentsTable;
