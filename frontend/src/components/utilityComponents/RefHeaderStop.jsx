import { forwardRef } from "react";

const RefHeaderStop = forwardRef((props, ref) => {
  return <div ref={ref} className="stop-point"></div>;
});

export default RefHeaderStop;
