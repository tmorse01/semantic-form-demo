/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";

interface FormField {
  id: string;
  label: string;
  type: string;
  rules?: { required?: boolean; pattern?: RegExp; message?: string };
  shouldDisplay?: (formValues: Record<string, any>) => boolean;
}

const MyForm = () => {
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const fields: FormField[] = [
    {
      id: "name",
      label: "Name",
      type: "text",
      rules: { required: true, message: "Name is required" },
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      rules: {
        required: true,
        pattern: /^\S+@\S+\.\S+$/,
        message: "Invalid email",
      },
    },
    // Add other fields here
  ];

  const handleChange = (id: string, value: any) => {
    setFormValues({ ...formValues, [id]: value });
    // Optionally clear errors
    setFormErrors({ ...formErrors, [id]: "" });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const errors: Record<string, string> = {};
    fields.forEach((field) => {
      if (field.rules?.required && !formValues[field.id]) {
        errors[field.id] = field.rules.message || "This field is required";
      } else if (
        field.rules?.pattern &&
        !field.rules.pattern.test(formValues[field.id])
      ) {
        errors[field.id] = field.rules.message || "This field is invalid";
      }
    });
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      // Form is valid
      console.log("Form Data:", formValues);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <Form.Field key={field.id} hidden={!field.shouldDisplay?.(formValues)}>
          <label>{field.label}</label>
          <Input
            type={field.type}
            value={formValues[field.id] || ""}
            onChange={(_, data) => handleChange(field.id, data.value)}
            error={formErrors[field.id] ? true : undefined}
          />
          {formErrors[field.id] && (
            <Message color="red">{formErrors[field.id]}</Message>
          )}
        </Form.Field>
      ))}
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default MyForm;
