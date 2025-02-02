import { useEffect, useRef } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { setDeletingItem } from "../../redux/contacts/slice";
import { selectDeletingItem } from "../../redux/contacts/selectors";
import { deleteContact } from "../../redux/contacts/operations";

Modal.setAppElement("#root");

const ConfirmModal = () => {
  const dispatch = useDispatch();
  const deletingItem = useSelector(selectDeletingItem);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape" && modalRef.current?.open) {
        dispatch(setDeletingItem({}));
        modalRef.current?.close();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  return (
    <>
      <dialog
        ref={modalRef}
        id="my_modal_3"
        className="modal"
        onClick={() => {
          dispatch(setDeletingItem({}));
          modalRef.current?.close();
        }}
      >
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
          <h3 className="font-bold text-lg">
            Are you sure you want to delete this contact?
          </h3>
          <div className="flex-col py-4">
            <p>{deletingItem.name}</p>
            <p>{deletingItem.number}</p>
          </div>

          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={() => {
                dispatch(setDeletingItem({}));
                modalRef.current?.close();
              }}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <div className="flex gap-4 justify-center">
              <button
                className="btn btn-outline"
                onClick={() => {
                  dispatch(setDeletingItem({}));
                  modalRef.current?.close();
                }}
              >
                No
              </button>
              <button
                className="btn btn-outline btn-warning"
                onClick={() => {
                  dispatch(deleteContact(deletingItem.id));
                  dispatch(setDeletingItem({}));
                  modalRef.current?.close();
                }}
              >
                Yes
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default ConfirmModal;
