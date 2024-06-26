// types.ts
export interface FormField {
  name: string;
  label: string;
  type?: string;
  options?: { key: string; text: string; value: any }[];
  validate?: (value: any, formValues: FormValues) => string | undefined; // Returns an error message if validation fails, otherwise undefined
  onChange?: (e: React.FormEvent, data: any) => void;
}
export interface FormValues {
  [key: string]: any;
}

export interface ReusableFormProps {
  onSubmit: (values: FormValues) => void;
  fields?: FormField[];
  initialValues: FormValues;
  children?: React.ReactNode;
  formControl?: React.RefObject<FormControls>;
}

export interface FormControls {
  values: FormValues;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>, { name, value }: any) => void;
  setFieldValue: (name: string, value: any) => void;
  setFormValues: (newValues: FormValues) => void;
  resetForm: (newValues?: FormValues) => void;
  handleSubmit: (
    callback: (values: FormValues) => void
  ) => (event?: React.FormEvent) => void;
}
