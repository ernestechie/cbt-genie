"use client";
import useDebounce from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import TextInput, { TextInputType } from "./TextInput";

type SearchInputProps = TextInputType & {
  loading?: boolean;
  debounce?: boolean;
  debounceTimer?: number;
  onSearch?: () => void;
};

function SearchInput({
  placeholder = "Search",
  onSearch,
  onChange,
  value,
  className,
  loading = false,
  debounce = false,
  debounceTimer = 300,
  ...props
}: SearchInputProps) {
  const [focus, setFocus] = useState(false);

  const [searchQuery, setSearchQuery] = useState(value);

  useEffect(() => {
    setSearchQuery(value);
  }, [value]);

  const debouncedOnChange = useDebounce(onChange, debounceTimer);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    return debounce ? debouncedOnChange(e) : onChange?.(e);
  };

  const styles = cn("h-10 bg-gray-5 border-transparent", className);

  return (
    <TextInput
      placeholder={placeholder}
      prepend={
        <i
          onClick={onSearch}
          className={cn(
            focus ? "text-neutral-600" : "text-neutral-400",
            loading ? "pi-spinner-dotted animate-spin" : "pi-search",
            "pi  "
          )}
        />
      }
      value={searchQuery}
      className={styles}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      onChange={handleChange}
      {...props}
    />
  );
}

SearchInput.displayName = "SearchInput";

export default SearchInput;
