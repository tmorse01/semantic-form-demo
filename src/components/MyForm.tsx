/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Form, Button, Input, Checkbox, Message } from "semantic-ui-react";

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
    {
      id: "password",
      label: "Password",
      type: "password",
      rules: {
        required: true,
        pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        message:
          "Password must contain at least 8 characters, including uppercase, lowercase letters, and numbers.",
      },
    },
    {
      id: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      rules: { required: true, message: "Please confirm your password" },
      shouldDisplay: (formValues) => formValues["password"],
    },
    {
      id: "phoneNumber",
      label: "Phone Number",
      type: "tel",
      rules: { pattern: /^\d{10}$/, message: "Invalid phone number" },
    },
    {
      id: "terms",
      label: "I agree to the terms and conditions",
      type: "checkbox",
      rules: {
        required: true,
        message: "You must agree to the terms and conditions",
      },
    },
    // Add other fields with complex rules here
    {
      id: "subscription",
      label: "Subscribe to newsletter",
      type: "checkbox",
      shouldDisplay: (formValues) => formValues["email"],
    },
    // Fields dependent on subscription status
    {
      id: "frequency",
      label: "Newsletter frequency",
      type: "text",
      shouldDisplay: (formValues) => formValues["subscription"],
    },
    {
      id: "interests",
      label: "Interests (comma-separated)",
      type: "text",
      shouldDisplay: (formValues) => formValues["subscription"],
    },
  ];

  const handleChange = (id: string, value: any) => {
    setFormValues({ ...formValues, [id]: value });
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
      // Check password confirmation
      if (
        field.id === "confirmPassword" &&
        formValues["password"] !== formValues["confirmPassword"]
      ) {
        errors["confirmPassword"] = "Passwords do not match";
      }
    });
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      console.log("Form Data:", formValues);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <Form.Field
          key={field.id}
          hidden={
            field.shouldDisplay ? !field.shouldDisplay(formValues) : false
          }
        >
          <label>{field.label}</label>
          {field.type !== "checkbox" ? (
            <Input
              type={field.type}
              value={formValues[field.id] || ""}
              onChange={(_, data) => handleChange(field.id, data.value)}
              error={formErrors[field.id] ? true : undefined}
            />
          ) : (
            <Checkbox
              label={field.label}
              checked={!!formValues[field.id]}
              onChange={(_, data) => handleChange(field.id, data.checked)}
            />
          )}
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
