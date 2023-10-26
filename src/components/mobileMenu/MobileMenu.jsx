import React from "react";

const MobileMenu = ({
  actions = [{ id: 1, label: "", onClick: () => {}, icon: Icon, color: "" }],
}) => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-16 bg-white flex justify-around items-center border-t border-gray-300">
      {actions.map((action) => (
        <button
          key={action.id}
          type="button"
          className={`flex flex-col justify-center w-full items-center gap-1 border-r border-r-gray-300 last:border-none ${
            action?.color || "text-gray-500"
          } `}
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
