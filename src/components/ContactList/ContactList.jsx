import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";

import { selectFilteredContacts } from "../../redux/contacts/selectors";

const ContactList = () => {
  const filteredList = useSelector(selectFilteredContacts);

  return (
    <ul className="grid grid-cols-2 gap-6 lg:grid-cols-3">
      {filteredList.map((contact) => {
        return (
          <li key={contact.id}>
            <Contact
              name={contact.name}
              number={contact.number}
              id={contact.id}
            />
          </li>
        );
      })}
    </ul>
  );
};
export default ContactList;
