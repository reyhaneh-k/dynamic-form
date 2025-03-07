import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { FC, useEffect } from "react";
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
  const renderField = (field: fieldType) => {
    switch (field.type) {
      case "number":
        return <Number field={field} key={field.id} {...register(field.id)} />;
      case "date":
        return <Date field={field} key={field.id} {...register(field.id)} />;

      case "group":
        return <Group {...field} key={field.id} />;

      case "radio":
        return <Radio field={field} key={field.id} {...register(field.id)} />;

      case "select":
        return <Select field={field} key={field.id} {...register(field.id)} />;

      case "checkbox":
        return (
          <Checkbox field={field} key={field.id} {...register(field.id)} />
        );

      case "text":
        return <Text field={field} key={field.id} {...register(field.id)} />;
    }
  };
  // const visibility = field.visibility
  return (
    <fieldset>
      <legend>{field.label}</legend>
      {renderField(field)}
    </fieldset>
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
          <input type="radio" id={opt} name={opt} {...props} />
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
      <input type="number" id={field.id} name={field.label} {...props} />
    </>
  );
};
const Text: FC<textProps> = ({ field, ...props }) => {
  return (
    <>
      <label htmlFor={field.label}>{field.label}</label>
      <input type="text" id={field.id} name={field.label} {...props} />
    </>
  );
};
const Checkbox: FC<checkboxProps> = ({ field, ...props }) => {
  return (
    <>
      {field.options.map((opt) => (
        <div key={opt + "checkbox"}>
          <input type="checkbox" id={opt} name={opt} {...props} />
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
      await ky
        .get(field.dynamicOptions?.endpoint ?? "", {
          searchParams: field.dynamicOptions?.dependsOn
            ? {
                [field.dynamicOptions?.dependsOn]: watchDependantField,
              }
            : {},
        })
        .json()
        .then((data) => Object.values(data as object)[1]),
    enabled: "dynamicOptions" in field && !!watchDependantField,
  });

  useEffect(() => {
    refetch();
  }, [refetch, watchDependantField]);

  return (
    <select name={field.label} id={field.id} {...props}>
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

const Date: FC<dateProps> = ({ field, ...props }) => {
  return (
    <>
      <label htmlFor={field.label}>{field.label}</label>
      <input type="date" id={field.id} name={field.label} {...props} />
    </>
  );
};
