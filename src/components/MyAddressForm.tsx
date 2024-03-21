import ReusableForm from "./ReusableForm";
import { FormValues, FormField, FormControls } from "../types";
import { ChangeEvent, useRef, useState } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import useForm from "../hooks/useForm";
import ReusableFormField from "./ReusableFormField";

const initialValues = {
  physicalAddress: "",
  physicalCity: "",
  physicalState: "",
  physicalZip: "",
  mailingAddress: "",
  mailingCity: "",
  mailingState: "",
  mailingZip: "",
};

const MyAddressForm: React.FC = () => {
  const [sameAsPhysical, setSameAsPhysical] = useState(false);
  const formControlRef = useRef<FormControls>(null);

  const addressFields: FormField[] = [
    { name: "physicalAddress", label: "Physical Address", type: "text" },
    { name: "physicalCity", label: "City", type: "text" },
    { name: "physicalState", label: "State", type: "text" },
    { name: "physicalZip", label: "ZIP Code", type: "text" },
    { name: "mailingAddress", label: "Mailing Address", type: "text" },
    { name: "mailingCity", label: "City", type: "text" },
    { name: "mailingState", label: "State", type: "text" },
    { name: "mailingZip", label: "ZIP Code", type: "text" },
  ];

  const onSubmit = (values: FormValues) => {
    console.log(values); // Process form values here
  };

  const handleSameAddressChange = (e: React.FormEvent, data: any) => {
    setSameAsPhysical(data.checked)
    const values = formControlRef.current?.values ?? {};
    if (data.checked) {
      // Copy physical address fields to mailing address fields
      const newValues = {
        ...values,
        mailingAddress: values.physicalAddress,
        mailingCity: values.physicalCity,
        mailingState: values.physicalState,
        mailingZip: values.physicalZip,
      };
      formControlRef.current?.setFormValues(newValues);
    } else {
      const newValues = {
        ...values,
        mailingAddress: "",
        mailingCity: "",
        mailingState: "",
        mailingZip: "",
      };
      formControlRef.current?.setFormValues(newValues);
    }
  };

  return (
    <ReusableForm
      formControl={formControlRef}
      fields={addressFields}
      onSubmit={() => formControlRef.current?.handleSubmit(onSubmit)}
      initialValues={initialValues}
    >
      <Form.Field>
        <Checkbox
          label="My mailing address is the same as my physical address"
          onChange={handleSameAddressChange}
          checked={sameAsPhysical}
        />
      </Form.Field>
      <Button type="submit">Submit</Button>
    </ReusableForm>
  );
};

export default MyAddressForm;
