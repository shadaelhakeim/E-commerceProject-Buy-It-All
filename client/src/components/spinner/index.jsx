import { ClimbingBoxLoader } from "react-spinners";
import "./Spinner.css";
const Spinner = () => {
  return (
    <div className="spinner-container">
      <ClimbingBoxLoader color={"#3498db"} loading={true} size={15} />
    </div>
  );
};

export default Spinner;
