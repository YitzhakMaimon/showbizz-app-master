import * as Yup from "yup";

export const password = Yup.string()
  .min(8, "Too Short!")
  .max(50, "Too Long!")
  .required("Required");

export const passwordConfirm = (passwordConfirmFieldName) =>
  password.oneOf(
    [Yup.ref(passwordConfirmFieldName), null],
    "Passwords must match"
  );

export const email = Yup.string().email("Invalid email").required("Required");
export const name = Yup.string().required("Required");
export const address = Yup.string().required("Required");
export const phone_number = Yup.string().required("Required");

export const custom_categories = Yup.array()
  .min(1, "Min 1")
  .required("Required");

export const custom_role = Yup.string().required("Required");
export const custom_age = Yup.number().required("Required");
export const custom_height = Yup.string().required("Required");
export const location = Yup.string().required("Required");
export const salary = Yup.number().required("Required");
export const project = Yup.string().required("Required");
export const production = Yup.string().required("Required");
export const description = Yup.string().max(2048).required("Required");

export const mailResetPasswordCode = Yup.number().min(5);
export const gender = Yup.string().required("Required");
export const picture = Yup.string().required("Required");
