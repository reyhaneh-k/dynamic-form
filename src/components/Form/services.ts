import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createHttpClient } from "../../utils/createHttpClient";
import { formDataSchema } from "./types";
import { z } from "zod";

export const useGetFormData = () => {
  const httpClient = createHttpClient();
  return useQuery({
    queryKey: ["form", "data"],
    queryFn: async (): Promise<z.infer<typeof formDataSchema>> => {
      return await httpClient.get("insurance/forms/").json();
    },
  });
};
export const useSubmitFormMutation = () => {
  const httpClient = createHttpClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      data: Record<string, string | number | boolean>
    ): Promise<z.infer<typeof formDataSchema>> => {
      return await httpClient
        .post("insurance/forms/submit", { json: data })
        .json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["form", "submissions"] });
    },
  });
};

export const useGetFormSubmissions = () => {
  const httpClient = createHttpClient();
  return useQuery({
    queryKey: ["form", "submissions"],
    queryFn: async (): Promise<z.infer<typeof formDataSchema>> => {
      return await httpClient.get("insurance/forms/submissions").json();
    },
  });
};
