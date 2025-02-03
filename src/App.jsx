import "./App.css";

import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshUserThunk } from "./redux/auth/operations";
import { useEffect } from "react";

import Layout from "./Layout";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import RestrictedRoute from "./RestrictedRoute";
import PrivateRoute from "./PrivateRoute";

import { selectIsRefreshing } from "./redux/auth/selectors";
import Loader from "./components/Loader/Loader";

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUserThunk());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <div className="wrapper">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="contacts"
            element={
              <PrivateRoute redirectTo="/login" component={<Contacts />} />
            }
          />

          <Route
            path="login"
            element={
              <RestrictedRoute redirectTo="/contacts" component={<Login />} />
            }
          />
          <Route
            path="register"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<Register />}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
