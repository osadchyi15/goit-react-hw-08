import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import * as Yup from "yup";

import { editContact } from "../../redux/contacts/operations";
import { changeFilter } from "../../redux/filters/slice";
import { setEditingItem, setIsEdit } from "../../redux/contacts/slice";
import {
  selectContacts,
  selectEditingItem,
} from "../../redux/contacts/selectors";

const toastParams = {
  position: "bottom-right",
  duration: "500",
  style: {
    textAlign: "left",
    background: "rgba(200, 200, 200)",
    border: "1px solid black",
    boxShadow: "3px 3px 5px rgb(33, 33, 33)",
  },
};

const phoneRegExp = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;

const contactValidationSchema = Yup.object().shape({
  name: Yup.string().max(50, "To long!"),
  number: Yup.string().matches(phoneRegExp, "Format 'xxx-xxx-xxxx'"),
});

const EditContactForm = () => {
  const dispatch = useDispatch();
  const editingItem = useSelector(selectEditingItem);
  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, actions) => {
    const newData = {
      id: editingItem.id,
      name: values.name,
      number: values.number,
    };

    if (!newData.name & !newData.number) {
      dispatch(setEditingItem({}));
      dispatch(setIsEdit(false));
      return;
    }

    const match = contacts.find(
      (contact) =>
        (contact.number === newData.number) & (contact.id !== newData.id)
    );

    if (!match) {
      dispatch(editContact(newData));
      actions.resetForm();
    } else {
      toast.error(
        `A contact "${match.name.toUpperCase()}"\nalready contain phone number\n"${
          newData.number
        }"`,
        toastParams
      );
      dispatch(setIsEdit(false));
      dispatch(setEditingItem({}));
      dispatch(changeFilter(match.name));
      setTimeout(() => dispatch(changeFilter("")), 5000);
      actions.resetForm();
    }
  };

  const initialValues = {
    name: editingItem.name,
    number: editingItem.number,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={contactValidationSchema}
    >
      <Form className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend text-xl">Edit contact</legend>

        <label className="fieldset-label">Edit name</label>
        <Field
          type="text"
          name="name"
          className="input border-fuchsia-400 hover:outline-fuchsia-400 focus:outline-fuchsia-400"
          placeholder="Name"
        />
        <ErrorMessage className="text-gray-500" name="name" component="span" />

        <label className="fieldset-label">Edit number</label>
        <Field
          type="text"
          className="input border-fuchsia-400 hover:outline-fuchsia-400 focus:outline-fuchsia-40"
          name="number"
          placeholder="Number"
        />
        <ErrorMessage
          className="text-gray-500"
          name="number"
          component="span"
        />

        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              dispatch(setIsEdit(false));
              dispatch(setEditingItem({}));
            }}
            type="button"
            className="btn btn-secondary mt-4"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-secondary mt-4">
            Edit contact
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default EditContactForm;
