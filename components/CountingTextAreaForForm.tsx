"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant: "experience" | "profile";
}

const maxLength = 100; // Change this value as needed

export default function CountingTextAreaForForm({
  variant,
  className,
  ...props
}: TextareaProps) {
  props.value as string;
  return (
    <div className={`relative ${className}`}>
      {variant === "experience" && (
        <div className="absolute text-body2 top-[26px] left-[22px]">Detail</div>
      )}
      <Textarea
        className={cn(
          "resize-none text-body2 rounded-[12px] focus-visible:ring-1 focus-visible:ring-offset-0 min-h-[110px] placeholder:text-grey-3",
          {
            "pt-[56px] pb-[51px] px-[22px] focus-visible:ring-primary-red":
              variant === "experience",
            "pb-[23px] focus-visible:ring-primary-yellow":
              variant === "profile",
          }
        )}
        value={props.value}
        maxLength={maxLength}
        onInput={function (e: FormEvent<HTMLTextAreaElement>) {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = "";
          target.style.height = target.scrollHeight + 3 + "px";
        }}
        {...props}
      ></Textarea>
      <div
        className={cn("absolute text-grey-3", {
          "bottom-[26px] right-[22px] text-[12px]": variant === "experience",
          "bottom-2 right-2 text-caption ": variant === "profile",
        })}
      >
        {props && typeof props.value === "string" ? props.value.length : 0}/
        {maxLength}자
      </div>
    </div>
  );
}
