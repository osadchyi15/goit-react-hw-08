import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./ContactForm.module.css";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";

const initialValues = {
  name: "",
  number: "",
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

  const handleSubmit = (values, actions) => {
    const newContact = {
      name: values.name,
      number: values.number,
    };
    dispatch(addContact(newContact));
    actions.resetForm();
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
            <label className={css.contactFormLabel}>
              <span className={css.contactFormTitle}>Name</span>

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
              <span className={css.contactFormTitle}>Number</span>

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
