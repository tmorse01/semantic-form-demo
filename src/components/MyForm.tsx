import ReusableForm from "./ReusableForm";
import { FormValues, FormField } from "../types";

const MyForm: React.FC = () => {
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
