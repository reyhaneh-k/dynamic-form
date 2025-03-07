import { InputHTMLAttributes, Ref, SelectHTMLAttributes } from "react";
import {
  checkboxFieldType,
  dateFieldType,
  fieldType,
  numberFieldType,
  radioFieldType,
  selectFieldType,
  textFieldType,
} from "../types";

export interface FieldProps {
  field: fieldType;
}

export interface radioProps extends InputHTMLAttributes<HTMLInputElement> {
  field: radioFieldType;
  ref: Ref<HTMLInputElement> | undefined;
}

export interface numberProps extends InputHTMLAttributes<HTMLInputElement> {
  field: numberFieldType;
  ref: Ref<HTMLInputElement> | undefined;
}

export interface textProps extends InputHTMLAttributes<HTMLInputElement> {
  field: textFieldType;
  ref: Ref<HTMLInputElement> | undefined;
}

export interface checkboxProps extends InputHTMLAttributes<HTMLInputElement> {
  field: checkboxFieldType;
  ref: Ref<HTMLInputElement> | undefined;
}

export interface selectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  field: selectFieldType;
  ref: Ref<HTMLSelectElement> | undefined;
}

export interface dateProps extends InputHTMLAttributes<HTMLInputElement> {
  field: dateFieldType;
  ref: Ref<HTMLInputElement> | undefined;
}
