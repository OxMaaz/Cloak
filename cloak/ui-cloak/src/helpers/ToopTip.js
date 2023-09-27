import { useRef } from "react";

const ToolTip = ({ children, tooltip })=> {
  const tooltipRef = useRef(null);
  const container = useRef(null);

  return (
    <div
      ref={container}
      onMouseEnter={({ clientX }) => {
        if (!tooltipRef.current || !container.current) return;
        const { left } = container.current.getBoundingClientRect();

        tooltipRef.current.style.left = clientX - left + "px";
      }}
      className="z-10 group relative inline-block"
    >
      {children}
      {tooltip ? (
        <span
          ref={tooltipRef}
                  className="text-[0.9rem] montserrat-small font-semibold rounded-md invisible group-hover:visible opacity-0 group-hover:opacity-100 transition 
          bg-lue-500 text-gray-700 border hover:rounded-md border-gray-900 p-1 px-2 absolute top-full mt-2 whitespace-nowrap"
        >
          {tooltip}
        </span>
      ) : null}
    </div>
  );
};

export default ToolTip;