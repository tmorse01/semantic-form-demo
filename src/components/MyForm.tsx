import ReusableForm from "./ReusableForm";
import { FormValues, FormField } from "../types";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for demonstration

const MyForm: React.FC = () => {
  const fields: FormField[] = [
    { 
      name: 'username', 
      label: 'Username', 
      type: 'text',
      validate: (value: any) => {
        if (!value) return 'Username is required';
        if (value.length < 3) return 'Username must be at least 3 characters long';
        return undefined;
      }
    },
    { 
      name: 'email', 
      label: 'Email', 
      type: 'email',
      validate: (value: any) => {
        if (!value) return 'Email is required';
        if (!emailRegex.test(value)) return 'Email is invalid';
        return undefined;
      }
    },
    { 
      name: 'password', 
      label: 'Password', 
      type: 'password',
      validate: (value: any) => {
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters long';
        return undefined;
      }
    },
    { 
      name: 'confirmPassword', 
      label: 'Confirm Password', 
      type: 'password',
      validate: (value: any, formValues: { [key: string]: any }) => {
        if (!value) return 'Confirming password is required';
        if (value !== formValues.password) return 'Passwords do not match';
        return undefined;
      }
    },
    { 
      name: 'age', 
      label: 'Age', 
      type: 'number',
      validate: (value: any) => {
        if (!value) return 'Age is required';
        if (isNaN(value)) return 'Age must be a number';
        if (value < 18) return 'You must be at least 18 years old';
        return undefined;
      }
    },
    { 
      name: 'bio', 
      label: 'Bio', 
      type: 'textarea',
      validate: (value: any) => {
        if (!value) return 'Bio is required';
        if (value.length > 500) return 'Bio cannot exceed 500 characters';
        return undefined;
      }
    },
  ];

  const handleSubmit = (values: FormValues) => {
    console.log("handleSubmit", values); // Process form values here
  };

  return (
    <ReusableForm
      onSubmit={handleSubmit}
      fields={fields}
      initialValues={{ username: "", email: "" }}
    >
      <div>Insert custom form components or other children here</div>
    </ReusableForm>
  );
};

export default MyForm;
