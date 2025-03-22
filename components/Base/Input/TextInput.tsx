"use client";

import FormErrorHint from "@/components/Misc/FormErrorHint";
import { cn } from "@/lib/utils";
import { forwardRef, useMemo, useState } from "react";

export type TextInputType = React.InputHTMLAttributes<HTMLInputElement> & {
  id?: string;
  label?: string;
  error?: string;
  hint?: string;
  inputClass?: string;
  labelClass?: string;
  currency?: boolean;
  append?: React.ReactNode;
  prepend?: React.ReactNode;
  prependClick?: () => void;
  appendClick?: () => void;
  labelUp?: boolean;
  fullWidth?: boolean;
  size?: "small" | "normal";
  darkMode?: boolean;
};

const TextInput = forwardRef<HTMLInputElement, TextInputType>((props, ref) => {
  const [focus, setFocus] = useState(false);

  const {
    type = "text",
    inputMode = "text",
    label,
    error = "",
    labelUp = false,
    disabled = false,
    placeholder,
    hint,
    currency = false,
    darkMode = true,
    value,
    id,
    name,
    className,
    inputClass,
    labelClass,
    prepend,
    append,
    size = "normal",
    prependClick,
    appendClick,
    onChange,
    onFocus,
    onBlur,
    ...restAttr
  } = props;

  // Memoize the computed display value for currency format.
  // If value is undefined or null, default to an empty string.
  const computeValue = useMemo(() => {
    if (!currency) return value ?? "";

    const rawValue = value ?? "";
    // Remove all non-numeric characters except for decimal points.
    const sanitized = String(rawValue).replace(/[^0-9.]/g, "");
    const parsed = parseFloat(sanitized);
    // Return the formatted value if valid, otherwise empty.
    return !isNaN(parsed) ? `₦${parsed.toLocaleString()}` : "";
  }, [value, currency]);

  // Define the container style based on component state.
  const containerStyle = cn(
    focus
      ? `border border-gray-3 ${
          darkMode && "dark:border-accent-700 dark:ring-accent-400"
        }`
      : `border border-gray-4 ${darkMode && "dark:border-accent-500 "}`,
    disabled && "cursor-not-allowed opacity-50",
    error && "border-destructive ring-destructive",
    darkMode && "dark:bg-background-dark",
    "relative border bg-white px-3 rounded-lg text-sm flex gap-2 items-center h-[50px]",
    size === "normal" ? "h-[50px]" : "h-12",
    className
  );

  // Define input styling based on props and state.
  const inputStyles = cn(
    label && "-mb-1",
    disabled && "cursor-not-allowed opacity-50",
    darkMode && "dark:placeholder:text-accent-300 dark:text-accent-50",
    "!leading-normal text-left bg-transparent h-full w-full caret-secondary-800 dark:caret-accent-50 text-neutral-700 leading-2 focus:outline-none block appearance-none",
    inputClass
  );

  // Define label styling based on state and props.
  const labelStyles = cn(
    "absolute z-10 pointer-events-none text-sm transition-all duration-300 ease-in-out",
    focus || computeValue || labelUp
      ? "top-0 text-[0.65rem]"
      : "top-1/2 -translate-y-1/2",
    prepend ? "left-[2.5rem]" : "left-[1rem]",
    error ? "text-destructive" : "text-secondary-600",
    labelClass
  );

  // Handle input value changes.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!currency) {
      onChange?.(e);
      return;
    }

    // For currency inputs, sanitize the value.
    let val = e.target.value.replace(/[^0-9.]/g, "");
    // Remove any leading "₦" if accidentally present.
    if (val.charAt(0) === "₦") val = val.substring(1);
    // Remove commas.
    val = val.split(",").join("");

    // Trigger onChange with the sanitized value.
    onChange?.({
      ...e,
      target: { ...e.target, value: val, name },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Main container for the input with optional prepend and append */}
      <div className={containerStyle}>
        {/* Prepend element with optional click handler */}
        {prepend && (
          <div
            onClick={prependClick}
            className="flex-shrink-0 text-sm flex items-center text-neutral-600 cursor-pointer"
          >
            {prepend}
          </div>
        )}

        {/* Input field with dynamic properties and event handlers */}
        <input
          ref={ref}
          {...restAttr}
          id={id}
          type={type}
          name={name}
          inputMode={inputMode}
          value={computeValue}
          disabled={disabled}
          onChange={handleChange}
          onFocus={(e) => {
            onFocus?.(e);
            setFocus(true);
          }}
          onBlur={(e) => {
            onBlur?.(e);
            setFocus(false);
          }}
          className={inputStyles}
          placeholder={placeholder}
        />

        {/* Append element with optional click handler */}
        {append && (
          <div
            onClick={appendClick}
            className="flex-shrink-0 text-sm flex items-center text-neutral-600 cursor-pointer"
          >
            {append}
          </div>
        )}

        {["date", "time", "datetime-local"].includes(type) && (
          <span className="bg-white w-8 absolute top-1/2 right-0 transform -translate-y-1/2 pointer-events-none">
            {focus ? (
              <i className="pi pi-chevron-up" />
            ) : (
              <i className="pi pi-chevron-down" />
            )}
          </span>
        )}

        {/* Floating label for the input */}

        {label && (
          <div className={labelStyles}>
            {label}
            {/* Invisible span to maintain label positioning */}
            <span className="pointer-events-none text-transparent">
              {(focus || computeValue) && "*"}
            </span>
          </div>
        )}
      </div>

      {/* Hint or error message below the input field */}
      <FormErrorHint error={error} hint={hint} />
    </div>
  );
});

TextInput.displayName = "TextInput";

export default TextInput;
