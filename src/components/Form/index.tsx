import { FC } from "react";
import { Field } from "./Field";
import { formType } from "./types";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useSubmitFormMutation } from "./services";

const Form: FC<formType> = (form) => {
  const methods = useForm();
  const { mutate } = useSubmitFormMutation();
  const onSubmit: SubmitHandler<Record<string, number | boolean | string>> = (
    data
  ) => {
    console.log("data :>> ", data);
    mutate(data);
  };
  return (
    <FormProvider {...methods}>
      <form id={form.formId} onSubmit={methods.handleSubmit(onSubmit)}>
        <h1>{form.title}</h1>
        {form.fields.map((field) => (
          <Field key={field.id} {...field} />
        ))}
        <button type="submit">submit</button>
      </form>
    </FormProvider>
  );
};

export default Form;
