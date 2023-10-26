import React from "react";

const MobileMenu = ({
  actions = [{ id: 1, label: "", onClick: () => {} }],
}) => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-16 bg-white flex justify-around items-center shadow-md">
      {actions.map((action) => (
        <button
          key={action.id}
          type="button"
          className="flex flex-col justify-center items-center gap-1"
          onClick={action.onClick}
        >
          {action.icon}
          <span className="text-xs">{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default MobileMenu;
