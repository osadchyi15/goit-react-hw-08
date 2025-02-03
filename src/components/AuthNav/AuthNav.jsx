import { NavLink } from "react-router-dom";

const AuthNav = () => {
  return (
    <div className="flex gap-2">
      <NavLink className="btn btn-ghost" to="/login">
        Login
      </NavLink>
      <NavLink className="btn btn-ghost" to="/register">
        Register
      </NavLink>
    </div>
  );
};

export default AuthNav;
