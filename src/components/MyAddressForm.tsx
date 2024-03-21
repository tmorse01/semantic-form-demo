import ReusableForm from "./ReusableForm";
import { FormValues, FormField, FormControls } from "../types";
import { useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionTitle,
  Icon,
  Checkbox,
  Form,
  AccordionTitleProps,
} from "semantic-ui-react";
import ReusableFormField from "./ReusableFormField";
import useForm from "../hooks/useForm";

const initialValues: FormValues = {
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [sameAsPhysical, setSameAsPhysical] = useState(false);

  const { values, errors, handleChange, setFormValues } = useForm({initialValues});


  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, data: AccordionTitleProps) => {
    const { index } = data;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const handleSameAddressChange = (e: React.FormEvent, data: any) => {
    setSameAsPhysical(data.checked);
    // console.log("handleSameAddressChange", values, data.checked)
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
    } else {
      const newValues = {
        ...values,
        mailingAddress: "",
        mailingCity: "",
        mailingState: "",
        mailingZip: "",
      };
     setFormValues(newValues);
    }
  };

  const physicalAddressFields: FormField[] = [
    { name: "physicalAddress", label: "Physical Address", type: "text" },
    { name: "physicalCity", label: "City", type: "text" },
    { name: "physicalState", label: "State", type: "text" },
    { name: "physicalZip", label: "ZIP Code", type: "text" },
  ];

  const mailingAddressFields: FormField[] = [
    { name: "mailingAddress", label: "Mailing Address", type: "text" },
    { name: "mailingCity", label: "City", type: "text" },
    { name: "mailingState", label: "State", type: "text" },
    { name: "mailingZip", label: "ZIP Code", type: "text" },
  ];

  const onSubmit = (values: FormValues) => {
    console.log(values); // Process form values here
  };

  return (
    <ReusableForm
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      <Accordion>
        <AccordionTitle
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          Physical Address Form
        </AccordionTitle>
        <AccordionContent active={activeIndex === 0}>
          {physicalAddressFields.map((field) => (
            <ReusableFormField
              key={field.name}
              field={field}
              value={values[field.name]}
              handleChange={handleChange}
            />
          ))}
        </AccordionContent>
        <AccordionTitle
          active={activeIndex === 1}
          index={1}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          Mailing Address Form
        </AccordionTitle>
        <AccordionContent active={activeIndex === 1}>
          <Form.Field>
            <Checkbox
              label="Mailing address same as physical address"
              checked={sameAsPhysical}
              onChange={handleSameAddressChange}
            />
          </Form.Field>
          {mailingAddressFields.map((field) => (
            <ReusableFormField
              key={field.name}
              field={field}
              value={values[field.name]}
              handleChange={handleChange}
            />
          ))}
        </AccordionContent>
      </Accordion>
    </ReusableForm>
  );
};

export default MyAddressForm;
