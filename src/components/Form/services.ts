import { useQuery } from "@tanstack/react-query";
import { createHttpClient } from "../../utils/createHttpClient";
import { formDataSchema } from "./types";
import { z } from "zod";

export const useGetFormData = () => {
  const httpClient = createHttpClient();
  return useQuery({
    queryKey: ["formData"],
    queryFn: async (): Promise<z.infer<typeof formDataSchema>> => {
      return await httpClient.get("insurance/forms/").json();
    },
  });
};
