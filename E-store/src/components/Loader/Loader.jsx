import { RotateLoader } from "react-spinners";

function Loader() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <RotateLoader />
    </div>
  );
}

export default Loader;
