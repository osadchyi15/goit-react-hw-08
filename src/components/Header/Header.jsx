import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { selectIsLoading } from "../../redux/contacts/selectors";
import { logoutThunk } from "../../redux/auth/operations";

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  return (
    <header className="navbar rounded-2xl mb-6 bg-base-200 shadow-sm justify-between items-center px-6">
      <NavLink className="btn btn-ghost" to="/">
        PhoneBook
      </NavLink>
      {isLoggedIn &&
        (!isLoading ? (
          <p className="text-l">Welcome, {user.name}</p>
        ) : (
          <div className="flex gap-4 justify-center">
            <span className="loading loading-spinner text-success"></span>
            <span className="loading loading-spinner text-warning"></span>
            <span className="loading loading-spinner text-error"></span>
          </div>
        ))}
      <div className="flex-none">
        <ul className=" text-l px-1 flex gap-2 items-center">
          <li>
            <NavLink className="btn btn-ghost" to="/contacts">
              Contacts
            </NavLink>
          </li>
          <li>
            <button className="btn" onClick={() => dispatch(logoutThunk())}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
