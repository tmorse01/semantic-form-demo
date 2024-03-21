// useForm.ts
import { useState } from "react";
import { FormValues } from "../types";

const useForm = (initialValues: FormValues) => {
  const [values, setValues] = useState<FormValues>(initialValues);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    { name, value }: any
  ) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const setFieldValue = (name: string, value: any) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const resetForm = (newValues = initialValues) => {
    setValues(newValues);
  };

  const handleSubmit =
    (callback: (values: FormValues) => void) => (event?: React.FormEvent) => {
      event?.preventDefault();
      callback(values);
    };

  return { values, handleChange, setFieldValue, resetForm, handleSubmit };
};

export default useForm;
