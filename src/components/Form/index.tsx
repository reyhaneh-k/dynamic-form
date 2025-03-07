import { FC } from "react";
import { Field } from "./Field";
import { formType } from "./types";
import { FormProvider, useForm } from "react-hook-form";

const Form: FC<formType> = (form) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form id={form.formId}>
        <h1>{form.title}</h1>
        {form.fields.map((field) => (
          <Field key={field.id} {...field} />
        ))}
      </form>
    </FormProvider>
  );
};

export default Form;
