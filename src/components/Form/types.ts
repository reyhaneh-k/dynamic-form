import { z } from "zod";

//field type enum
const fieldTypeEnum = z.enum([
  "group",
  "radio",
  "number",
  "select",
  "checkbox",
  "text",
  "date",
]);

//visibilit schema
const visibilitySchema = z.object({
  dependsOn: z.string(),
  condition: z.union([z.literal("equals"), z.string()]),
  value: z.string(),
});

//base field schema
const baseFieldSchema = z.object({
  id: z.string(),
  label: z.string(),
  required: z.boolean().optional(),
  visibility: visibilitySchema.optional(),
});

//select schema
export const selectSchema = z.object({
  type: z.literal(fieldTypeEnum.enum.select),
  options: z.string().array().optional(),
  dynamicOptions: z
    .object({
      dependsOn: z.string(),
      endpoint: z.string().startsWith("/api/"),
      method: z.literal("GET"),
    })
    .optional(),
  ...baseFieldSchema.shape,
});

//number schema
export const numberSchema = z.object({
  type: z.literal(fieldTypeEnum.enum.number),
  validation: z
    .object({
      min: z.number().optional(),
      max: z.number().optional(),
    })
    .optional(),
  ...baseFieldSchema.shape,
});

//text schema
export const textSchema = z.object({
  type: z.literal(fieldTypeEnum.enum.text),
  validation: z
    .object({
      pattern: z.string(),
    })
    .optional(),
  ...baseFieldSchema.shape,
});

//date schema
export const dateSchema = z.object({
  type: z.literal(fieldTypeEnum.enum.date),
  ...baseFieldSchema.shape,
});

//radio schema
export const radioSchema = z.object({
  type: z.literal(fieldTypeEnum.enum.radio),
  options: z.string().array(),
  ...baseFieldSchema.shape,
});
//radio schema
export const checkboxSchema = z.object({
  type: z.literal(fieldTypeEnum.enum.checkbox),
  options: z.string().array(),
  ...baseFieldSchema.shape,
});
//group schema
export const groupSchema = z.object({
  type: z.literal(fieldTypeEnum.enum.group),
  fields: z
    .discriminatedUnion("type", [
      dateSchema,
      textSchema,
      numberSchema,
      selectSchema,
      radioSchema,
      checkboxSchema,
    ])
    .array(),
  ...baseFieldSchema.shape,
});

//fields schema
export const fieldsSchema = z.discriminatedUnion("type", [
  dateSchema,
  textSchema,
  numberSchema,
  selectSchema,
  radioSchema,
  checkboxSchema,
  groupSchema,
]);
export const formSchema = z.object({
  formId: z.string(),
  title: z.string(),
  fields: fieldsSchema.array(),
});

export const formDataSchema = z.array(formSchema);

export type formEnum = keyof typeof fieldTypeEnum;
export type formType = z.infer<typeof formSchema>;
export type fieldType = z.infer<typeof fieldsSchema>;

export type groupFieldType = z.infer<typeof groupSchema>;
export type textFieldType = z.infer<typeof textSchema>;
export type dateFieldType = z.infer<typeof dateSchema>;
export type numberFieldType = z.infer<typeof numberSchema>;
export type selectFieldType = z.infer<typeof selectSchema>;
export type radioFieldType = z.infer<typeof radioSchema>;
export type checkboxFieldType = z.infer<typeof checkboxSchema>;
