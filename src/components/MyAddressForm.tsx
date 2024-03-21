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

  const { values, errors, handleChange, handleSubmit, setFormValues } = useForm({
    initialValues,
    fields: addressFields,
  });

  const onSubmit = (values: FormValues) => {
    console.log(values); // Process form values here
  };

  const handleSameAddressChange = (e: React.FormEvent, data: any) => {
    setSameAsPhysical(data.checked);
    console.log("handleSameAddressChange", data.checked);
    if (data.checked) {
      // Copy physical address fields to mailing address fields
      const newValues = {
        ...values,
        mailingAddress: values.physicalAddress,
        mailingCity: values.physicalCity,
        mailingState: values.physicalState,
        mailingZip: values.physicalZip,
      };
      setFormValues(newValues);
    }
  };

  return (
    <ReusableForm
      formControl={formControlRef}
      onSubmit={() => handleSubmit(onSubmit)}
      initialValues={initialValues}
    >
      {addressFields.map((field) => (
        <ReusableFormField
          field={field}
          value={values[field.name]}
          error={errors[field.name]}
          handleChange={handleChange}
        />
      ))}
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
