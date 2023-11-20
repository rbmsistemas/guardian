import React from "react";

const InventoryDetailsView = ({ data }) => {
  data = data.map((pair) => {
    pair.key = pair.key.charAt(0).toUpperCase() + pair.key.slice(1);
    return pair;
  });

  data = data.map((pair) => {
    if (typeof pair.value === "string") {
      pair.value =
        pair.value.charAt(0).toUpperCase() + pair.value.slice(1).toLowerCase();
    }
    return pair;
  });

  return (
    <div className="w-full flex gap-2 flex-wrap py-3">
      {data.map((pair, index) => (
        <p key={index} className={`p-2 rounded-md border text-gray-800`}>
          <span id="key" className="font-semibold">
            {pair.key}
          </span>
          : <span id="value"> {pair.value ? pair.value : "N/A"}</span>
        </p>
      ))}
    </div>
  );
};

export default InventoryDetailsView;
