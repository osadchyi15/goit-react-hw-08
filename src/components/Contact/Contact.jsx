import { RiPhoneFill } from "react-icons/ri";
import { IoPerson } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeletingItem,
  setEditingItem,
  setIsEdit,
} from "../../redux/contacts/slice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { selectIsEdit } from "../../redux/contacts/selectors";

const Contact = ({ name, number, id }) => {
  const dispatch = useDispatch();
  const isEdit = useSelector(selectIsEdit);

  return (
    <div className="w-xs flex justify-between bg-base-200 border border-base-300 p-4 rounded-box text-center">
      <ul className="flex flex-col gap-2">
        <li className="flex gap-2 items-center text-left">
          <IoPerson /> {name}
        </li>
        <li className="flex gap-2 text-left items-center">
          <RiPhoneFill /> {number}
        </li>
      </ul>

      <div className="flex gap-4">
        <button
          hidden={isEdit}
          type="button"
          className="border-none p-none font-bold transition duration-500 cursor-pointer bg-transparent hover:text-green-500"
          onClick={() => {
            dispatch(setEditingItem({ id, name, number }));
            dispatch(setIsEdit(true));
          }}
        >
          <FaEdit className="text-xl" />
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

            document.getElementById("my_modal_3").showModal();
            dispatch(setIsEdit(false));
            dispatch(setEditingItem({}));
          }}
          className="border-none p-none font-bold transition duration-500 cursor-pointer bg-transparent hover:text-red-500"
        >
          <RiDeleteBin6Line className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Contact;
