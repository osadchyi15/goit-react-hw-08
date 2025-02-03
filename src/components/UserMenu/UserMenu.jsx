import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";

import { logoutThunk } from "../../redux/auth/operations";

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logoutThunk());
  };
  return (
    <div className="flex gap-4 justify-center items-center">
      <p className="text-l font-semibold">Welcome, {user.name}!</p>
      <button className="btn btn-default" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
