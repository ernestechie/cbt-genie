import { FormControl, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import React, { memo } from "react";
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldError,
  FieldPath,
  FieldValues,
} from "react-hook-form";

interface FormContainerProps<T extends FieldValues, K extends FieldPath<T>> {
  control: Control<T>;
  name: K;
  /**
   * The render prop receives the field props and the optional error.
   */
  render: (
    field: ControllerRenderProps<T, K>,
    error?: FieldError
  ) => React.ReactNode;
  /**
   * Optionally display the error message below the field.
   */
  showErrorMessage?: boolean;
  className?: string;
}

function FormContainer<T extends FieldValues, K extends FieldPath<T>>({
  control,
  name,
  render,
  className,
}: // showErrorMessage = false,
FormContainerProps<T, K>): React.ReactNode {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={cn("flex-1", className)}>
          <FormControl>{render(field, error)}</FormControl>
        </FormItem>
      )}
    />
  );
}

export default memo(FormContainer) as typeof FormContainer;
