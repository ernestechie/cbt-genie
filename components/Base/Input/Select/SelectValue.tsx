import { cn } from "@/lib/utils";
import React from "react";
import InputChip from "../InputChip";
import TextInput from "../TextInput";
import { SelectInputType, SelectOptionType } from "./Select";

type Props = Partial<SelectInputType> & {
  value: string | string[];
  open?: boolean;
  onClick?: () => void;
  onClose?: () => void;
  handleSelect?: (option: SelectOptionType) => void;
};

export default function SelectValue(props: Props) {
  const {
    value,
    label,
    placeholder = "Select...",
    open,
    multiple,
    onClick,
    options,
    itemValue,
    itemText,
    removeable,
    handleSelect,
    onClose,
    valueTemplate,
    prepend,
    valueClass,
    returnObject,
  } = props;

  const append = (
    <span
      className={`${
        open && "-rotate-90"
      } transition-all duration-150  transform flex-shrink-0`}
    >
      <i className="pi pi-chevron-down text-sm" />
    </span>
  );

  const displayValue = (arg: string) => {
    if (returnObject) return arg?.[itemText as keyof typeof arg];
    return options?.find((el) => el[itemValue!] == arg)?.[itemText!];
  };

  const handleRemove = (arg: string) => {
    const option = options?.find((el) => el[itemValue!] == arg);
    if (option) {
      handleSelect?.(option);
      onClose?.();
    }
  };

  return (
    <>
      {multiple ? (
        <InputChip
          className={valueClass}
          chips={Array.isArray(value) ? (value as string[]) : []}
          readOnly
          disabled={props?.disabled}
          error={props?.error}
          hint={props?.hint}
          maxVisibleChips={props?.maxVisibleChips}
          removeable={removeable}
          onRemoveChip={handleRemove}
          label={value?.length ? label : undefined}
          placeholder={!value?.length ? placeholder || label : undefined}
          prepend={props?.prepend}
          template={(chip) =>
            valueTemplate?.(displayValue(chip), () => handleRemove(chip)) ||
            undefined
          }
          append={append}
        />
      ) : (
        <>
          <TextInput
            className={valueClass}
            prepend={
              (prepend || (valueTemplate && value)) && (
                <div>
                  {prepend && prepend}
                  {valueTemplate?.(displayValue(value as string))}
                </div>
              )
            }
            value={displayValue(value as string)}
            onClick={(e) => {
              onClick?.();
              e.stopPropagation();
            }}
            hint={props?.hint}
            readOnly
            disabled={props?.disabled}
            error={props?.error}
            label={value ? label : undefined}
            placeholder={placeholder || label}
            append={append}
            inputClass={cn(valueTemplate && value && "invisible")}
          />
        </>
      )}
    </>
  );
}
