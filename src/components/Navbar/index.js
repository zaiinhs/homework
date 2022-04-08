import "./style.css";
import { useDispatch } from "react-redux";
import { setLogout } from "../../redux/authReducer";
import Button from "../Button";

function Navbar() {
  const dispatch = useDispatch();

  return (
    <>
      <div className="navbar__container">
        <h1>Generasi GIGIH 2.0</h1>
        <Button onClick={() => dispatch(setLogout())}>Logout</Button>
      </div>
    </>
  );
}

export default Navbar;
