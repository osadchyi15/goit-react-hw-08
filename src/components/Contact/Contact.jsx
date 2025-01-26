import css from "./Contact.module.css";
import { RiPhoneFill } from "react-icons/ri";
import { IoPerson } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";

const Contact = ({ name, number, id }) => {
  const dispatch = useDispatch();

  const onDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <div className={css.contact}>
      <ul className={css.contactDescr}>
        <li className={css.contactName}>
          <IoPerson /> {name}
        </li>
        <li className={css.contactNumber}>
          <RiPhoneFill /> {number}
        </li>
      </ul>
      <button
        type="button"
        onClick={() => onDeleteContact(id)}
        className={css.contactDeletButton}
      >
        Delete
      </button>
    </div>
  );
};

export default Contact;
