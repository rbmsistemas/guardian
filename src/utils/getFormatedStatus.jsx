const getFormatedStatus = (status) => {
  switch (status) {
    case 1:
      return "Alta";
    case 2:
      return "Propuesta Baja";
    case 3:
      return "Baja";
    default:
      return "Alta";
  }
};

export default getFormatedStatus;
