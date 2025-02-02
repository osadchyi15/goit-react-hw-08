import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import { selectContacts } from "../../redux/contacts/selectors";
import toast from "react-hot-toast";
import { changeFilter } from "../../redux/filters/slice";

const initialValues = {
  name: "",
  number: "",
};

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
  name: Yup.string().required("Required!").max(50, "To long!"),
  number: Yup.string()
    .matches(phoneRegExp, "Format 'xxx-xxx-xxxx'. Numbers and dashs.")
    .required("Required!"),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, actions) => {
    const newContact = {
      name: values.name,
      number: values.number,
    };

    if (newContact.name.trim().length === 0)
      return toast.error(
        "The first and last name field\ncannot be empty",
        toastParams
      );

    const match = contacts.find(
      (contact) => contact.number === newContact.number
    );

    if (!match) {
      dispatch(addContact(newContact));
      actions.resetForm();
    } else {
      toast.error(
        `A contact "${match.name.toUpperCase()}"\nalready contain phone number\n"${
          newContact.number
        }"`,
        toastParams
      );
      dispatch(changeFilter(match.name));
      setTimeout(() => dispatch(changeFilter("")), 5000);
      actions.resetForm();
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={contactValidationSchema}
    >
      <Form className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend text-xl">Add contact</legend>

        <label className="fieldset-label">Name</label>
        <Field
          type="text"
          name="name"
          className="input border-teal-400 hover:outline-teal-400 focus:outline-teal-400"
          placeholder="Name"
        />
        <ErrorMessage className="text-gray-500" name="name" component="span" />

        <label className="fieldset-label">Number</label>
        <Field
          type="text"
          className="input border-teal-400 hover:outline-teal-400 focus:outline-teal-400"
          name="number"
          placeholder="Number"
        />
        <ErrorMessage
          className="text-gray-500"
          name="number"
          component="span"
        />

        <button type="submit" className="btn btn-primary mt-4">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
