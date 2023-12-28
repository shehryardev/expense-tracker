import React from "react";
import { Field, ErrorMessage } from "formik";

const FormikField = ({ name, type, placeholder }) => (
  <>
    <Field
      name={name}
      type={type}
      placeholder={placeholder}
      className="bg-white border  rounded-xl py-2 px-4 block w-full   outline-none"
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-sm text-red-600 mt-1"
    />
    <br />
  </>
);

export default FormikField;
