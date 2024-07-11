"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Textarea } from "./ui/customTextarea";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const maxLength = 100; // Change this value as needed

export default function CountingTextArea({
  className,
  ...props
}: TextareaProps) {
  // const [text, setText] = useState<string>("");

  // const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
  //   setText(event.target.value);
  // };

  return (
    <div className={`relative ${className}`}>
      <Textarea
        placeholder="How was your trip with this friend?"
        className="resize-none text-subtitle pb-[23px]"
        value={props.value}
        // onChange={handleChange}
        maxLength={maxLength}
        onInput={function (e: FormEvent<HTMLTextAreaElement>) {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = "";
          target.style.height = target.scrollHeight + 3 + "px";
        }}
        {...props}
      ></Textarea>
      <div className="absolute bottom-2 right-2 text-caption text-grey-3">
        {props && typeof props.value === "string" ? props.value.length : 0}/
        {maxLength}자
      </div>
    </div>
  );
}
