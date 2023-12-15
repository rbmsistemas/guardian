function TrimObjectsValues(obj) {
  if (obj && typeof obj === "object") {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === "string") {
          obj[key] = obj[key].trim();
        } else if (typeof obj[key] === "object") {
          obj[key] = TrimObjectsValues(obj[key]);
        }
      }
    }
  }

  return obj;
}

export default TrimObjectsValues;
