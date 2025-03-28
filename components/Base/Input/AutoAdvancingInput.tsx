import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React from "react";

import FormErrorHint from "@/components/Misc/FormErrorHint";
import { range } from "@/helpers";
import { TextInputType } from "./TextInput";

interface AutoAdvancingInputProps extends TextInputType {
  length: number;
  onValueChange: (val: string) => void;
}

export default function AutoAdvancingInput({
  length,
  onValueChange,
  error,
  hint,
}: AutoAdvancingInputProps) {
  return (
    <div>
      <InputOTP
        maxLength={length}
        onChange={onValueChange}
        // pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
      >
        <InputOTPGroup className="gap-x-2">
          {range(length).map((el) => (
            <InputOTPSlot key={el} index={el} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <FormErrorHint error={error} hint={hint} />
    </div>
  );
}
