/* eslint-disable react-hooks/exhaustive-deps */
import Spinner from "@/components/Misc/Spinner";
import { cn } from "@/lib/utils";
import React, { useMemo, useState } from "react";
import CheckboxFlat from "../CheckboxFlat";
import SearchInput from "../SearchInput";
import { SelectInputType, SelectOptionType } from "./Select";

type Props = Pick<
  SelectInputType,
  | "optionsTemplate"
  | "optionVertical"
  | "multiple"
  | "options"
  | "returnObject"
  | "search"
  | "optionHeader"
  | "hideOptionCheckMark"
  | "optionContainerClass"
  | "optionItemClass"
  | "loading"
  | "emptyMessage"
> & {
  value: string | string[];
  itemText: string;
  itemValue: string;
  onSelectValue: (option: SelectOptionType) => void;
};

// Main component for rendering select options with search and optional header
export default function SelectOptions({
  itemText,
  itemValue,
  search,
  multiple,
  value,
  onSelectValue,
  options = [],
  optionsTemplate,
  optionHeader,
  optionVertical = false,
  hideOptionCheckMark = false,
  optionContainerClass,
  optionItemClass,
  loading,
  emptyMessage,
}: Props) {
  const [searchText, setSearchText] = useState("");

  // Filter options based on search text
  const filteredOptions: SelectOptionType[] = useMemo(() => {
    if (!searchText?.trim()) return options;
    // Convert to lowercase for case-insensitive matching
    return options.filter((el) =>
      el[itemText]?.toLowerCase()?.includes(searchText.toLowerCase())
    );
  }, [options, searchText]);

  // Render individual options with custom template or default option item
  const isActive = (option: SelectOptionType) => {
    return Array.isArray(value)
      ? value.includes(option[itemValue])
      : value === option[itemValue];
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Optional header content */}
      {(optionHeader || search || loading) && (
        <div className="space-y-2 sticky top-0">
          {optionHeader}

          {/* Display search input if `search` prop is true */}
          {search && (
            <SearchInput
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="h-[38px]"
            />
          )}

          {loading && <Spinner />}
        </div>
      )}
      {/* Display filtered options list */}
      <div
        className={cn(
          optionVertical ? "flex-wrap" : "flex-col",
          "text-sm sm:text-base flex",
          optionContainerClass
        )}
      >
        {filteredOptions.map((option, index) => (
          <div
            className={cn(
              "cursor-pointer px-4 flex text-neutral-600 font-normal items-center justify-between    hover:bg-neutral-50 ",
              isActive(option) &&
                "text-neutral-700 font-medium  bg-neutral-50 ",
              optionItemClass
            )}
            onClick={() => onSelectValue(option)}
            key={`options-${index}`}
          >
            {optionsTemplate?.(option, isActive(option)) ?? (
              <div className="cursor-pointer flex items-center justify-between gap-4 py-2 rounded-lg">
                {option[itemText]}
              </div>
            )}

            {multiple && !hideOptionCheckMark && (
              <CheckboxFlat checked={isActive(option)} />
            )}
          </div>
        ))}

        {!filteredOptions?.length && (
          <div className="text-center text-neutral-400 p-1">{emptyMessage}</div>
        )}
      </div>
    </div>
  );
}
