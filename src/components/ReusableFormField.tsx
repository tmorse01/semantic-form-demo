// ReusableFormField.tsx
import React from "react";
import { Form } from "semantic-ui-react";
import { FormField as IFormField } from "../types";

const ReusableFormField: React.FC<{
  field: IFormField;
  value: any;
  error?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>, data: any) => void;
}> = ({ field, value, error, handleChange }) => {
  const renderField = () => {
    switch (field.type) {
      case "text":
      case "email":
      case "password":
        return <Form.Input {...field} value={value} onChange={handleChange} />;
      case "select":
        return (
          <Form.Select
            {...field}
            options={field.options}
            value={value}
            onChange={handleChange}
          />
        );
      case "textarea":
        return (
          <Form.TextArea {...field} value={value} onChange={handleChange} />
        );
      // Add more cases for other types
      default:
        return <Form.Input {...field} value={value} onChange={handleChange} />;
    }
  };

  return (
    <Form.Field error={!!error}>
      {renderField()}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </Form.Field>
  );
};

export default ReusableFormField;
