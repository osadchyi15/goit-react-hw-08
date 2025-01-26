import "./App.css";
import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";
import { useDispatch, useSelector } from "react-redux";

import { fetchContacts } from "./redux/contacts/operations";
import { useEffect } from "react";
import {
  selectFilteredContacts,
  selectIsError,
  selectIsLoading,
  selectIsModalOpen,
} from "./redux/contacts/selectors";
import ConfirmModal from "./components/ConfirmModal/ConfirmModal";

function App() {
  const contacts = useSelector(selectFilteredContacts);
  const isModalOpen = useSelector(selectIsModalOpen);
  const isError = useSelector(selectIsError);
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();

  console.log(isModalOpen);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="wrapper">
      <ContactForm />
      <SearchBox />
      {isLoading && <h2>Loading...</h2>}
      <div>
        {contacts.length === 0 ? (
          <div className="addContact">
            <p>Your phonebook is empty.</p>
            <p>Please add your first contact to the phonebook!</p>
          </div>
        ) : (
          <ContactList />
        )}
      </div>
      {isError && <h2>Something went wrong!</h2>}
      <ConfirmModal />
    </div>
  );
}

export default App;
