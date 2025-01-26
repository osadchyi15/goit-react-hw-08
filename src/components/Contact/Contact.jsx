import css from "./Contact.module.css";
import { RiPhoneFill } from "react-icons/ri";
import { IoPerson } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setDeletingItem, setIsModalStatus } from "../../redux/contacts/slice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

const Contact = ({ name, number, id }) => {
  const dispatch = useDispatch();

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

      <div className={css.buttons}>
        <button type="button" className={css.editButtonImage}>
          <FaEdit className={css.buttonsSize} />
        </button>

        <button
          type="button"
          onClick={() => {
            dispatch(
              setDeletingItem({
                id,
                name,
                number,
              })
            );
            dispatch(setIsModalStatus(true));
          }}
          className={css.deleteButtonImage}
        >
          <RiDeleteBin6Line className={css.buttonsSize} />
        </button>
      </div>
    </div>
  );
};

export default Contact;
