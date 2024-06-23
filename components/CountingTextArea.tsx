"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Textarea } from "./ui/textarea";

const maxLength = 100; // Change this value as needed

export default function CountingTextArea({
  className,
}: {
  className?: string;
}) {
  const [text, setText] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <div className={`relative ${className}`}>
      <Textarea
        placeholder="How was your trip with this friend?"
        className="resize-none text-subtitle pb-[23px]"
        value={text}
        onChange={handleChange}
        maxLength={maxLength}
        onInput={function (e: FormEvent<HTMLTextAreaElement>) {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = "";
          target.style.height = target.scrollHeight + 3 + "px";
        }}
      ></Textarea>
      <div className="absolute bottom-2 right-2 text-caption text-grey-3">
        {text.length}/{maxLength}자
      </div>
    </div>
  );
}
