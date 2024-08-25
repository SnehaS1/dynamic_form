import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// interface FieldProps {
//   id: string;
//   label?: string;
//   formType: 'input' | 'select' | 'email' | 'radio' | 'checkbox';
//   required?: boolean;
//   minLength?: number;
//   maxLength?: number;
//   pattern?: string;
//   values?: string[];  // for select, radio, and checkbox fields
// }

// interface DynamicFormProps {
//   fields: FieldProps[];
//   onSubmit: (values: any) => void;
// }

const DynamicForm = ({ fields, onSubmit }) => {
  // Building Yup validation schema dynamically
  const validationSchema = Yup.object(
    fields.reduce((schema, field) => {
      let validator = Yup.string();

      if (field.required) {
        validator = validator.required(
          `${field.label || field.id} is required`
        );
      }
      if (field.minLength) {
        validator = validator.min(
          field.minLength,
          `Minimum length is ${field.minLength}`
        );
      }
      if (field.maxLength) {
        validator = validator.max(
          field.maxLength,
          `Maximum length is ${field.maxLength}`
        );
      }
      if (field.pattern) {
        validator = validator.matches(
          new RegExp(field.pattern),
          `${field.label || field.id} does not match the pattern`
        );
      }

      if (field.formType === "email") {
        validator = validator.email("Invalid email address");
      }

      return { ...schema, [field.id]: validator };
    }, {})
  );

  // React Hook Form setup
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "grid",

        gridTemplateColumns: { sm: "1fr", md: "repeat(2, 1fr)" },
        gap: "1rem",
      }}
    >
      {/* <div style={{display: 'flex'}}> */}
      {fields.map((field) => (
        <div
          key={field.id}
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "1rem",
          }}
        >
          <label htmlFor={field.id}>{field.label || field.id}</label>

          <Controller
            name={field.id}
            control={control}
            render={({ field: controllerField }) => {
              switch (field.formType) {
                case "input":
                case "email":
                  return (
                    <input
                      {...controllerField}
                      type={field.formType === "email" ? "email" : "text"}
                      style={{ padding: "0.5rem" }}
                    />
                  );
                case "select":
                  return (
                    <select {...controllerField} style={{ padding: "0.5rem" }}>
                      <option value="">Select {field.label || field.id}</option>
                      {field.values?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  );
                case "radio":
                  return (
                    <div>
                      {field.values?.map((option) => (
                        <label key={option} style={{ marginRight: "1rem" }}>
                          <input
                            {...controllerField}
                            type="radio"
                            value={option}
                            checked={controllerField.value === option}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  );
                case "checkbox":
                  return (
                    <div>
                      {field.values?.map((option) => (
                        <label key={option} style={{ marginRight: "1rem" }}>
                          <input
                            type="checkbox"
                            value={option}
                            checked={controllerField.value?.includes(option)}
                            onChange={(e) => {
                              const newValue = e.target.checked
                                ? [...(controllerField.value || []), option]
                                : (controllerField.value || []).filter(
                                    (item) => item !== option
                                  );
                              controllerField.onChange(newValue);
                            }}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  );
                default:
                  return null;
              }
            }}
          />
          {errors[field.id] && (
            <div style={{ color: "red" }}>
              {errors[field.id]?.message || "This field is required"}
            </div>
          )}
        </div>
      ))}
      {/* </div> */}
      <button
        type="submit"
        style={{
          gridColumn: "span 2",
          padding: "0.75rem",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "0.25rem",
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default DynamicForm;
