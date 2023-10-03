export const getCurrentFormattedDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const formatLocalDate = (dateString) => {
  if (!dateString || dateString == null || dateString == undefined) return null;

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  };
  return new Intl.DateTimeFormat("es-ES", options)
    .format(new Date(dateString))
    .replace(/\//g, "-")
    .replace(",", "");
};
