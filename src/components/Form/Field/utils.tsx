import { fieldType } from "../types";

export const renderField = (field: fieldType) => {
  switch (field.type) {
    case "number":
      return <Number {...field} />;
    case "date":
      return <Date {...field} />;

    case "group":
      return <Group {...field} />;

    case "radio":
      return <Radio {...field} />;

    case "select":
      return <Select {...field} />;

    case "checkbox":
      return <Checkbox {...field} />;

    case "text":
      return <Text {...field} />;
  }
};
