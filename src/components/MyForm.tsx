import ReusableForm from "./ReusableForm";
import { FormValues, FormField } from "../types";

const MyForm: React.FC = () => {
  const fields: FormField[] = [
    { name: "username", label: "Username" },
    { name: "email", label: "Email", type: "email" },
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
