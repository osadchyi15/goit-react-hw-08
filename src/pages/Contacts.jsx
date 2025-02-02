import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../redux/contacts/operations";
import { useEffect } from "react";

import SearchBox from "../components/SearchBox/SearchBox";
import ContactForm from "../components/ContactForm/ContactForm";
import EditContactForm from "../components/EditContactForm/EditContactForm";
import ContactList from "../components/ContactList/ContactList";
import ConfirmModal from "../components/ConfirmModal/ConfirmModal";
import SomethingWrongCard from "../components/SomethingWrongCard/SomethingWrongCard";

import { selectIsEdit, selectIsError } from "../redux/contacts/selectors";

const Contacts = () => {
  const isError = useSelector(selectIsError);
  const isEdit = useSelector(selectIsEdit);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="place-items-center">
      <div className="place-items-center">
        <div className="flex gap-8 mb-6">
          {!isEdit ? <ContactForm /> : <EditContactForm />}

          <SearchBox />
        </div>
        {!isError ? <ContactList /> : <SomethingWrongCard />}
      </div>

      <ConfirmModal />
    </div>
  );
};

export default Contacts;
