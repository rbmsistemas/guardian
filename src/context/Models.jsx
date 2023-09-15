export const Base_Inventory = (inventory = {}) => {
  if (Object.keys(inventory).length === 0) {
    return {
      id: "",
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
      status: false,
      images: [],
      altaDate: Date.now(),
      bajaDate: null,
      recepcionDate: null,
      createdBy: "",
    };
  } else {
    return {
      id: inventory.id || "",
      userId: inventory.userId || "",
      inventoryModelId: inventory.inventoryModelId || "",
      serialNumber: inventory.serialNumber || "",
      activo: inventory.activo || "",
      comments: inventory.comments || "",
      status: inventory.status || false,
      images: inventory.images || [],
      altaDate: inventory.altaDate || Date.now(),
      bajaDate: inventory.bajaDate || null,
      recepcionDate: inventory.recepcionDate || null,
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
  id: "",
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
