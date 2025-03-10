import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { FC, useCallback, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { fieldType, groupFieldType } from "../types";
import {
  checkboxProps,
  dateProps,
  numberProps,
  radioProps,
  selectProps,
  textProps,
} from "./type";

export const Field: FC<fieldType> = (field) => {
  const { register } = useFormContext();
  const { watch } = useFormContext();
  const renderField = useCallback(
    (field: fieldType) => {
      switch (field.type) {
        case "number":
          return (
            <Number
              field={field}
              key={field.id}
              {...register(field.id, { required: field.required })}
            />
          );
        case "date":
          return (
            <Date
              field={field}
              key={field.id}
              {...register(field.id, { required: field.required })}
            />
          );

        case "group":
          return <Group {...field} key={field.id} />;

        case "radio":
          return (
            <Radio
              field={field}
              key={field.id}
              {...register(field.id, { required: field.required })}
            />
          );

        case "select":
          return (
            <Select
              field={field}
              key={field.id}
              {...register(field.id, { required: field.required })}
            />
          );

        case "checkbox":
          return (
            <Checkbox
              field={field}
              key={field.id}
              {...register(field.id, { required: field.required })}
            />
          );

        case "text":
          return (
            <Text
              field={field}
              key={field.id}
              {...register(field.id, { required: field.required })}
            />
          );
      }
    },
    [register]
  );
  const watchDependantField = watch(field.visibility?.dependsOn ?? "");
  console.log("field.visibility :>> ", field.visibility);
  console.log("watchDependantField :>> ", watchDependantField);
  const isFieldVisible = useCallback(
    (field: fieldType) => {
      switch (field.visibility?.condition) {
        case "equals":
          return watchDependantField == field.visibility.value;
        case "greaterThan":
          return watchDependantField > field.visibility.value;
        case "lowerThan":
          return watchDependantField < field.visibility.value;
        default:
          return true;
      }
    },
    [watchDependantField]
  );
  console.log("isFieldVisible(field) :>> ", isFieldVisible(field));
  return (
    <>
      {isFieldVisible(field) && (
        <fieldset>
          <legend>{field.label}</legend>
          {renderField(field)}
        </fieldset>
      )}{" "}
    </>
  );
};

const Group: FC<groupFieldType> = (field) => {
  return (
    <>
      {field.fields.map((item) => (
        <fieldset key={item.id + "field"}>{<Field {...item} />}</fieldset>
      ))}
    </>
  );
};
const Radio: FC<radioProps> = ({ field, ...props }) => {
  return (
    <>
      {field.options.map((opt) => (
        <div key={opt + "radio"}>
          <input
            type="radio"
            id={opt}
            value={opt}
            name={field.label}
            {...props}
            required={field.required}
          />
          <label htmlFor={opt}>{opt}</label>
        </div>
      ))}
    </>
  );
};
const Number: FC<numberProps> = ({ field, ...props }) => {
  return (
    <>
      <label htmlFor={field.label}>{field.label}</label>
      <input
        type="number"
        id={field.id}
        name={field.label}
        {...props}
        required={field.required}
      />
    </>
  );
};
const Text: FC<textProps> = ({ field, ...props }) => {
  return (
    <>
      <label htmlFor={field.label}>{field.label}</label>
      <input
        type="text"
        id={field.id}
        name={field.label}
        {...props}
        required={field.required}
      />
    </>
  );
};
const Date: FC<dateProps> = ({ field, ...props }) => {
  return (
    <>
      <label htmlFor={field.label}>{field.label}</label>
      <input
        type="date"
        id={field.id}
        name={field.label}
        {...props}
        required={field.required}
      />
    </>
  );
};

const Checkbox: FC<checkboxProps> = ({ field, ...props }) => {
  return (
    <>
      {field.options.map((opt) => (
        <div key={opt + "checkbox"}>
          <input
            type="checkbox"
            id={opt}
            name={opt}
            {...props}
            required={field.required}
          />
          <label htmlFor={opt}>{opt}</label>
        </div>
      ))}
    </>
  );
};

const Select: FC<selectProps> = ({ field, ...props }) => {
  const { watch } = useFormContext();
  const watchDependantField = watch(field.dynamicOptions?.dependsOn ?? "");
  const { data: options, refetch } = useQuery({
    queryKey: [field.dynamicOptions?.dependsOn, watchDependantField],
    queryFn: async (): Promise<Array<string>> =>
      watchDependantField
        ? await ky
            .get(field.dynamicOptions?.endpoint ?? "", {
              searchParams: field.dynamicOptions?.dependsOn
                ? {
                    [field.dynamicOptions?.dependsOn]: watchDependantField,
                  }
                : {},
            })
            .json()
            .then((data) => Object.values(data as object)[1])
        : [],
    enabled: "dynamicOptions" in field,
  });

  useEffect(() => {
    refetch();
  }, [refetch, watchDependantField]);

  return (
    <select
      name={field.label}
      id={field.id}
      {...props}
      required={field.required}
    >
      <option value="">--Please choose an option--</option>
      {field.options?.map((opt) => (
        <option key={opt + field.id} value={opt}>
          {opt}
        </option>
      ))}
      {options?.map((opt) => (
        <option key={opt + field.id} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
};
