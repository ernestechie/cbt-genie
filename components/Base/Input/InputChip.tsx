/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  forwardRef,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
} from "react";
import TextInput, { TextInputType } from "./TextInput";
import { cn } from "@/lib/utils";
import { useElementSize } from "@reactuses/core";

export type ChipType = {
  [key: string]: any;
};

type Props = TextInputType & {
  chips: string[];
  chipStyle?: string;
  removeable?: boolean;
  template?: (chip: string, onRemove?: () => void) => ReactNode;
  onChipChange?: (value: string[]) => void;
  onRemoveChip?: (value: string) => void;
  maxVisibleChips?: number;
};

type ChipItemType = Pick<Props, "chipStyle" | "removeable"> & {
  chip: string;
  onRemove?: () => void;
};

export function ChipItem({
  chip,
  onRemove,
  chipStyle,
  removeable,
}: ChipItemType) {
  return (
    <div
      className={cn(
        "bg-neutral-100 border border-neutral-200  text-neutral-700 w-full  rounded-full text-xs px-2 py-1 flex items-center gap-1",
        chipStyle
      )}
    >
      <span className="flex-1 truncate text-left ">{chip}</span>

      {removeable && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className="flex-shrink-0"
        >
          <i className="pi pi-times text-[0.7rem] text-neutral-500" />
        </span>
      )}
    </div>
  );
}

const InputChip = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    onChipChange,
    onRemoveChip,
    template,
    chipStyle,
    label,
    chips,
    prepend,
    removeable = false,
    maxVisibleChips = 3,
    ...rest
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const [elementWidth] = useElementSize(containerRef, { box: "border-box" });

  const containerWidth = ((elementWidth || 100) * 80) / 100;

  // Handler to remove a chip by index
  const handleRemoveChip = useCallback(
    (arg: string, index: number) => {
      onRemoveChip?.(arg);
    },
    [onRemoveChip]
  );

  // Memoized function to render visible chips and count hidden ones
  const renderChip = useMemo(() => {
    if (!Array.isArray(chips)) {
      console.error("Chips is expects a array");
    }

    const visibleChips: string[] = Array.isArray(chips)
      ? chips?.slice(0, maxVisibleChips)
      : []; // Display only up to maxVisibleChips
    const hiddenChipsCount = chips?.length - visibleChips?.length;

    const hiddenChipSize = 20 / maxVisibleChips; // 20px

    const chipWidthPercent = 100 / visibleChips?.length; //get the percentage width of each chip
    const chipWidth = `${
      (containerWidth * chipWidthPercent) / 100 - hiddenChipSize
    }px`; //get the maxWidth from the percentage

    return (
      <>
        {prepend && <div className="mr-1">{prepend}</div>}
        <div
          style={{ maxWidth: containerWidth }}
          className={`-ml-1.5 relative flex items-center gap-2 ${
            label && "-mb-2"
          }`}
        >
          {visibleChips?.map((chip: string, index: number) => (
            <div style={{ maxWidth: chipWidth }} key={`chip-${index}`}>
              {template?.(chip, () => handleRemoveChip(chip, index)) ?? (
                <ChipItem
                  onRemove={() => handleRemoveChip(chip, index)}
                  chipStyle={chipStyle}
                  chip={chip}
                  removeable={removeable}
                />
              )}
            </div>
          ))}
          {hiddenChipsCount > 0 && (
            <div className="-ml-1 flex-shrink-0 text-secondary-600 dark:text-secondary-400 text-xs sm:text-sm ">
              +{hiddenChipsCount}
            </div>
          )}
        </div>
      </>
    );
  }, [
    chipStyle,
    label,
    removeable,
    chips,
    template,
    containerWidth,
    prepend,
    maxVisibleChips,
    handleRemoveChip,
  ]);
  const placeholder = !chips?.length && label ? props?.placeholder : "";

  return (
    <div ref={containerRef}>
      <TextInput
        placeholder={placeholder}
        prepend={renderChip}
        inputClass="-ml-2"
        {...rest}
      />
    </div>
  );
});

InputChip.displayName = "InputChip";

export default InputChip;
