import Form from "../Form";
import { useGetFormData } from "../Form/services";

const Tabs = () => {
  const { data: forms } = useGetFormData();

  return (
    <div>
      {forms?.map((form) => (
        <Form key={form.formId} {...form} />
      ))}
    </div>
  );
};

export default Tabs;
