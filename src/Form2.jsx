import React, { useState } from "react";
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

const DynamicForm2 = ({ fields, onSubmit }) => {
  const [areFieldsDisabled, setAreFieldsDisabled] = useState(false);
  const [isAnyFieldFilled, setIsAnyFieldFilled] = useState(false);

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
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleFieldChange = () => {
    const filledFieldExists = fields.some((field) => watch(field.id));
    setIsAnyFieldFilled(filledFieldExists);
    setAreFieldsDisabled(filledFieldExists);
  };

  const handleFormSubmit = (data) => {
    setAreFieldsDisabled(true);
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="dynamic-form">
      {fields.map((field) => (
        <div key={field.id} className="form-field">
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
                      disabled={areFieldsDisabled && !controllerField.value}
                      onChange={(e) => {
                        controllerField.onChange(e);
                        handleFieldChange();
                      }}
                    />
                  );
                case "select":
                  return (
                    <select
                      {...controllerField}
                      disabled={areFieldsDisabled && !controllerField.value}
                      onChange={(e) => {
                        controllerField.onChange(e);
                        handleFieldChange();
                      }}
                    >
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
                        <label key={option}>
                          <input
                            {...controllerField}
                            type="radio"
                            value={option}
                            disabled={
                              areFieldsDisabled && !controllerField.value
                            }
                            checked={controllerField.value === option}
                            onChange={(e) => {
                              controllerField.onChange(e);
                              handleFieldChange();
                            }}
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
                        <label key={option}>
                          <input
                            type="checkbox"
                            value={option}
                            disabled={
                              areFieldsDisabled &&
                              !(controllerField.value || []).includes(option)
                            }
                            checked={controllerField.value?.includes(option)}
                            onChange={(e) => {
                              const newValue = e.target.checked
                                ? [...(controllerField.value || []), option]
                                : (controllerField.value || []).filter(
                                    (item) => item !== option
                                  );
                              controllerField.onChange(newValue);
                              handleFieldChange();
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
      <button
        type="submit"
        className="submit-button"
        disabled={areFieldsDisabled}
      >
        Submit
      </button>
      <button
        type="button"
        className="reset-button"
        onClick={() => {
          reset();
          setAreFieldsDisabled(false);
          setIsAnyFieldFilled(false);
        }}
      >
        Reset
      </button>
    </form>
  );
};

export default DynamicForm2;
