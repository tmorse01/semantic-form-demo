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
  const formMethods = useForm(initialValues);

  useEffect(() => {
    // If formControl (a ref) is provided, assign formMethods to its current value
    if (formControl) {
      formControl.current = formMethods;
    }
  }, [formMethods, formControl]);

  return (
    <Form onSubmit={formMethods.handleSubmit(onSubmit)}>
      {fields.map((field) => (
        <ReusableFormField
          key={field.name}
          field={field}
          value={formMethods.values[field.name]}
          handleChange={formMethods.handleChange}
        />
      ))}
      {/* Add custom form components or other children here */}
      {children}
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default ReusableForm;
