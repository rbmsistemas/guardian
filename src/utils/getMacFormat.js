// get mac address format from string split each 4 characters by : and return the formatted string
export default function getMacFormat(mac) {
  return mac.match(/.{1,4}/g).join(":");
}
