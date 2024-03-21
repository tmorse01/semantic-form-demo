// useForm.ts
import { useState } from "react";
import { FormValues, FormField } from "../types";

interface UseFormParams {
  initialValues: FormValues;
  fields: FormField[]; // Add this to perform validation based on fields
}

const useForm = ({ initialValues, fields }: UseFormParams) => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormValues>({});

  const validateField = (name: string, value: any): string | undefined => {
    const field = fields.find((f) => f.name === name);
    return field && field.validate ? field.validate(value, values) : undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: FormValues = {};
    let isValid = true;

    fields.forEach((field) => {
      const error = validateField(field.name, values[field.name]);
      if (error) {
        isValid = false;
        newErrors[field.name] = error;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    { name, value }: any
  ) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    // Optionally validate on change
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validateField(name, value),
      }));
    }
  };

  const setFieldValue = (name: string, value: any) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const resetForm = (newValues = initialValues) => {
    setValues(newValues);
    setErrors({});
  };

  const handleSubmit =
    (callback: (values: FormValues) => void) => (event?: React.FormEvent) => {
      event?.preventDefault();
      if (validateForm()) {
        callback(values);
      }
    };

  return {
    values,
    errors,
    handleChange,
    setFieldValue,
    resetForm,
    handleSubmit,
  };
};

export default useForm;
