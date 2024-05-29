import toast from "react-hot-toast";
import { AppUrl } from "../api/inventory.api";

export const handleShareInventory = async (inventory) => {
  const successNotify = (message) => toast.success(message);
  try {
    if (inventory) {
      const stringToCopy = `Tipo: ${
        inventory?.inventoryModel?.inventoryType?.name
      }\nMarca: ${inventory?.inventoryModel?.inventoryBrand?.name}\nModelo: ${
        inventory?.inventoryModel?.name
      }\nSN: ${inventory?.serialNumber}\nActivo: ${
        inventory?.activo
      }\nStatus: ${
        inventory?.status === 1
          ? "Alta"
          : inventory?.status === 2
          ? "Propuesta de Baja"
          : "Baja"
      }\nCreado: ${inventory?.createdAt}\nActualizado: ${
        inventory?.updatedAt || "N/A"
      }
    \n\n${AppUrl}/inventario/ver/${inventory?.id}`;

      navigator.clipboard.writeText(stringToCopy);
      successNotify("Inventario copiado al portapapeles");
    }
  } catch (error) {
    console.error("Error sharing inventory: ", error);
  }
};
