const handleTrimObjectValues = (obj) => {
  const trimmedObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "string") {
        trimmedObj[key] = obj[key].trim();
      } else {
        trimmedObj[key] = obj[key];
      }
    }
  }
  return trimmedObj;
};

export default handleTrimObjectValues;
