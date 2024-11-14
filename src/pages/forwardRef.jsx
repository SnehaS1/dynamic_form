import React, {
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

const ParentComponent = () => {
  const formSubmitRef = useRef();
  const [formData, setFormData] = useState(null);

  const handleSubmit = (data) => {
    setFormData(data); // Store the submitted form data in the state or handle it as needed
    console.log("Form data from child:", data);
  };

  const formFields = [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
  ];

  return (
    <div>
      <DynamicForm
        ref={formSubmitRef}
        fields={formFields}
        onSubmit={handleSubmit}
      />
      <button onClick={() => formSubmitRef.current?.submitForm()}>
        Submit Form
      </button>
    </div>
  );
};

export default ParentComponent;

const DynamicForm = forwardRef(({ fields, onSubmit }, ref) => {
  const { handleSubmit, control } = useForm();

  // Expose the submit function to the parent using ref
  useImperativeHandle(ref, () => ({
    submitForm: () => {
      handleSubmit(onSubmit)();
    },
  }));

  return (
    <form>
      {fields.length}
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
});
