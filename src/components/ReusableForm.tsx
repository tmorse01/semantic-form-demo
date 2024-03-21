// ReusableForm.tsx
import React, { useEffect } from "react";
import { Form, Button } from "semantic-ui-react";
import useForm from "../hooks/useForm";
import { ReusableFormProps } from "../types";
import ReusableFormField from "./ReusableFormField";

const ReusableForm: React.FC<ReusableFormProps> = ({
  onSubmit,
  fields,
  initialValues,
  children,
  formControl,
}) => {
  const {
    values,
    errors,
    handleChange,
    setFieldValue,
    resetForm,
    handleSubmit,
  } = useForm({
    initialValues,
    fields,
  });

  useEffect(() => {
    // If formControl (a ref) is provided, assign formMethods to its current value
    if (formControl) {
      formControl.current = {
        values,
        errors,
        handleChange,
        setFieldValue,
        resetForm,
        handleSubmit,
      };
    }
  }, [
    values,
    errors,
    handleChange,
    setFieldValue,
    resetForm,
    handleSubmit,
    formControl,
  ]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field) => (
        <ReusableFormField
          key={field.name}
          field={field}
          value={values[field.name]}
          error={errors[field.name]}
          handleChange={handleChange}
        />
      ))}
      {/* Add custom form components or other children here */}
      {children}
      <Button primary type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ReusableForm;
