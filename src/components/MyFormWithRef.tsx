import ReusableForm from "./ReusableForm";
import { FormValues, FormField, FormControls } from "../types";
import { useRef } from "react";
import { Button } from "semantic-ui-react";

const MyFormWithRef: React.FC = () => {
  const formControlRef = useRef<FormControls>(null);

  const fields: FormField[] = [
    {
      name: "username",
      label: "Username",
      type: "text",
      validate: (value) => {
        if (!value) return "Username is required";
        if (value.length < 5) return "Username must be at least 5 characters";
        return undefined;
      },
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      validate: (value) => {
        if (!value) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(value)) return "Email is invalid";
        return undefined;
      },
    },
    // Add more fields as needed
  ];

  const handleSubmit = (values: FormValues) => {
    console.log(values); // Process form values here
  };

  const updateFormValue = () => {
    if (formControlRef.current) {
      const randomUsername = Math.random().toString(36).substring(7);
      const randomEmail = `${randomUsername}@example.com`;
      formControlRef.current.setFieldValue("username", randomUsername);
      formControlRef.current.setFieldValue("email", randomEmail);
    }
  };

  return (
    <ReusableForm
      formControl={formControlRef}
      onSubmit={handleSubmit}
      fields={fields}
      initialValues={{ username: "", email: "" }}
    >
      <div>Insert custom form components or other children here</div>
      <Button type="button" onClick={updateFormValue}>
        Update Username
      </Button>
      <Button
        type="reset"
        secondary
        onClick={() => formControlRef.current?.resetForm()}
      >
        Reset Form
      </Button>
    </ReusableForm>
  );
};

export default MyFormWithRef;
