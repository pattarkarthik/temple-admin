import { React } from "react";
import { useReactToPrint } from "react-to-print";

export const BasicComponent = () => {
  const componentRef = React.useRef(null);

  const printFn = useReactToPrint({
    contentRef: componentRef,
  });

  return (
    <div>
      <button onClick={printFn}>Print</button>
      <div ref={componentRef}>hi</div>
    </div>
  );
};
