import ReusableForm from "./ReusableForm";
import { FormValues, FormField, FormControls } from "../types";
import { useRef } from "react";

const MyFormWithRef: React.FC = () => {
  const formControlRef = useRef<FormControls>(null);

  const fields: FormField[] = [
    { name: "username", label: "Username" },
    { name: "email", label: "Email", type: "email" },
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
      <button onClick={updateFormValue}>Update Username</button>
    </ReusableForm>
  );
};

export default MyFormWithRef;
