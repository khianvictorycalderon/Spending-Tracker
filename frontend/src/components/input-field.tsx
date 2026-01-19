import React from "react";
import { type RegisterOptions, useFormContext, type FieldValues, type Path } from "react-hook-form";

interface InputProps<TFormValues extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name?: Path<TFormValues>; // typed name for any form
  additionalClassName?: {
    label?: string;
    input?: string;
    feedback?: string;
  };
  registerOptions?: RegisterOptions<TFormValues, Path<TFormValues>>;
}

export const Input = <TFormValues extends FieldValues>({
  label,
  name,
  additionalClassName,
  registerOptions,
  ...rest
}: InputProps<TFormValues>) => {
  
  const { register, formState: { errors } } = useFormContext<TFormValues>();

  const errorMessage = name && errors[name]?.message as string | undefined;

  return (
    <div>
      {label && (
        <label
          className={`pl-2 block text-sm font-medium mb-1 text-neutral-800 ${additionalClassName?.label ?? ""}`}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <input
        id={name}
        className={`w-full px-4 py-2 bg-gray-200 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow ${
          additionalClassName?.input ?? ""
        }`}
        placeholder={label ? `Enter ${label.toLowerCase()}...` : ""}
        {...(name ? register(name as Path<TFormValues>, registerOptions) : {})}
        {...rest}
      />
      {errorMessage && (
        <p
          className={`pl-2 mt-1 text-sm text-red-400 ${
            additionalClassName?.feedback ?? ""
          }`}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};
