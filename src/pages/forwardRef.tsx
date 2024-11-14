import React, { useImperativeHandle, forwardRef, Ref } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

// Define the type for the form field
interface FormField {
  name: string;
  label: string;
  type: string;
}

// Define the props for DynamicForm
interface DynamicFormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => void;
}

// Define the type for the ref
export interface DynamicFormRef {
  submitForm: () => void;
}

const DynamicForm = forwardRef<DynamicFormRef, DynamicFormProps>(
  ({ fields, onSubmit }, ref) => {
    const { handleSubmit, control } = useForm();

    // Expose the submit function to the parent using ref
    useImperativeHandle(ref, () => ({
      submitForm: () => {
        handleSubmit(onSubmit)();
      },
    }));

    return (
      <form>
        {fields.map((field, index) => (
          <Controller
            key={index}
            name={field.name}
            control={control}
            defaultValue=""
            render={({ field: inputProps }) => (
              <TextField
                {...inputProps}
                label={field.label}
                type={field.type}
                fullWidth
                margin="normal"
              />
            )}
          />
        ))}
      </form>
    );
  }
);

export default DynamicForm;
