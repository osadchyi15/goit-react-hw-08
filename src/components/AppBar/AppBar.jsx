import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";
import { selectIsLoading } from "../../redux/contacts/selectors";
import Loader from "../Loader/Loader";

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectIsLoading);

  return (
    <header className="navbar rounded-2xl mb-6 bg-base-200 shadow-sm justify-between items-center px-6">
      <Navigation />
      {isLoading && <Loader />}
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
};

export default AppBar;
