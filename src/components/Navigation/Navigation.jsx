import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav className="flex gap-2">
      <NavLink className="btn btn-ghost" to="/">
        PhoneBook
      </NavLink>
      {isLoggedIn && (
        <NavLink className="btn btn-ghost" to="/contacts">
          Contacts
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
