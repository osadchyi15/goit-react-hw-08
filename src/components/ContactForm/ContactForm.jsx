import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./ContactForm.module.css";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import { selectContacts } from "../../redux/contacts/selectors";
import toast from "react-hot-toast";

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
  name: Yup.string()
    .required("Required!")
    .min(3, "To short!")
    .max(50, "To long!"),
  number: Yup.string()
    .min(1, "To short!")
    .matches(phoneRegExp, "Format 'xxx-xxx-xxxx'")
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
      actions.resetForm();
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={contactValidationSchema}
    >
      {() => {
        return (
          <Form className={css.contactForm}>
            <div className={css.labels}>
              <label className={css.contactFormLabel}>
                <span className={css.contactFormTitle}>New contact data</span>
                <Field
                  className={css.contactFormInput}
                  placeholder="Name Surname"
                  name="name"
                />
                <ErrorMessage
                  className={css.errorText}
                  name="name"
                  component="span"
                />
              </label>

              <label className={css.contactFormLabel}>
                <span className={css.contactFormTitle}>Phone number</span>

                <Field
                  className={css.contactFormInput}
                  placeholder="xxx-xxx-xxxx"
                  name="number"
                />
                <ErrorMessage
                  className={css.errorText}
                  name="number"
                  component="span"
                />
              </label>
            </div>
            <button type="submit" className={css.ContactFormSubmitButton}>
              Add contact
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ContactForm;
