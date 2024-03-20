import React from "react";
import {
  Form,
  Input,
  TextArea,
  Checkbox,
  Select,
  FormFieldProps as SemanticFormFieldProps,
  Message,
} from "semantic-ui-react";

// Define the types for the specific properties our form fields will accept
interface FieldProps extends SemanticFormFieldProps {
  id: string;
  type: string;
  // Add any other specific properties for different types if needed
}

// Extending Semantic UI's FormFieldProps for full compatibility
interface CustomFormFieldProps {
  field: FieldProps;
  value: any;
  formValues: Record<string, any>;
  error: string | boolean | undefined;
  onChange: (id: string, value: any) => void;
  isHidden: (field: FieldProps, value: any) => boolean;
}

const CustomFormField: React.FC<CustomFormFieldProps> = ({
  field,
  value,
  formValues,
  error,
  onChange,
  isHidden,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, data: any) => {
    // 'data.value' for Semantic UI components, 'e.target.value' for standard inputs
    onChange(field.id, data?.value || e.target.value);
  };

  const renderField = () => {
    switch (field.type) {
      case "text":
      case "email":
      case "password":
      case "tel":
        return (
          <Input type={field.type} value={value} onChange={handleChange} />
        );
      case "textarea":
        return <TextArea {...props} value={value} onChange={handleChange} />;
      case "checkbox":
        return (
          <Checkbox
            checked={value}
            onChange={(e, data) => onChange(field.id, data.checked)}
          />
        );
      case "select":
        return (
          <Select
            value={value}
            options={field.options}
            onChange={handleChange}
          />
        );
      // Add other cases for different types if needed
      default:
        return null; // Type not supported
    }
  };

  return (
    <Form.Field
      id={field.id}
      error={error ? error : false}
      hidden={field.isHidden ? !field.isHidden(formValues) : false}
    >
      <label htmlFor={field.id}>{field.label}</label>
      {renderField()}
      {error && <Message color="red">{error}</Message>}
    </Form.Field>
  );
};

export default CustomFormField;
