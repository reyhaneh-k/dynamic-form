import Form from "../Form";
import { useGetFormData } from "../Form/services";
import Tabs from "../Tabs";

const FormTabs = () => {
  const { data: forms } = useGetFormData();

  return (
    <Tabs
      tabs={
        forms?.map((form) => ({
          children: <Form {...form} />,
          title: form.title,
        })) ?? []
      }
    />
  );
};

export default FormTabs;
