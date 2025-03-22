/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef, ReactNode, useMemo, useRef, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SelectOptions from "./SelectOptions";
import { cn } from "@/lib/utils";
import SelectValue from "./SelectValue";
import { useElementSize } from "@reactuses/core";

export type SelectOptionType = {
  [key: string]: any;
};

type SelectInputTypeBase = {
  autoComplete?: string;
  loading?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  removeable?: boolean;
  name?: string;
  required?: boolean;
  valueTemplate?: (value: string, action?: () => void) => ReactNode;
  maxVisibleChips?: number;
  id?: string;
  placeholder?: string;
  label?: string;
  error?: string;
  hint?: string;
  optionItemClass?: string;
  optionContainerClass?: string;
  options: SelectOptionType[]; // Available options for selection
  optionVertical?: boolean;
  emptyMessage?: string | ReactNode;
  itemText?: string; // Field to display as option label (e.g., "name")
  itemValue?: string; // Field to use as option value (e.g., "id")
  optionsTemplate?: (
    option: SelectOptionType,
    isActive: boolean
  ) => React.ReactNode;
  optionHeader?: React.ReactNode;
  hideOptionCheckMark?: boolean;
  valueClass?: string;
  className?: string;
  autoHeight?: boolean;
  hieght?: string;
  search?: boolean;
  returnObject?: boolean; // Determines whether the entire option object or only the value is returned
  append?: React.ReactNode;
  prepend?: React.ReactNode;
  prependClick?: () => void;
  appendClick?: () => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

export type SelectInputTypeSingle = SelectInputTypeBase & {
  multiple?: false;
  value?: string | number | SelectOptionType | null;
  onChange?: (value: string | number | SelectOptionType) => void;
};

export type SelectInputTypeMultiple = SelectInputTypeBase & {
  multiple: true;
  value?: SelectOptionType[];
  onChange?: (value: SelectOptionType[]) => void;
};

export type SelectInputType = SelectInputTypeSingle | SelectInputTypeMultiple;

const SelectInput = forwardRef<HTMLDivElement, SelectInputType>(
  (props, ref) => {
    const {
      options = [],
      value,
      itemText = "label",
      itemValue = "value",
      hieght = "max-h-[300px]",
      returnObject = false,
      multiple = false,
      removeable = true,
      autoHeight = true,
      className,
      valueClass,
      loading,
      hint,
      error,
      emptyMessage = "No available options",
      onChange,
    } = props;

    const [open, setOpen] = useState(false);

    // Reference for measuring container width to set the popover width dynamically
    const containerRef = useRef<HTMLDivElement>(null);
    const [elementWidth] = useElementSize(containerRef, { box: "border-box" });

    // Compute the display value based on whether `returnObject` is true or false
    const computeValue = useMemo(() => {
      if (value === null || value === undefined) return "";

      //if value is an array
      if (Array.isArray(value)) {
        return value.map((el) => (returnObject ? el[itemValue] : el));
      }

      // If value is a single object, retrieve the itemValue field
      return typeof value === "object" ? value[itemValue] : value;
    }, [value, itemValue, returnObject]);

    const handleSelect = (option: SelectOptionType) => {
      const returnValue = returnObject ? option : option[itemValue];

      if (multiple && Array.isArray(value)) {
        // Check if the selected option is already in the current value
        const isSelected = returnObject
          ? value.some((el) => el[itemValue] === option[itemValue])
          : value.includes(returnValue);

        // Add or remove option based on its current selection status
        const updatedValue = isSelected
          ? value.filter((el) =>
              returnObject
                ? el[itemValue] !== option[itemValue]
                : el !== returnValue
            )
          : [...value, returnValue];

        onChange?.(updatedValue);
      } else {
        onChange?.(returnValue);
        setOpen(false);
      }
    };

    return (
      <div ref={containerRef}>
        <Popover
          open={open}
          onOpenChange={!props.disabled ? setOpen : undefined}
        >
          <PopoverTrigger className="w-full">
            <SelectValue
              valueClass={valueClass}
              handleSelect={handleSelect}
              value={computeValue}
              itemText={itemText}
              itemValue={itemValue}
              removeable={removeable}
              open={open}
              {...props}
              hint={hint}
              error={error}
              onClick={() => setOpen(true)}
            />
          </PopoverTrigger>
          <PopoverContent
            onOpenAutoFocus={(e) => e.preventDefault()}
            style={{
              // boxShadow: "0px 9px 18px 0px #AAAAAA26",
              width: elementWidth || "auto",
              border: "1px solid #E5E7EB",
              // minWidth: elementWidth || "auto",
              // maxWidth: elementWidth || "auto",
            }}
            className={cn(
              "rounded-xl p-2 gap-0",
              (hint || error) && "-mt-4",

              autoHeight
                ? "max-h-[250px] overflow-y-auto no-scrollbar"
                : hieght,
              className
            )}
          >
            <SelectOptions
              emptyMessage={emptyMessage}
              optionItemClass={props.optionItemClass}
              optionContainerClass={props.optionContainerClass}
              hideOptionCheckMark={props.hideOptionCheckMark}
              optionVertical={props?.optionVertical}
              search={props?.search}
              multiple={multiple}
              loading={loading}
              value={computeValue}
              itemText={itemText}
              itemValue={itemValue}
              onSelectValue={handleSelect}
              options={options}
              optionHeader={props?.optionHeader}
              optionsTemplate={props?.optionsTemplate}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

SelectInput.displayName = "Select";
export default SelectInput;
