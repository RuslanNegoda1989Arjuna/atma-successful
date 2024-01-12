import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import styles from './registerForm.module.scss';

const validationSchema = yup.object().shape({
  name: yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(11, 'Name must be at most 11 characters')
    .required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must contain at least one letter and one number')
    .required('Password is required'),
});

const RegisterForm = ({ title, handleSubmit }) => {
    const onSubmit = async (values, { resetForm }) => {
      console.log(values)
    await handleSubmit(values);
          resetForm();
  };

  return (
    <div className={styles.mainFormBox}>
      <h2 className={styles.title}>{title}</h2>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form className={styles.formBox}>
            <div className={styles.fieldWrapper}>
              <Field className={styles.field} id="name" name="name" placeholder="Name" />
              {errors.name && touched.name ? (
                <div className={styles.error}>{errors.name}</div>
              ) : null}
            </div>
            <div className={styles.fieldWrapper}>
              <Field className={styles.field} id="email" name="email" placeholder="Email" />
              {errors.email && touched.email ? (
                <div className={styles.error}>{errors.email}</div>
              ) : null}
            </div>
            <div className={styles.fieldWrapper}>
              <Field className={styles.field} id="password" name="password" placeholder="Password" />
              {errors.password && touched.password ? (
                <div className={styles.error}>{errors.password}</div>
              ) : null}
            </div>
            <button className={styles.submitBtn} type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
