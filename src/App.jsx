import "./App.css";
import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";
import { useDispatch, useSelector } from "react-redux";
import {
  selectContacts,
  selectIsError,
  selectIsLoading,
} from "./redux/contactsSlice";
import { fetchContacts } from "./redux/contactsOps";
import { useEffect } from "react";

function App() {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const isError = useSelector(selectIsError);
  const isLoading = useSelector(selectIsLoading);

  return (
    <div className="wrapper">
      <h1 className="title">Phonebook</h1>
      <ContactForm />
      <SearchBox />
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
      {isLoading && <h2>Loading...</h2>}
    </div>
  );
}

export default App;
