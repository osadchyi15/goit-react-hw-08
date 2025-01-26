import { useEffect } from "react";
import css from "./ConfirmModal.module.css";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { setDeletingItem, setIsModalStatus } from "../../redux/contacts/slice";
import {
  selectDeletingItem,
  selectIsModalOpen,
} from "../../redux/contacts/selectors";
import { deleteContact } from "../../redux/contacts/operations";

Modal.setAppElement("#root");

const ConfirmModal = () => {
  const dispatch = useDispatch();
  const deletingItem = useSelector(selectDeletingItem);
  const isModalOpen = useSelector(selectIsModalOpen);

  console.log(deletingItem);

  const handleCloseModal = () => {
    dispatch(setDeletingItem({}));
    dispatch(setIsModalStatus(false));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        handleCloseModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  const handleBackDropClick = (event) => {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <Modal
      onClick={handleBackDropClick}
      className={css.Modal}
      overlayClassName={css.Overlay}
      isOpen={isModalOpen}
      onRequestClose={handleCloseModal}
      preventScroll={true}
    >
      <button
        type="button"
        className={css.closeModalBtn}
        onClick={handleCloseModal}
      >
        &times;
      </button>
      <div className={css.modalQuestion}>
        <div className={css.modalQuestionText}>
          <p className={css.modalText}>
            Are you sure you want to delete this contact?
          </p>
          <p>{deletingItem.name}</p>
          <p>{deletingItem.number}</p>
        </div>
        <div className={css.modalOptions}>
          <button
            className={css.modalOptionButton}
            type="button"
            onClick={handleCloseModal}
          >
            No
          </button>
          <button
            className={css.modalOptionButton}
            type="button"
            onClick={() => {
              dispatch(deleteContact(deletingItem.id));
              dispatch(setDeletingItem({}));
              dispatch(setIsModalStatus(false));
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
