import { formatLocalDate } from "./getFormatedDate";

export function formatedInventoriesForTable(data, location) {
  let formatInventories = [];
  if (data) {
    formatInventories = data?.map((item, index) => {
      let rowNumber = index + 1;
      if (location) {
        let currentPage = new URLSearchParams(location.search).get("page") || 1;
        let currentQuantityResults =
          new URLSearchParams(location.search).get("quantityResults") || 10;
        rowNumber =
          parseInt(currentPage) * parseInt(currentQuantityResults) -
          parseInt(currentQuantityResults) +
          index +
          1;
      }
      return {
        no: {
          key: "no",
          value: rowNumber,
        },
        imagen: {
          key: "imagen",
          value: item?.imagenes[0] ?? [],
        },
        tipo: {
          key: "inventoryTypeId",
          value: item?.tipo ?? item?.inventoryModel?.inventoryType?.name,
        },
        marca: {
          key: "inventoryBrandId",
          value: item?.marca ?? item?.inventoryModel?.inventoryBrand?.name,
        },
        modelo: {
          key: "inventoryModelId",
          value: item.modelo ?? item?.inventoryModel?.name,
        },
        sn: {
          key: "serialNumber",
          value: item.sn?.length > 0 ? item.sn : "N/A",
        },
        activo: {
          key: "activo",
          value: item.activo?.length > 0 ? item.activo : "N/A",
        },
        status: { key: "status", value: item.status },
        creacion: {
          key: "createdAt",
          value: formatLocalDate(item["fecha creacion"] ?? item.createdAt),
        },
        id: { key: "id", value: item.id },
      };
    });
  }
  return formatInventories;
}
