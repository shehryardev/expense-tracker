import React from "react";
import { Formik, Form } from "formik";
import FormikField from "../../components/common/FormikField"; // Ensure this path is correct
import CategorySearch from "../../components/common/CategorySearch";
import axios from "axios";
import PrimaryButton from "../../components/common/PrimaryButton";

// Define initial values for the form fields
const initialValues = {
  description: "",
  amount: "",
  date: "",
  categoryFkId: "",
};

// Custom validation function
const validate = (values) => {
  const errors = {};
  if (!values.description) errors.description = "Description is required";
  if (!values.amount) errors.amount = "Amount is required";
  else if (isNaN(values.amount) || Number(values.amount) <= 0)
    errors.amount = "Amount must be a positive number";
  if (!values.date) errors.date = "Date is required";
  if (!values.categoryFkId) errors.categoryFkId = "Category ID is required";
  return errors;
};

const AddTransaction = () => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/expenses",
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      console.log("Form Submitted:", response.data);
      resetForm();
    } catch (error) {
      console.error("Form submission error:", error);
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <FormikField
            name="description"
            type="text"
            placeholder="Description"
          />
          <FormikField name="amount" type="number" placeholder="Amount" />
          <FormikField name="date" type="date" placeholder="Date" />
          <CategorySearch
            onSelect={(category) => {
              setFieldValue("categoryFkId", category.id);
            }}
          />
          <br />
          <PrimaryButton type="submit" disabled={isSubmitting}>
            Add
          </PrimaryButton>
        </Form>
      )}
    </Formik>
  );
};

export default AddTransaction;
