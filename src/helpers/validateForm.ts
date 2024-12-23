import { FormikValues } from "formik";

export const validateForm = (
  input: FormikValues
): Partial<FormikValues> => {
  const errors: Partial<FormikValues> = {};

  if (!input.task) {
    errors.task = "La tarea es requerida";
  }

  return errors;
};
