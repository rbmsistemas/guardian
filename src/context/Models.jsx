export const Base_Inventory = (inventory = {}, models = []) => {
  if (Object.keys(inventory).length === 0) {
    return {
      userId: "",
      inventoryModelId: "",
      otherModel: "",
      inventoryBrandId: "",
      otherBrand: "",
      inventoryTypeId: "",
      otherType: "",
      serialNumber: "",
      activo: "",
      comments: "",
      status: 1,
      images: [],
      files: [],
      altaDate: Date.now(),
      bajaDate: null,
      recepcionDate: "",
      details: Base_InventoryField,
      createdBy: "",
    };
  } else {
    const model = models?.find(
      (item) => item.id === inventory.inventoryModelId
    );

    return {
      id: inventory.id || "",
      userId: inventory.userId || "",
      inventoryModelId: inventory.inventoryModelId || "",
      otherModel: inventory.otherModel || "",
      inventoryBrandId: model.inventoryBrandId || "",
      otherBrand: inventory.otherBrand || "",
      inventoryTypeId: model.inventoryTypeId || "",
      otherType: inventory.otherType || "",
      serialNumber: inventory.serialNumber || "",
      activo: inventory.activo || "",
      comments: inventory.comments || "",
      status: inventory.status || 1,
      images: inventory.images || [],
      files: inventory.files || [],
      altaDate: inventory.altaDate || Date.now(),
      bajaDate: inventory.bajaDate || null,
      recepcionDate: inventory.recepcionDate || null,
      details: inventory.details || Base_InventoryField,
      createdBy: inventory.createdBy || "",
      createdAt: inventory.createdAt || Date.now(),
      updatedAt: inventory.updatedAt || Date.now(),
    };
  }
};

export const Base_InventoryModel = {
  id: "",
  name: "",
  image: "",
  inventoryTypeId: "",
  inventoryBrandId: "",
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

export const Base_InventoryBrand = {
  id: "",
  name: "",
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

export const Base_InventoryType = {
  id: "",
  name: "",
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

export const Base_User = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  userName: "",
  phone: "",
  rol: "",
  photo: "",
  status: false,
  companyId: "",
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

export const Base_Company = {
  name: "",
  manager: "",
  email: "",
  phone: "",
  logo: "",
  comments: "",
  status: false,
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

export const Base_InventoryField = [
  { id: 1, key: "orden de compra", value: "" },
  { id: 2, key: "factura", value: "" },
  { id: 3, key: "ubicacion", value: "" },
  { id: 4, key: "usuario", value: "" },
];

export const Base_InventoryFiles = [
  {
    title: "",
    description: "",
    file: {
      fileName: "",
      fileSize: "",
      fileType: "",
      fileURL: "",
      fileAuthor: "",
    },
  },
];
