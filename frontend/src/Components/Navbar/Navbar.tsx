import { Link } from "react-router-dom";
import { useContext } from "react";
import "./navbar.scss";
import { AuthContext } from "../../context/AuthContext";
import { logoutToast } from "../../../utils/toasts";
export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  return (
    <>
      <div className="navbar border-b-2 pb-5">
        <Link to={"/"} className="uppercase text-semibold text-xl">
          Logo
        </Link>

        {!user.user ? (
          <div className="navLinks">
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-5">
            <Link to="/profile">{user.user.firstName}</Link>
            <button
              className="px-7 border-2 border-black py-1   rounded-md text-black"
              onClick={() => {
                setUser({ token: null, user: null });
                logoutToast();
                localStorage.setItem("user", JSON.stringify(null));
              }}
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </>
  );
}
